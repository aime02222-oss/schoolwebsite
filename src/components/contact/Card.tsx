import './Card.css';

const Card = () => {
  const handleRedirect = () => {
    window.open('https://urubuto.rw', '_blank');
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <h2 className="card-title">View Your Report Card</h2>
        <p className="card-description">
          Access your academic records through our partner platform Urubuto.rw
        </p>
      </div>

      <div className="card-content">
        {/* Urubuto Platform Card */}
        <div className="platform-card">
          <div className="platform-header">
            <h3 className="platform-title">Urubuto Education Platform</h3>
            <p className="platform-subtitle">Click below to view your report cards and academic progress</p>
          </div>
          <div className="text-center">
            <button 
              onClick={handleRedirect}
              className="primary-button"
            >
              Go to Urubuto.rw
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="help-section">
          <h4 className="help-title">Need Help?</h4>
          <p className="help-description">
            Contact the administration office if you have trouble accessing your records:
          </p>
          <ul className="help-list">
            <li className="help-item">
              <span className="bullet"></span>
              <span className="help-label">Email:</span>
              <span className="help-value">registrar@apaer.ac.rw</span>
            </li>
            <li className="help-item">
              <span className="bullet"></span>
              <span className="help-label">Phone:</span>
              <span className="help-value phone">+250 788 123 456</span>
            </li>
            <li className="help-item">
              <span className="bullet"></span>
              <span className="help-label">Office Hours:</span>
              <span className="help-value hours">Mon-Fri, 8AM-5PM</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;