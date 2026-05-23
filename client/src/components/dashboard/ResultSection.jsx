const ResultSection = ({
  itinerary,
  loading,
  onCopy,
  onShare,
  onDownload,
}) => {
  return (
    <div className="result-card">
      <div className="section-title">
        <div>
          <span className="section-label">Latest Result</span>
          <h2>Generated Itinerary</h2>
          <p>Your newest AI-generated travel plan is ready.</p>
        </div>
      </div>

      <pre>{itinerary}</pre>

      <div className="action-buttons">
        <button disabled={loading} onClick={() => onCopy(itinerary)}>
          Copy
        </button>

        <button disabled={loading} onClick={() => onShare(itinerary)}>
          Share
        </button>

        <button disabled={loading} onClick={() => onDownload(itinerary)}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ResultSection;