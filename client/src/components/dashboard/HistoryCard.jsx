const HistoryCard = ({ item, loading, onCopy, onShare, onDownload }) => {
  return (
    <div className="history-card">
      <div className="history-card-header">
        <div>
          <h3>{item.documentName}</h3>
          <p>{new Date(item.createdAt).toLocaleString()}</p>
        </div>

        <span className="history-tag">Saved</span>
      </div>

      <pre>{item.itinerary}</pre>

      <div className="action-buttons">
        <button disabled={loading} onClick={() => onCopy(item.itinerary)}>
          Copy
        </button>

        <button disabled={loading} onClick={() => onShare(item.itinerary)}>
          Share
        </button>

        <button disabled={loading} onClick={() => onDownload(item.itinerary)}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;