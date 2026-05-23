const StatsGrid = ({ totalItineraries }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">🧳</div>
        <h3>Total Itineraries</h3>
        <p>{totalItineraries}</p>
      </div>

      <div className="stat-card">
        <div className="stat-icon">📄</div>
        <h3>Supported Files</h3>
        <p>PDF / Images</p>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🤖</div>
        <h3>AI Engine</h3>
        <p>Gemini AI</p>
      </div>
    </div>
  );
};

export default StatsGrid;