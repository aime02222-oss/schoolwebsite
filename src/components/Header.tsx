// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('apaer_current_user');
    localStorage.removeItem('apaer_token');
    navigate('/');
    window.location.reload();
  };

  const getDashboardLink = () => {
    if (!user) return '/auth';
    
    switch (user.role) {
      case 'dos':
        return '/admin/dos';
      case 'dm':
        return '/admin/dm';
      case 'admin':
        return '/admin/dashboard';
      case 'class_teacher':
      case 'class_chief':
        return '/attendance';
      default:
        return '/dashboard';
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h2>Apaer Institute</h2>
          </Link>
        </div>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/academic">Academic</Link>
          <Link to="/schoollife">School Life</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <button 
                className="user-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span>Welcome, {user.fullName || user.name}</span>
                <span className="user-role">({user.role})</span>
              </button>
              
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <Link to={getDashboardLink()} className="dropdown-item">
                    Dashboard
                  </Link>
                  {user.role === 'class_teacher' || user.role === 'class_chief' ? (
                    <Link to="/attendance" className="dropdown-item">
                      Attendance
                    </Link>
                  ) : null}
                  <button onClick={handleLogout} className="dropdown-item logout">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="auth-btn">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;