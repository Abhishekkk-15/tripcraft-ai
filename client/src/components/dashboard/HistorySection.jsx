import HistoryCard from "./HistoryCard";

const HistorySection = ({ history, loading, onCopy, onShare, onDownload }) => {
  return (
    <div className="history-section">
      <div className="section-title">
        <div>
          <span className="section-label">History</span>
          <h2>Previous Itineraries</h2>
          <p>View, copy, share, or download your saved travel plans.</p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🗺️</div>
          <h3>No trips created yet</h3>
          <p>
            Your generated itineraries will appear here after you upload a
            travel booking document.
          </p>

          <div className="empty-tips">
            <span>✈ Flight tickets</span>
            <span>🏨 Hotel bookings</span>
            <span>🚌 Travel passes</span>
          </div>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <HistoryCard
              key={item._id}
              item={item}
              loading={loading}
              onCopy={onCopy}
              onShare={onShare}
              onDownload={onDownload}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorySection;