const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="auth-card">
      <h2>{title}</h2>
      <p className="auth-subtitle">{subtitle}</p>
      {children}
    </div>
  );
};

export default AuthCard;