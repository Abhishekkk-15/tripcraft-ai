const LoadingSection = () => {
  return (
    <div className="loading-card">
      <div className="spinner"></div>

      <h3>Generating your AI itinerary...</h3>
      <p>
        Extracting booking details, analyzing travel data, and preparing your
        personalized travel plan.
      </p>

      <div className="loading-steps">
        <div className="loading-step">
          <span>1</span>
          <div>
            <strong>Reading document</strong>
            <small>Scanning your uploaded travel file</small>
          </div>
        </div>

        <div className="loading-step">
          <span>2</span>
          <div>
            <strong>Extracting trip details</strong>
            <small>Finding dates, places, hotels, and tickets</small>
          </div>
        </div>

        <div className="loading-step">
          <span>3</span>
          <div>
            <strong>Building itinerary</strong>
            <small>Creating your AI-powered travel plan</small>
          </div>
        </div>
      </div>

      <div className="skeleton-box"></div>
      <div className="skeleton-box short"></div>
    </div>
  );
};

export default LoadingSection;