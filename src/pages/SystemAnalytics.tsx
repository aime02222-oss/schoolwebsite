// src/components/SystemAnalytics.js
import React, { useState, useEffect } from 'react';
import {
  FaChartBar,
  FaMoneyBillWave,
  FaUserGraduate,
  FaEnvelope,
  FaCalendarAlt,
  FaSchool,
  FaArrowUp,
  FaArrowDown,
  FaUsers
} from 'react-icons/fa';
import './SystemAnalytics.css';

const SystemAnalytics = ({ systemStats }) => {
  const [analyticsData, setAnalyticsData] = useState({
    revenueTrend: [],
    studentGrowth: [],
    messageVolume: []
  });

  useEffect(() => {
    // Simulate analytics data
    const generateAnalyticsData = () => {
      const revenueTrend = [
        { month: 'Jan', revenue: 4500000 },
        { month: 'Feb', revenue: 5200000 },
        { month: 'Mar', revenue: 4800000 },
        { month: 'Apr', revenue: 6100000 },
        { month: 'May', revenue: 5800000 },
        { month: 'Jun', revenue: 7200000 }
      ];

      const studentGrowth = [
        { month: 'Jan', students: 450 },
        { month: 'Feb', students: 480 },
        { month: 'Mar', students: 520 },
        { month: 'Apr', students: 550 },
        { month: 'May', students: 580 },
        { month: 'Jun', students: 620 }
      ];

      const messageVolume = [
        { month: 'Jan', messages: 120 },
        { month: 'Feb', messages: 150 },
        { month: 'Mar', messages: 180 },
        { month: 'Apr', messages: 160 },
        { month: 'May', messages: 200 },
        { month: 'Jun', messages: 220 }
      ];

      setAnalyticsData({
        revenueTrend,
        studentGrowth,
        messageVolume
      });
    };

    generateAnalyticsData();
  }, []);

  const metrics = [
    {
      title: 'Total Revenue',
      value: `RWF ${systemStats.payments.revenue.toLocaleString()}`,
      icon: FaMoneyBillWave,
      change: '+12.5%',
      trend: 'up',
      color: '#10B981'
    },
    {
      title: 'Active Students',
      value: systemStats.registrations.total,
      icon: FaUserGraduate,
      change: '+8.2%',
      trend: 'up',
      color: '#667eea'
    },
    {
      title: 'Messages Processed',
      value: systemStats.messages.total,
      icon: FaEnvelope,
      change: '+15.3%',
      trend: 'up',
      color: '#F59E0B'
    },
    {
      title: 'Payment Success Rate',
      value: '94.2%',
      icon: FaChartBar,
      change: '+2.1%',
      trend: 'up',
      color: '#EF4444'
    }
  ];

  return (
    <div className="system-analytics">
      <div className="analytics-header">
        <h1>System Analytics</h1>
        <p>Comprehensive overview of system performance and metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-header">
              <div className="metric-icon" style={{ color: metric.color }}>
                <metric.icon />
              </div>
              <div className={`trend-indicator ${metric.trend}`}>
                {metric.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                <span>{metric.change}</span>
              </div>
            </div>
            <div className="metric-content">
              <h3>{metric.value}</h3>
              <p>{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Revenue Trend</h3>
          <div className="chart-container">
            {analyticsData.revenueTrend.map((item, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar-fill"
                  style={{ 
                    height: `${(item.revenue / 8000000) * 100}%`,
                    background: 'linear-gradient(to top, #667eea, #764ba2)'
                  }}
                ></div>
                <span className="bar-label">{item.month}</span>
                <span className="bar-value">RWF {(item.revenue / 1000000).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Student Growth</h3>
          <div className="chart-container">
            {analyticsData.studentGrowth.map((item, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar-fill"
                  style={{ 
                    height: `${(item.students / 800) * 100}%`,
                    background: 'linear-gradient(to top, #10B981, #059669)'
                  }}
                ></div>
                <span className="bar-label">{item.month}</span>
                <span className="bar-value">{item.students}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="status-section">
        <div className="status-card">
          <h3>System Status</h3>
          <div className="status-items">
            <div className="status-item online">
              <div className="status-dot"></div>
              <span>Payment Gateway</span>
              <strong>Operational</strong>
            </div>
            <div className="status-item online">
              <div className="status-dot"></div>
              <span>Database</span>
              <strong>Healthy</strong>
            </div>
            <div className="status-item online">
              <div className="status-dot"></div>
              <span>Email Service</span>
              <strong>Active</strong>
            </div>
            <div className="status-item online">
              <div className="status-dot"></div>
              <span>API Endpoints</span>
              <strong>Stable</strong>
            </div>
          </div>
        </div>

        <div className="quick-stats-card">
          <h3>Quick Stats</h3>
          <div className="quick-stats">
            <div className="quick-stat">
              <FaMoneyBillWave />
              <div>
                <strong>{systemStats.payments.pending}</strong>
                <span>Pending Payments</span>
              </div>
            </div>
            <div className="quick-stat">
              <FaUserGraduate />
              <div>
                <strong>{systemStats.registrations.pending}</strong>
                <span>Pending Registrations</span>
              </div>
            </div>
            <div className="quick-stat">
              <FaEnvelope />
              <div>
                <strong>{systemStats.messages.pending}</strong>
                <span>Unread Messages</span>
              </div>
            </div>
            <div className="quick-stat">
              <FaCalendarAlt />
              <div>
                <strong>{systemStats.timetable.published}</strong>
                <span>Active Timetables</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;