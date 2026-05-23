const UploadSection = ({
  file,
  fileError,
  loading,
  onUpload,
  onFileSelect,
  onFileDrop,
}) => {
  return (
    <div className="upload-card">
      <div className="section-title">
        <div>
          <span className="section-label">Upload</span>
          <h2>Travel Booking Document</h2>
          <p>
            Upload flight tickets, hotel bookings, travel tickets, or images.
          </p>
        </div>
      </div>

      <form onSubmit={onUpload}>
        <div
          className="upload-zone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onFileDrop}
        >
          <div className="upload-icon">☁️</div>

          <label className="custom-file-upload">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={onFileSelect}
            />

            <span>Choose Travel Document</span>
          </label>

          <p>
            {file
              ? `Selected File: ${file.name}`
              : "Drag & drop your file here or choose a document"}
          </p>

          <small>Supported formats: PDF, JPG, JPEG, PNG</small>
          {fileError && <div className="file-error">{fileError}</div>}
        </div>

        <button className="primary-action-btn" type="submit" disabled={loading}>
          {loading ? "Generating AI Itinerary..." : "Upload & Generate"}
        </button>
      </form>
    </div>
  );
};

export default UploadSection;