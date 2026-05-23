const LogoutModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="logout-modal">
        <h2>Logout?</h2>
        <p>Are you sure you want to logout from TripCraft AI?</p>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="confirm-logout-btn" onClick={onConfirm}>
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;