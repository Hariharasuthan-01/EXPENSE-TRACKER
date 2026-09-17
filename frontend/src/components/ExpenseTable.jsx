function ExpenseTable({ expenses, onView, onEdit, onDelete }) {
  if (!expenses || expenses.length === 0) {
    return <div className="empty-state">No expenses found. Add your first transaction.</div>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>#{expense.id}</td>
              <td>{expense.title}</td>
              <td><span className="badge">{expense.category}</span></td>
              <td>₹{Number(expense.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
              <td>{expense.payment_method}</td>
              <td>{new Date(expense.expense_date).toLocaleDateString()}</td>
              <td>
                <div className="row-actions">
                  <button className="secondary-button" onClick={() => onView(expense.id)}>View</button>
                  <button className="secondary-button" onClick={() => onEdit(expense.id)}>Edit</button>
                  <button className="danger-button" onClick={() => onDelete(expense.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
