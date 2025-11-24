import React, { useState } from 'react';
import { 
  FaBars, 
  FaTimes, 
  FaSearch, 
  FaBell, 
  FaExpand, 
  FaCompress,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaCog,
  FaUser
} from 'react-icons/fa';

const DashboardHeader = ({ 
  user, 
  sidebarOpen, 
  onToggleSidebar, 
  onToggleFullscreen, 
  onToggleDarkMode, 
  isFullscreen, 
  darkMode, 
  onLogout 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button 
          className="sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        <div className="header-brand">
          <div className="brand-icon">⚡</div>
          <div className="brand-text">
            <h1>Admin Dashboard</h1>
            <span className="user-greeting">Welcome back, {user?.fullName}</span>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search dashboard..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <div className="header-controls">
          <button 
            className="control-btn"
            onClick={onToggleDarkMode}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button 
            className="control-btn"
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>

          <div className="notifications-wrapper">
            <button className="control-btn notification-btn">
              <FaBell />
              <span className="notification-indicator"></span>
            </button>
          </div>

          <div className="user-menu-wrapper">
            <button 
              className="user-avatar-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img 
                src={user?.avatar || '/images/default-avatar.png'} 
                alt={user?.fullName}
                className="user-avatar"
              />
              <span className="user-name">{user?.fullName}</span>
            </button>

            {showUserMenu && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <img 
                    src={user?.avatar || '/images/default-avatar.png'} 
                    alt={user?.fullName}
                    className="dropdown-avatar"
                  />
                  <div className="user-info">
                    <div className="user-display-name">{user?.fullName}</div>
                    <div className="user-email">{user?.email}</div>
                    <div className="user-role">Administrator</div>
                  </div>
                </div>

                <div className="dropdown-divider"></div>

                <button className="dropdown-item">
                  <FaUser />
                  <span>Profile Settings</span>
                </button>

                <button className="dropdown-item">
                  <FaCog />
                  <span>Account Preferences</span>
                </button>

                <div className="dropdown-divider"></div>

                <button className="dropdown-item logout" onClick={onLogout}>
                  <FaSignOutAlt />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;