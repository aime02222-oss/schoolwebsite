// src/components/EnhancedProtectedRoute.js
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { 
  FaShieldAlt, 
  FaExclamationTriangle, 
  FaUserClock,
  FaUserLock
} from 'react-icons/fa';
import './EnhancedAuth.css';

const ProtectedRoute = ({ 
  children, 
  role = null, 
  roles = [], 
  permissions = [],
  requireAuth = true 
}) => {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      // Simulate authentication check
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userData = JSON.parse(localStorage.getItem('apaer_current_user') || 'null');
      const token = localStorage.getItem('apaer_token');
      const lastAuth = localStorage.getItem('apaer_last_auth');
      
      // Check if session is still valid (24 hours)
      if (lastAuth) {
        const authTime = new Date(lastAuth);
        const currentTime = new Date();
        const hoursDiff = (currentTime - authTime) / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
          // Session expired
          localStorage.removeItem('apaer_current_user');
          localStorage.removeItem('apaer_token');
          localStorage.removeItem('apaer_last_auth');
          setUser(null);
          setIsChecking(false);
          return;
        }
      }
      
      setUser(userData);
    } catch (error) {
      console.error('Authentication check failed:', error);
      setUser(null);
    } finally {
      setIsChecking(false);
    }
  };

  const hasRequiredRole = () => {
    if (!role && roles.length === 0) return true;
    if (role && user?.role === role) return true;
    if (roles.length > 0 && roles.includes(user?.role)) return true;
    return false;
  };

  const hasRequiredPermissions = () => {
    if (permissions.length === 0) return true;
    if (!user?.permissions) return false;
    
    return permissions.every(permission => 
      user.permissions.includes('all') || user.permissions.includes(permission)
    );
  };

  const isUserActive = () => {
    return user?.isActive !== false;
  };

  if (isChecking) {
    return (
      <div className="enhanced-auth-checking">
        <div className="auth-checking-content">
          <div className="checking-spinner"></div>
          <h3>Verifying Access</h3>
          <p>Checking your permissions...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if authentication is required but user is not authenticated
  if (requireAuth && !user) {
    // Track unauthorized access attempt
    const accessAttempts = JSON.parse(localStorage.getItem('apaer_access_attempts') || '[]');
    accessAttempts.push({
      path: location.pathname,
      timestamp: new Date().toISOString(),
      type: 'unauthenticated'
    });
    localStorage.setItem('apaer_access_attempts', JSON.stringify(accessAttempts));
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user account is active
  if (requireAuth && !isUserActive()) {
    localStorage.removeItem('apaer_current_user');
    localStorage.removeItem('apaer_token');
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (requireAuth && !hasRequiredRole()) {
    return (
      <div className="enhanced-unauthorized">
        <div className="unauthorized-content">
          <div className="unauthorized-icon">
            <FaUserLock />
          </div>
          <h1>Access Denied</h1>
          <p>
            You don't have permission to access this page. 
            <br />
            Required role: {role || roles.join(' or ')}
          </p>
          <div className="unauthorized-actions">
            <button 
              onClick={() => window.history.back()} 
              className="btn-secondary"
            >
              Go Back
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('apaer_current_user');
                localStorage.removeItem('apaer_token');
                window.location.href = '/login';
              }}
              className="btn-primary"
            >
              Switch Account
            </button>
          </div>
          <div className="user-info">
            <p>Current role: <strong>{user?.role}</strong></p>
            <p>Logged in as: <strong>{user?.email}</strong></p>
          </div>
        </div>
      </div>
    );
  }

  // Check permission-based access
  if (requireAuth && !hasRequiredPermissions()) {
    return (
      <div className="enhanced-unauthorized">
        <div className="unauthorized-content">
          <div className="unauthorized-icon">
            <FaShieldAlt />
          </div>
          <h1>Insufficient Permissions</h1>
          <p>
            Your account doesn't have the required permissions to access this resource.
            <br />
            Required permissions: {permissions.join(', ')}
          </p>
          <div className="unauthorized-actions">
            <button 
              onClick={() => window.history.back()} 
              className="btn-secondary"
            >
              Go Back
            </button>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="btn-primary"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check for session timeout warning (last 5 minutes of 24-hour session)
  if (user) {
    const lastAuth = localStorage.getItem('apaer_last_auth');
    if (lastAuth) {
      const authTime = new Date(lastAuth);
      const currentTime = new Date();
      const hoursDiff = (currentTime - authTime) / (1000 * 60 * 60);
      
      if (hoursDiff > 23.5) { // Last 30 minutes of session
        // You could show a session timeout warning here
        console.warn('Session will expire soon');
      }
    }
  }

  // All checks passed, render the protected component
  return children;
};

// Higher-order component for route protection
export const withEnhancedProtection = (Component, options = {}) => {
  return (props) => (
    <EnhancedProtectedRoute {...options}>
      <Component {...props} />
    </EnhancedProtectedRoute>
  );
};

export default ProtectedRoute;