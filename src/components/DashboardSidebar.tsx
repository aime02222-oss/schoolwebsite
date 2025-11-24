import React, { useState, useEffect } from 'react';
import { 
  FaComments, 
  FaUserGraduate, 
  FaUserTie, 
  FaUserFriends,
  FaChartLine,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaBars
} from 'react-icons/fa';
import MessagesCenter from './MessagesCenter';
import RegistrationsManager from './RegistrationsManager';
import TeacherSubmissions from './TeacherSubmissions';
import StudentSubmissions from './StudentSubmissions';
import ParentSubmissions from './ParentSubmissions';
import DashboardOverview from './DashboardOverview';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigationItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: FaChartLine },
    { id: 'messages', label: 'Messages Center', icon: FaComments, badge: unreadCount },
    { id: 'registrations', label: 'Student Registrations', icon: FaUserGraduate },
    { id: 'teachers', label: 'Teacher Submissions', icon: FaUserTie },
    { id: 'students', label: 'Student Inquiries', icon: FaUserGraduate },
    { id: 'parents', label: 'Parent Communications', icon: FaUserFriends },
  ];

  // Load unread messages count
  useEffect(() => {
    const updateUnreadCount = () => {
      const allSubmissions = [
        ...JSON.parse(localStorage.getItem('apaer_teacher_submissions') || '[]'),
        ...JSON.parse(localStorage.getItem('apaer_student_submissions') || '[]'),
        ...JSON.parse(localStorage.getItem('apaer_parent_submissions') || '[]'),
        ...JSON.parse(localStorage.getItem('apaer_registrations_submissions') || '[]')
      ];
      
      const pending = allSubmissions.filter(msg => msg.status === 'pending').length;
      setUnreadCount(pending);
    };

    updateUnreadCount();
    window.addEventListener('storage', updateUnreadCount);
    return () => window.removeEventListener('storage', updateUnreadCount);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />;
      case 'messages':
        return <MessagesCenter />;
      case 'registrations':
        return <RegistrationsManager />;
      case 'teachers':
        return <TeacherSubmissions />;
      case 'students':
        return <StudentSubmissions />;
      case 'parents':
        return <ParentSubmissions />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="school-brand">
            <FaUserTie className="brand-icon" />
            <div className="brand-info">
              <h3>Apaer Institute</h3>
              <span>Admin Portal</span>
            </div>
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigationItems.map(item => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <div className="nav-icon">
                  <IconComponent />
                </div>
                <span className="nav-label">{item.label}</span>
                {item.badge > 0 && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item">
            <div className="nav-icon">
              <FaCog />
            </div>
            <span className="nav-label">Settings</span>
          </button>
          <button className="nav-item">
            <div className="nav-icon">
              <FaSignOutAlt />
            </div>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <h1>{navigationItems.find(item => item.id === activeSection)?.label}</h1>
            <p>Manage and respond to all institute communications</p>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <FaBell />
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>
            <div className="admin-profile">
              <div className="profile-avatar">A</div>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;