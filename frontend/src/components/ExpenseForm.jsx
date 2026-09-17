import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  description: '',
  amount: '',
  category: '',
  payment_method: '',
  expense_date: new Date().toISOString().slice(0, 10),
};

function ExpenseForm({ initialData = null, onSubmit, submitLabel = 'Save Expense' }) {
  const [formData, setFormData] = useState(initialData || emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialData || emptyForm);
    setErrors({});
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title || !formData.title.trim()) newErrors.title = 'Title cannot be empty.';
    if (!formData.amount && formData.amount !== 0) newErrors.amount = 'Please enter an expense amount.';
    if (Number(formData.amount) <= 0) newErrors.amount = 'Amount must be greater than 0.';
    if (!formData.category) newErrors.category = 'Please select a category.';
    if (!formData.payment_method) newErrors.payment_method = 'Please select a payment method.';
    if (!formData.expense_date) newErrors.expense_date = 'Please select an expense date.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      amount: Number(formData.amount),
    });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="e.g. Grocery shopping"
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={formData.amount || ''}
            onChange={handleChange}
            placeholder="0.00"
          />
          {errors.amount && <span className="error-text">{errors.amount}</span>}
        </div>

        <div className="field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={formData.category || ''} onChange={handleChange}>
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Education">Education</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <span className="error-text">{errors.category}</span>}
        </div>

        <div className="field">
          <label htmlFor="payment_method">Payment Method</label>
          <select
            id="payment_method"
            name="payment_method"
            value={formData.payment_method || ''}
            onChange={handleChange}
          >
            <option value="">Select payment method</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          {errors.payment_method && <span className="error-text">{errors.payment_method}</span>}
        </div>

        <div className="field">
          <label htmlFor="expense_date">Expense Date</label>
          <input
            id="expense_date"
            name="expense_date"
            type="date"
            value={formData.expense_date || ''}
            onChange={handleChange}
          />
          {errors.expense_date && <span className="error-text">{errors.expense_date}</span>}
        </div>

        <div className="field full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Optional description"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
