import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaLock } from 'react-icons/fa';
import './Unauthorized.css';

const Unauthorized = () => {
  const user = JSON.parse(localStorage.getItem('apaer_current_user') || '{}');

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <div className="error-icon">
          <FaLock />
        </div>
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        
        <div className="user-info">
          <p>
            Logged in as: <strong>{user.fullName || user.name}</strong> 
            ({user.role})
          </p>
        </div>

        <div className="action-buttons">
          <Link to="/dashboard" className="btn primary">
            <FaHome />
            Go to Dashboard
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn secondary"
          >
            <FaArrowLeft />
            Go Back
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem('apaer_current_user');
              localStorage.removeItem('apaer_token');
              window.location.href = '/';
            }}
            className="btn logout"
          >
            Logout
          </button>
        </div>

        <div className="help-section">
          <p>
            If you believe this is an error, please contact your system administrator 
            or check your role permissions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;