const AuthLayout = ({ description, features, children }) => {
  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1>TripCraft AI</h1>
        <p>{description}</p>

        <div className="auth-features">
          {features.map((feature, index) => (
            <span key={index}>{feature}</span>
          ))}
        </div>
      </div>

      <div className="auth-right">{children}</div>
    </div>
  );
};

export default AuthLayout;