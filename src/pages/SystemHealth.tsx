import React from 'react';
import { FaServer, FaDatabase, FaNetworkWired, FaShieldAlt } from 'react-icons/fa';
import './SystemHealth.css';

const SystemHealth = ({ systemHealth }) => {
  const healthMetrics = [
    {
      id: 'performance',
      label: 'CPU Performance',
      value: systemHealth.performance,
      icon: FaServer,
      color: '#27ae60'
    },
    {
      id: 'storage',
      label: 'Storage Usage',
      value: systemHealth.storage,
      icon: FaDatabase,
      color: systemHealth.storage > 80 ? '#e74c3c' : '#3498db'
    },
    {
      id: 'network',
      label: 'Network Uptime',
      value: 99.9,
      icon: FaNetworkWired,
      color: '#9b59b6'
    },
    {
      id: 'security',
      label: 'Security Status',
      value: 100,
      icon: FaShieldAlt,
      color: '#2ecc71'
    }
  ];

  return (
    <div className="system-health-container">
      <div className="health-header">
        <h2>System Health Monitor</h2>
        <p>Real-time monitoring of system performance and resources</p>
      </div>

      <div className="health-metrics">
        {healthMetrics.map(metric => {
          const IconComponent = metric.icon;
          return (
            <div key={metric.id} className="metric-card">
              <div className="metric-header">
                <div 
                  className="metric-icon"
                  style={{ backgroundColor: metric.color }}
                >
                  <IconComponent />
                </div>
                <div className="metric-info">
                  <h3>{metric.label}</h3>
                  <span className="metric-value">{metric.value}%</span>
                </div>
              </div>
              <div className="metric-progress">
                <div 
                  className="progress-bar"
                  style={{ 
                    width: `${metric.value}%`,
                    backgroundColor: metric.color
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="system-status-overview">
        <div className="status-card healthy">
          <h4>Overall System Status</h4>
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span>Healthy</span>
          </div>
          <p>All systems are operating normally</p>
        </div>
        
        <div className="status-card uptime">
          <h4>System Uptime</h4>
          <div className="uptime-value">{systemHealth.uptime}</div>
          <p>Current session stability</p>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;