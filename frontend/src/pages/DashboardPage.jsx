import { useMemo } from 'react';

function DashboardPage({ dashboardData, recentExpenses }) {
  const categorySummary = dashboardData?.category_summary || [];
  const monthlySummary = dashboardData?.monthly_summary || [];

  const total = dashboardData?.total_expenses || 0;
  const average = dashboardData?.average_expense || 0;
  const highest = dashboardData?.highest_expense || 0;
  const transactions = dashboardData?.transaction_count || 0;

  const chartData = useMemo(() => {
    return categorySummary.map((item) => ({
      label: item.category,
      value: Number(item.total),
    }));
  }, [categorySummary]);

  const maxCategoryValue = chartData.length ? Math.max(...chartData.map((entry) => entry.value)) : 1;

  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Dashboard</h2>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card__icon">₹</div>
          <div>
            <p className="stat-card__label">Total Expenses</p>
            <h3>₹{Number(total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon">#</div>
          <div>
            <p className="stat-card__label">Transactions</p>
            <h3>{transactions}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon">≈</div>
          <div>
            <p className="stat-card__label">Average Expense</p>
            <h3>₹{Number(average).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon">★</div>
          <div>
            <p className="stat-card__label">Highest Expense</p>
            <h3>₹{Number(highest).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <h3>Category-wise spending</h3>
          <div className="bar-chart">
            {chartData.length ? (
              chartData.map((entry) => (
                <div key={entry.label} className="bar-row">
                  <span>{entry.label}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${(entry.value / maxCategoryValue) * 100}%` }}></div>
                  </div>
                  <strong>₹{entry.value.toLocaleString('en-IN')}</strong>
                </div>
              ))
            ) : (
              <p>No data available.</p>
            )}
          </div>
        </div>

        <div className="panel">
          <h3>Monthly summary</h3>
          <ul className="mini-list">
            {monthlySummary.length ? (
              monthlySummary.map((entry) => (
                <li key={entry.month}>
                  <span>{entry.month}</span>
                  <strong>₹{Number(entry.total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
                </li>
              ))
            ) : (
              <li>No monthly data yet.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="panel recent-panel">
        <h3>Recent expenses</h3>
        <div className="recent-list">
          {recentExpenses.length ? (
            recentExpenses.map((expense) => (
              <div className="recent-item" key={expense.id}>
                <div>
                  <strong>{expense.title}</strong>
                  <p>{expense.category}</p>
                </div>
                <span>₹{Number(expense.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            ))
          ) : (
            <p>No recent expenses.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
