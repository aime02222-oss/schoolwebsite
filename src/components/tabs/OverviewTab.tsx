import React from 'react';
import { 
  FaUsers, 
  FaUserGraduate, 
  FaUserPlus, 
  FaExclamationTriangle, 
  FaDatabase, 
  FaChartLine,
  FaSync,
  FaDownload,
  FaPlus,
  FaRocket,
  FaLayerGroup,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';

const OverviewTab = ({ stats }) => {
  const dashboardStats = [
    { 
      label: 'Total Students', 
      value: stats.totalStudents.toLocaleString(), 
      change: '+12%', 
      icon: FaUsers, 
      color: 'blue',
      trend: 'up'
    },
    { 
      label: 'Active Teachers', 
      value: stats.activeTeachers.toString(), 
      change: '+5%', 
      icon: FaUserGraduate, 
      color: 'green',
      trend: 'up'
    },
    { 
      label: 'Pending Requests', 
      value: stats.pendingRequests.toString(), 
      change: '+8', 
      icon: FaUserPlus, 
      color: 'orange',
      trend: 'up'
    },
    { 
      label: 'Open Issues', 
      value: stats.unresolvedProblems.toString(), 
      change: 'Requires Attention', 
      icon: FaExclamationTriangle, 
      color: 'red',
      trend: 'alert'
    },
    { 
      label: 'Total Submissions', 
      value: stats.totalSubmissions.toLocaleString(), 
      change: '+24%', 
      icon: FaDatabase, 
      color: 'purple',
      trend: 'up'
    },
    { 
      label: 'Response Rate', 
      value: `${stats.responseRate}%`, 
      change: '+3.2%', 
      icon: FaChartLine, 
      color: 'cyan',
      trend: 'up'
    }
  ];

  const quickActions = [
    {
      title: 'Review Applications',
      description: '23 pending registration requests',
      icon: FaUserPlus,
      color: 'orange',
      action: () => console.log('Navigate to registrations')
    },
    {
      title: 'Manage Content',
      description: 'Update website slides and media',
      icon: FaRocket,
      color: 'blue',
      action: () => console.log('Navigate to content')
    },
    {
      title: 'Student Issues',
      description: '15 problems require attention',
      icon: FaExclamationTriangle,
      color: 'red',
      action: () => console.log('Navigate to problems')
    },
    {
      title: 'System Analytics',
      description: 'View performance metrics',
      icon: FaChartLine,
      color: 'green',
      action: () => console.log('Navigate to analytics')
    }
  ];

  const recentActivities = [
    { 
      id: 1, 
      action: 'New student registration', 
      user: 'Alice Uwase', 
      time: '2 hours ago', 
      type: 'registration',
      status: 'pending'
    },
    { 
      id: 2, 
      action: 'Content published', 
      user: 'System', 
      time: '5 hours ago', 
      type: 'content',
      status: 'completed'
    },
    { 
      id: 3, 
      action: 'System backup', 
      user: 'Automated', 
      time: '1 day ago', 
      type: 'system',
      status: 'completed'
    }
  ];

  return (
    <div className="overview-tab">
      <div className="tab-header">
        <div className="header-content">
          <h2>Dashboard Overview</h2>
          <p>Welcome to your administration dashboard. Here's what's happening today.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <FaSync />
            Refresh Data
          </button>
          <button className="btn btn-primary">
            <FaPlus />
            Generate Report
          </button>
          <button className="btn btn-secondary">
            <FaDownload />
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {dashboardStats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color} ${stat.trend}`}>
            <div className="stat-icon">
              <stat.icon />
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <span className="stat-label">{stat.label}</span>
              <div className="stat-change">
                <span className={`change-indicator ${stat.trend}`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="stat-graph">
              <div className="mini-chart">
                <div className="chart-bar" style={{ height: '70%' }}></div>
                <div className="chart-bar" style={{ height: '85%' }}></div>
                <div className="chart-bar" style={{ height: '60%' }}></div>
                <div className="chart-bar" style={{ height: '90%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        {/* Quick Actions */}
        <div className="content-card quick-actions-card">
          <div className="card-header">
            <h3>Quick Actions</h3>
            <span className="card-badge">Most Used</span>
          </div>
          <div className="actions-grid">
            {quickActions.map((action, index) => (
              <button 
                key={index}
                className={`action-card ${action.color}`}
                onClick={action.action}
              >
                <div className="action-icon">
                  <action.icon />
                </div>
                <div className="action-content">
                  <h4>{action.title}</h4>
                  <p>{action.description}</p>
                </div>
                <div className="action-arrow">
                  <FaChevronRight />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="content-card activity-card">
          <div className="card-header">
            <h3>Recent Activity</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon ${activity.type} ${activity.status}`}>
                  {activity.status === 'completed' ? <FaCheckCircle /> : <FaClock />}
                </div>
                <div className="activity-details">
                  <p className="activity-text">{activity.action}</p>
                  <span className="activity-meta">by {activity.user}</span>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="content-card system-card">
          <div className="card-header">
            <h3>System Status</h3>
            <div className="status-indicator online"></div>
          </div>
          <div className="system-metrics">
            <div className="metric">
              <span>CPU Usage</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '45%' }}></div>
              </div>
              <span>45%</span>
            </div>
            <div className="metric">
              <span>Memory</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '68%' }}></div>
              </div>
              <span>68%</span>
            </div>
            <div className="metric">
              <span>Storage</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '24%' }}></div>
              </div>
              <span>24%</span>
            </div>
          </div>
        </div>

        {/* Content Summary */}
        <div className="content-card summary-card">
          <div className="card-header">
            <h3>Content Summary</h3>
            <FaLayerGroup />
          </div>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-count">12</span>
              <span className="summary-label">Hero Slides</span>
            </div>
            <div className="summary-item">
              <span className="summary-count">8</span>
              <span className="summary-label">Testimonials</span>
            </div>
            <div className="summary-item">
              <span className="summary-count">24</span>
              <span className="summary-label">School Images</span>
            </div>
            <div className="summary-item">
              <span className="summary-count">15</span>
              <span className="summary-label">Achievements</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;