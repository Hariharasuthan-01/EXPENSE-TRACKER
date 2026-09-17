function StatCard({ title, value, icon, accent }) {
  return (
    <div className="stat-card" style={{ '--accent': accent }}>
      <div className="stat-card__icon">{icon}</div>
      <div>
        <p className="stat-card__label">{title}</p>
        <h3>{value}</h3>
      </div>
    </div>
  );
}

export default StatCard;
