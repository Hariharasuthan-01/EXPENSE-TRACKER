import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import Filters from '../components/Filters';

function ExpensesPage({
  expenses,
  filters,
  onFilterChange,
  onClearFilters,
  onView,
  onEdit,
  onDelete,
  onSubmit,
  editingExpense,
  isSubmitting,
}) {
  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Transactions</p>
          <h2>Manage Expenses</h2>
        </div>
      </div>

      <div className="panel form-panel">
        <h3>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h3>
        <ExpenseForm
          initialData={editingExpense}
          onSubmit={onSubmit}
          submitLabel={editingExpense ? 'Update Expense' : 'Add Expense'}
        />
      </div>

      <div className="panel">
        <h3>Search & Filter</h3>
        <Filters filters={filters} onChange={onFilterChange} onClear={onClearFilters} />
      </div>

      <div className="panel">
        <h3>Expense List</h3>
        {isSubmitting ? <div className="loading-box">Saving expense...</div> : null}
        <ExpenseTable expenses={expenses} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default ExpensesPage;
