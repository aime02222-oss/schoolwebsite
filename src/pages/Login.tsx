// src/components/EnhancedLogin.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaShieldAlt,
  FaUserCheck,
  FaClock,
  FaHistory
} from 'react-icons/fa';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginHistory, setLoginHistory] = useState([]);
  const [securityLevel, setSecurityLevel] = useState('standard');
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the default users
    authService.initialize();
    
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      redirectBasedOnRole(currentUser);
    }

    // Load login history
    loadLoginHistory();
  }, [navigate]);

  const loadLoginHistory = () => {
    const history = JSON.parse(localStorage.getItem('apaer_login_history') || '[]');
    setLoginHistory(history.slice(0, 3)); // Show last 3 logins
  };

  const redirectBasedOnRole = (user) => {
    const redirectPaths = {
      'dos': '/admin/dos',
      'dm': '/admin/dm',
      'admin': '/admin/dashboard',
      'class_teacher': '/teacher/dashboard',
      'class_chief': '/chief/dashboard',
      'user': '/dashboard'
    };
    navigate(redirectPaths[user.role] || '/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await authService.login(formData.email, formData.password);
      
      // Track login history
      const history = JSON.parse(localStorage.getItem('apaer_login_history') || '[]');
      history.unshift({
        email: formData.email,
        timestamp: new Date().toISOString(),
        success: true
      });
      localStorage.setItem('apaer_login_history', JSON.stringify(history.slice(0, 10))); // Keep last 10

      redirectBasedOnRole(user);
    } catch (err) {
      setError(err.message);
      
      // Track failed login
      const failedAttempts = JSON.parse(localStorage.getItem('apaer_failed_logins') || '[]');
      failedAttempts.push({
        email: formData.email,
        timestamp: new Date().toISOString(),
        error: err.message
      });
      localStorage.setItem('apaer_failed_logins', JSON.stringify(failedAttempts));
    } finally {
      setIsLoading(false);
    }
  };

  // Demo accounts for testing
  const demoAccounts = [
    { 
      email: 'admin@apaer.ac.rw', 
      password: 'admin123', 
      role: 'System Administrator',
      color: '#e74c3c'
    },
    { 
      email: 'dos@apaer.ac.rw', 
      password: 'dos123', 
      role: 'Director of Studies',
      color: '#3498db'
    },
    { 
      email: 'dm@apaer.ac.rw', 
      password: 'dm123', 
      role: 'Department Manager',
      color: '#2ecc71'
    },
    { 
      email: 'teacher.sod@apaer.ac.rw', 
      password: 'teacher123', 
      role: 'Class Teacher',
      color: '#f39c12'
    },
    { 
      email: 'chief.sod@apaer.ac.rw', 
      password: 'chief123', 
      role: 'Class Chief',
      color: '#9b59b6'
    }
  ];

  const fillDemoAccount = (account) => {
    setFormData({
      email: account.email,
      password: account.password
    });
    setError('');
  };

  return (
    <div className="enhanced-login-container">
      <div className="enhanced-login-card">
        <div className="enhanced-login-header">
          <div className="login-brand">
            <FaShieldAlt className="brand-icon" />
            <div className="brand-text">
              <h2>Secure Login</h2>
              <p>Apaer Institute Authentication</p>
            </div>
          </div>
          <div className="security-badge">
            <FaUserCheck />
            <span>Secure Session</span>
          </div>
        </div>

        {error && (
          <div className="enhanced-login-error">
            <FaShieldAlt />
            <div className="error-content">
              <strong>Authentication Failed</strong>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="enhanced-login-form">
          <div className="enhanced-form-group">
            <label className="enhanced-form-label">
              <FaEnvelope />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="enhanced-form-input"
              required
              placeholder="Enter your institutional email"
            />
          </div>

          <div className="enhanced-form-group">
            <label className="enhanced-form-label">
              <FaLock />
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="enhanced-form-input"
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember this device</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            className={`enhanced-login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="login-spinner"></div>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <FaShieldAlt />
                <span>Secure Login</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Accounts Section */}
        <div className="enhanced-demo-section">
          <div className="demo-section-header">
            <FaUserCheck />
            <span>Quick Access Demo Accounts</span>
          </div>
          <div className="demo-accounts-grid">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                type="button"
                className="demo-account-btn"
                onClick={() => fillDemoAccount(account)}
                style={{ borderLeftColor: account.color }}
              >
                <div className="demo-account-info">
                  <span className="demo-role">{account.role}</span>
                  <span className="demo-email">{account.email}</span>
                </div>
                <div className="demo-fill-indicator">Fill</div>
              </button>
            ))}
          </div>
        </div>

        {/* Login History */}
        {loginHistory.length > 0 && (
          <div className="login-history">
            <div className="history-header">
              <FaHistory />
              <span>Recent Logins</span>
            </div>
            <div className="history-list">
              {loginHistory.map((login, index) => (
                <div key={index} className="history-item">
                  <div className="history-email">{login.email}</div>
                  <div className="history-time">
                    <FaClock />
                    {new Date(login.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="enhanced-login-footer">
          <p>
            Don't have an account? <Link to="/register" className="register-link">Create one now</Link>
          </p>
          <div className="security-indicators">
            <div className="security-indicator">
              <FaShieldAlt />
              <span>SSL Encrypted</span>
            </div>
            <div className="security-indicator">
              <FaUserCheck />
              <span>2FA Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;