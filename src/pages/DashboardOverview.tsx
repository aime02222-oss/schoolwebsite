import React, { useState, useEffect } from 'react';
import { 
  FaUserGraduate, 
  FaUserTie, 
  FaUserFriends, 
  FaEnvelope,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartBar,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaSchool,
  FaArrowRight,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaReceipt,
  FaChartLine,
  FaDatabase,
  FaShieldAlt,
  FaRocket
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './DashboardOverview.css';

const DashboardOverview = ({ systemStats }) => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    responseTime: '1.2s',
    uptime: '99.9%',
    storage: '2.3/5GB',
    activeUsers: 45
  });

  const [chartData, setChartData] = useState({
    revenue: [],
    registrations: [],
    messages: []
  });

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = () => {
    // Load recent activity
    const teacherSubmissions = JSON.parse(localStorage.getItem('apaer_teacher_submissions') || '[]');
    const studentSubmissions = JSON.parse(localStorage.getItem('apaer_student_submissions') || '[]');
    const parentSubmissions = JSON.parse(localStorage.getItem('apaer_parent_submissions') || '[]');
    const registrationSubmissions = JSON.parse(localStorage.getItem('apaer_registrations_submissions') || '[]');
    const payments = JSON.parse(localStorage.getItem('apaer_payments') || '[]');

    const allActivity = [
      ...teacherSubmissions.map(msg => ({ ...msg, type: 'teacher', icon: FaUserTie })),
      ...studentSubmissions.map(msg => ({ ...msg, type: 'student', icon: FaUserGraduate })),
      ...parentSubmissions.map(msg => ({ ...msg, type: 'parent', icon: FaUserFriends })),
      ...registrationSubmissions.map(msg => ({ ...msg, type: 'registration', icon: FaUserGraduate })),
      ...payments.map(payment => ({ 
        ...payment, 
        type: 'payment', 
        icon: FaMoneyBillWave,
        message: `Payment of RWF ${payment.amount} submitted`,
        submittedAt: payment.submittedAt
      }))
    ];

    const recent = [...allActivity]
      .sort((a, b) => new Date(b.submittedAt || b.submissionDate) - new Date(a.submittedAt || a.submissionDate))
      .slice(0, 6);
    
    setRecentActivity(recent);

    // Generate chart data
    generateChartData(payments, registrationSubmissions, allActivity);
  };

  const generateChartData = (payments, registrations, messages) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    const revenueData = months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 8000000) + 2000000
    }));

    const registrationData = months.map(month => ({
      month,
      count: Math.floor(Math.random() * 100) + 50
    }));

    const messageData = months.map(month => ({
      month,
      count: Math.floor(Math.random() * 200) + 100
    }));

    setChartData({
      revenue: revenueData,
      registrations: registrationData,
      messages: messageData
    });
  };

  const statsCards = [
    {
      title: 'Total Messages',
      value: systemStats.messages.total,
      icon: FaEnvelope,
      color: '#667eea',
      change: '+12%',
      trend: 'up',
      link: '/admin/dashboard?section=messages'
    },
    {
      title: 'Pending Responses',
      value: systemStats.messages.pending,
      icon: FaClock,
      color: '#FF9800',
      change: '+5%',
      trend: 'up',
      link: '/admin/dashboard?section=messages'
    },
    {
      title: 'Total Revenue',
      value: `RWF ${systemStats.payments.revenue.toLocaleString()}`,
      icon: FaMoneyBillWave,
      color: '#10B981',
      change: '+18%',
      trend: 'up',
      link: '/admin/dashboard?section=payments'
    },
    {
      title: 'Pending Payments',
      value: systemStats.payments.pending,
      icon: FaExclamationTriangle,
      color: '#EF4444',
      change: '-3%',
      trend: 'down',
      link: '/admin/dashboard?section=payments'
    },
    {
      title: 'Student Registrations',
      value: systemStats.registrations.total,
      icon: FaUserGraduate,
      color: '#8B5CF6',
      change: '+8%',
      trend: 'up',
      link: '/admin/dashboard?section=registrations'
    },
    {
      title: 'Active Timetables',
      value: systemStats.timetable.published,
      icon: FaCalendarAlt,
      color: '#F59E0B',
      change: '+2%',
      trend: 'up',
      link: '/admin/timetable/manage'
    }
  ];

  const quickActions = [
    {
      title: 'Process Payments',
      description: 'Verify and manage student fee payments',
      icon: FaMoneyBillWave,
      link: '/admin/dashboard?section=payments',
      color: '#10B981',
      count: systemStats.payments.pending
    },
    {
      title: 'Generate Timetable',
      description: 'Create new class schedules',
      icon: FaCalendarAlt,
      link: '/admin/timetable/generate',
      color: '#667eea',
      count: null
    },
    {
      title: 'Review Registrations',
      description: 'Process new student applications',
      icon: FaUserGraduate,
      link: '/admin/dashboard?section=registrations',
      color: '#8B5CF6',
      count: systemStats.registrations.pending
    },
    {
      title: 'Manage Messages',
      description: 'Respond to inquiries and submissions',
      icon: FaEnvelope,
      link: '/admin/dashboard?section=messages',
      color: '#F59E0B',
      count: systemStats.messages.pending
    }
  ];

  const performanceIndicators = [
    {
      title: 'System Response',
      value: performanceMetrics.responseTime,
      icon: FaRocket,
      status: 'excellent',
      description: 'Average API response time'
    },
    {
      title: 'System Uptime',
      value: performanceMetrics.uptime,
      icon: FaShieldAlt,
      status: 'excellent',
      description: 'Current month uptime'
    },
    {
      title: 'Storage Used',
      value: performanceMetrics.storage,
      icon: FaDatabase,
      status: 'good',
      description: 'Database storage utilization'
    },
    {
      title: 'Active Users',
      value: performanceMetrics.activeUsers,
      icon: FaUserGraduate,
      status: 'good',
      description: 'Concurrent users'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="badge pending"><FaClock /> Pending</span>;
      case 'replied': return <span className="badge replied"><FaCheckCircle /> Replied</span>;
      case 'verified': return <span className="badge verified"><FaCheckCircle /> Verified</span>;
      case 'urgent': return <span className="badge urgent"><FaExclamationTriangle /> Urgent</span>;
      default: return <span className="badge pending"><FaClock /> Pending</span>;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'teacher': return <FaUserTie className="activity-icon teacher" />;
      case 'student': return <FaUserGraduate className="activity-icon student" />;
      case 'parent': return <FaUserFriends className="activity-icon parent" />;
      case 'registration': return <FaUserGraduate className="activity-icon registration" />;
      case 'payment': return <FaMoneyBillWave className="activity-icon payment" />;
      default: return <FaEnvelope className="activity-icon default" />;
    }
  };

  return (
    <div className="dashboard-overview">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-text">
            <h1>Welcome back, Administrator! 👋</h1>
            <p>Here's what's happening with Apaer Institute today. You have <strong>{systemStats.messages.pending + systemStats.payments.pending}</strong> items requiring attention.</p>
          </div>
          <div className="welcome-stats">
            <div className="welcome-stat">
              <FaMoneyBillWave />
              <div>
                <span>Today's Revenue</span>
                <strong>RWF 245,000</strong>
              </div>
            </div>
            <div className="welcome-stat">
              <FaUserGraduate />
              <div>
                <span>New Registrations</span>
                <strong>12 Students</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="stats-grid">
        {statsCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-header">
              <div className="stat-icon" style={{ color: stat.color }}>
                <stat.icon />
              </div>
              <div className={`trend-indicator ${stat.trend}`}>
                {stat.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
            <Link to={stat.link} className="stat-link">
              <FaEye />
              <span>View Details</span>
            </Link>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Revenue Overview</h3>
            <span>Last 6 months</span>
          </div>
          <div className="chart-container">
            {chartData.revenue.map((item, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar-fill"
                  style={{ 
                    height: `${(item.revenue / 10000000) * 100}%`,
                    background: 'linear-gradient(to top, #10B981, #059669)'
                  }}
                  title={`RWF ${item.revenue.toLocaleString()}`}
                ></div>
                <span className="bar-label">{item.month}</span>
              </div>
            ))}
          </div>
          <div className="chart-footer">
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#10B981' }}></div>
                <span>School Fees Revenue</span>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Registration Trends</h3>
            <span>Last 6 months</span>
          </div>
          <div className="chart-container">
            {chartData.registrations.map((item, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar-fill"
                  style={{ 
                    height: `${(item.count / 200) * 100}%`,
                    background: 'linear-gradient(to top, #667eea, #764ba2)'
                  }}
                  title={`${item.count} students`}
                ></div>
                <span className="bar-label">{item.month}</span>
              </div>
            ))}
          </div>
          <div className="chart-footer">
            <div className="chart-stats">
              <div className="stat">
                <span>Total This Year</span>
                <strong>1,248 Students</strong>
              </div>
              <div className="stat">
                <span>Growth Rate</span>
                <strong className="positive">+15.2%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Performance */}
      <div className="actions-performance-section">
        <div className="quick-actions-card">
          <div className="section-header">
            <h3>Quick Actions</h3>
            <span>Frequently used tasks</span>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link} className="quick-action-card">
                <div className="action-icon" style={{ color: action.color }}>
                  <action.icon />
                </div>
                <div className="action-content">
                  <h4>{action.title}</h4>
                  <p>{action.description}</p>
                </div>
                <div className="action-meta">
                  {action.count && action.count > 0 && (
                    <span className="action-badge">{action.count}</span>
                  )}
                  <div className="action-arrow">
                    <FaArrowRight />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="performance-card">
          <div className="section-header">
            <h3>System Performance</h3>
            <span>Real-time metrics</span>
          </div>
          <div className="performance-grid">
            {performanceIndicators.map((metric, index) => (
              <div key={index} className="performance-item">
                <div className="metric-icon">
                  <metric.icon />
                </div>
                <div className="metric-content">
                  <h4>{metric.value}</h4>
                  <span>{metric.title}</span>
                  <p>{metric.description}</p>
                </div>
                <div className={`status-dot ${metric.status}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & System Overview */}
      <div className="activity-overview-section">
        <div className="recent-activity-card">
          <div className="section-header">
            <h3>Recent Activity</h3>
            <Link to="/admin/dashboard?section=messages" className="view-all-link">
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="activity-list">
            {recentActivity.length === 0 ? (
              <div className="no-activity">
                <FaEnvelope />
                <p>No recent activity</p>
                <span>New submissions will appear here</span>
              </div>
            ) : (
              recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-main">
                    {getActivityIcon(activity.type)}
                    <div className="activity-content">
                      <p className="activity-title">
                        {activity.message || activity.inquiry || `New ${activity.type} submission`}
                      </p>
                      <div className="activity-meta">
                        <span className="activity-name">
                          {activity.fullName || activity.studentName || activity.parentName || 'Unknown User'}
                        </span>
                        <span className="activity-time">
                          {new Date(activity.submittedAt || activity.submissionDate).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="activity-actions">
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="system-overview-card">
          <div className="section-header">
            <h3>System Overview</h3>
            <span>Current status</span>
          </div>
          <div className="system-stats">
            <div className="system-stat">
              <div className="stat-info">
                <FaDatabase />
                <div>
                  <strong>Database</strong>
                  <span>All systems operational</span>
                </div>
              </div>
              <div className="stat-status online">Online</div>
            </div>
            <div className="system-stat">
              <div className="stat-info">
                <FaShieldAlt />
                <div>
                  <strong>Security</strong>
                  <span>No threats detected</span>
                </div>
              </div>
              <div className="stat-status secure">Secure</div>
            </div>
            <div className="system-stat">
              <div className="stat-info">
                <FaChartLine />
                <div>
                  <strong>Performance</strong>
                  <span>Optimal conditions</span>
                </div>
              </div>
              <div className="stat-status optimal">Optimal</div>
            </div>
            <div className="system-stat">
              <div className="stat-info">
                <FaReceipt />
                <div>
                  <strong>Backups</strong>
                  <span>Last backup: 2 hours ago</span>
                </div>
              </div>
              <div className="stat-status good">Current</div>
            </div>
          </div>
          <div className="system-actions">
            <button className="btn-system primary">
              <FaRocket />
              System Report
            </button>
            <button className="btn-system secondary">
              <FaChartBar />
              Generate Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;