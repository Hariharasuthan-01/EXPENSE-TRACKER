import { useEffect, useMemo, useState } from 'react';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import ExpensesPage from './pages/ExpensesPage';
import { createExpense, deleteExpense, fetchDashboard, fetchExpenses, updateExpense } from './services/api';

const defaultFilters = {
  query: '',
  category: '',
  payment_method: '',
  date_from: '',
  date_to: '',
  sort_by: 'newest',
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expenses, setExpenses] = useState([]);
  const [dashboard, setDashboard] = useState({
    total_expenses: 0,
    transaction_count: 0,
    average_expense: 0,
    highest_expense: 0,
    recent_expenses: [],
    category_summary: [],
    monthly_summary: [],
  });
  const [filters, setFilters] = useState(defaultFilters);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadDashboard = async () => {
    try {
      const data = await fetchDashboard();
      setDashboard(data);
    } catch (err) {
      setError(err.message || 'Unable to load dashboard data.');
    }
  };

  const loadExpenses = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.query) params.append('q', filters.query);
      if (filters.category) params.append('category', filters.category);
      if (filters.payment_method) params.append('payment_method', filters.payment_method);
      if (filters.date_from) params.append('date_from', filters.date_from);
      if (filters.date_to) params.append('date_to', filters.date_to);
      if (filters.sort_by) params.append('sort_by', filters.sort_by);

      const data = await fetchExpenses(params.toString());
      setExpenses(data);
    } catch (err) {
      setError(err.message || 'Unable to load expenses.');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    await loadDashboard();
    await loadExpenses();
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadExpenses();
    }, 250);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleSubmitExpense = async (formData) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      if (selectedExpense) {
        await updateExpense(selectedExpense.id, formData);
        setSuccess('Expense updated successfully.');
      } else {
        await createExpense(formData);
        setSuccess('Expense created successfully.');
      }
      setSelectedExpense(null);
      await refreshData();
    } catch (err) {
      setError(err.message || 'Failed to save expense.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    try {
      await deleteExpense(id);
      setSuccess('Expense deleted successfully.');
      setSelectedExpense(null);
      await refreshData();
    } catch (err) {
      setError(err.message || 'Could not delete the selected expense.');
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  const currentExpense = useMemo(() => {
    if (!selectedExpense) return null;
    return {
      ...selectedExpense,
      amount: String(selectedExpense.amount),
      expense_date: selectedExpense.expense_date,
    };
  }, [selectedExpense]);

  const handleEditExpense = (id) => {
    const item = expenses.find((expense) => expense.id === id);
    if (item) setSelectedExpense(item);
    setActiveTab('expenses');
  };

  const handleViewExpense = (id) => {
    const item = expenses.find((expense) => expense.id === id);
    if (item) setSelectedExpense(item);
    setActiveTab('expenses');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">₹</div>
          <div>
            <h1>Expense Tracker</h1>
            <p>Budget Insights</p>
          </div>
        </div>

        <nav className="nav-menu">
          <button className={activeTab === 'dashboard' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('dashboard')}>
            Dashboard
          </button>
          <button className={activeTab === 'expenses' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('expenses')}>
            Expenses
          </button>
          <button className={activeTab === 'expenses' ? 'nav-link active' : 'nav-link'} onClick={() => { setSelectedExpense(null); setActiveTab('expenses'); }}>
            Add Expense
          </button>
        </nav>
      </aside>

      <main className="content-panel">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {activeTab === 'dashboard' && <DashboardPage dashboardData={dashboard} recentExpenses={dashboard.recent_expenses || []} />}
        {activeTab === 'expenses' && (
          <ExpensesPage
            expenses={expenses}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onView={handleViewExpense}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
            onSubmit={handleSubmitExpense}
            editingExpense={currentExpense}
            isSubmitting={isSubmitting}
          />
        )}

        {isLoading && activeTab === 'dashboard' ? <div className="loading-box">Loading dashboard...</div> : null}
      </main>
    </div>
  );
}

export default App;
