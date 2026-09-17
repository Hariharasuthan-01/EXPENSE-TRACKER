function Filters({ filters, onChange, onClear }) {
  return (
    <div className="filter-panel">
      <div className="filter-grid">
        <div className="field">
          <label>Search</label>
          <input
            type="text"
            name="query"
            value={filters.query}
            onChange={onChange}
            placeholder="Search title or description"
          />
        </div>

        <div className="field">
          <label>Category</label>
          <select name="category" value={filters.category} onChange={onChange}>
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Education">Education</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="field">
          <label>Payment Method</label>
          <select name="payment_method" value={filters.payment_method} onChange={onChange}>
            <option value="">All Methods</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <div className="field">
          <label>From Date</label>
          <input type="date" name="date_from" value={filters.date_from} onChange={onChange} />
        </div>

        <div className="field">
          <label>To Date</label>
          <input type="date" name="date_to" value={filters.date_to} onChange={onChange} />
        </div>

        <div className="field">
          <label>Sort By</label>
          <select name="sort_by" value={filters.sort_by} onChange={onChange}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest amount</option>
            <option value="lowest">Lowest amount</option>
          </select>
        </div>
      </div>

      <div className="filter-actions">
        <button type="button" className="secondary-button" onClick={onClear}>Clear Filters</button>
      </div>
    </div>
  );
}

export default Filters;
