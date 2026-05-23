const DashboardHero = ({ loggedInUser, loading, onLogoutClick }) => {
  return (
    <div className="dashboard-hero">
      <div>
        <span className="dashboard-badge">AI Travel Planner</span>
        <h1>TripCraft AI Dashboard</h1>
        <p>
          Upload your travel bookings and generate beautiful AI-powered
          itineraries in seconds.
        </p>
      </div>

      <div className="dashboard-user-box">
        <div>
          <span>Welcome back,</span>
          <strong>{loggedInUser.name}</strong>
        </div>

        <button
          className="logout-btn"
          disabled={loading}
          onClick={onLogoutClick}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardHero;