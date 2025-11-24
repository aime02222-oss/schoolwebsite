import React, { useState, useEffect } from 'react';
import { 
  FaDatabase,
  FaShieldAlt,
  FaCog,
  FaServer,
  FaNetworkWired,
  FaUserShield,
  FaKey,
  FaHistory,
  FaCloudDownloadAlt,
  FaCloudUploadAlt,
  FaSync,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCogs,
  FaCode,
  FaLock,
  FaUnlock,
  FaRegCalendarAlt,
  Hdd
} from 'react-icons/fa';

const SystemTab = ({ type }) => {
  const [systemStatus, setSystemStatus] = useState({});
  const [backupHistory, setBackupHistory] = useState([]);
  const [securityLogs, setSecurityLogs] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const systemData = {
    backup: {
      title: 'Backup & Restore',
      description: 'Manage system backups and data restoration',
      icon: FaDatabase,
      features: [
        {
          name: 'Automatic Backups',
          status: 'enabled',
          lastRun: '2024-01-15 02:00',
          nextRun: '2024-01-16 02:00'
        },
        {
          name: 'Cloud Storage',
          status: 'connected',
          details: 'Google Drive'
        },
        {
          name: 'Local Storage',
          status: 'active',
          details: '/backups/'
        }
      ]
    },
    security: {
      title: 'Security Center',
      description: 'Monitor and manage system security settings',
      icon: FaShieldAlt,
      features: [
        {
          name: 'Firewall',
          status: 'active',
          details: 'All ports secured'
        },
        {
          name: 'SSL Certificate',
          status: 'valid',
          details: 'Expires: 2024-12-31'
        },
        {
          name: 'Two-Factor Auth',
          status: 'enabled',
          details: 'Required for admins'
        }
      ]
    },
    settings: {
      title: 'System Settings',
      description: 'Configure system preferences and options',
      icon: FaCog,
      features: [
        {
          name: 'Maintenance Mode',
          status: 'disabled',
          details: 'Site is live'
        },
        {
          name: 'Cache System',
          status: 'enabled',
          details: 'Redis Active'
        },
        {
          name: 'Email Notifications',
          status: 'enabled',
          details: 'All events'
        }
      ]
    }
  };

  useEffect(() => {
    loadSystemData();
  }, [type]);

  const loadSystemData = () => {
    setLoading(true);
    
    // Simulate loading system data
    setTimeout(() => {
      setSystemStatus({
        server: { status: 'online', cpu: 45, memory: 68, disk: 24 },
        database: { status: 'online', connections: 24, size: '2.4GB' },
        network: { status: 'stable', latency: '24ms', uptime: '99.8%' },
        security: { status: 'secure', threats: 0, lastScan: '2024-01-15' }
      });

      setBackupHistory([
        {
          id: 1,
          type: 'Full Backup',
          size: '1.2GB',
          status: 'completed',
          date: '2024-01-15 02:00',
          duration: '12m 34s'
        },
        {
          id: 2,
          type: 'Incremental',
          size: '245MB',
          status: 'completed',
          date: '2024-01-14 02:00',
          duration: '3m 12s'
        }
      ]);

      setSecurityLogs([
        {
          id: 1,
          event: 'User Login',
          user: 'admin@apaer.ac.rw',
          ip: '192.168.1.100',
          status: 'success',
          timestamp: '2024-01-15 14:30'
        },
        {
          id: 2,
          event: 'Failed Login',
          user: 'unknown@email.com',
          ip: '103.156.22.45',
          status: 'blocked',
          timestamp: '2024-01-15 13:15'
        }
      ]);

      setSettings({
        siteName: 'Apaer Institute',
        timezone: 'Africa/Kigali',
        language: 'English',
        maintenance: false,
        debug: false
      });

      setLoading(false);
    }, 1000);
  };

  const currentType = systemData[type] || systemData.backup;

  const handleBackupAction = (action) => {
    switch (action) {
      case 'create':
        alert('Starting backup creation...');
        break;
      case 'restore':
        alert('Initiating restore process...');
        break;
      case 'schedule':
        alert('Opening backup schedule settings...');
        break;
      default:
        break;
    }
  };

  const handleSecurityAction = (action) => {
    switch (action) {
      case 'scan':
        alert('Starting security scan...');
        break;
      case 'update':
        alert('Checking for security updates...');
        break;
      case 'logs':
        alert('Opening security logs...');
        break;
      default:
        break;
    }
  };

  const handleSettingToggle = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
      case 'active':
      case 'enabled':
      case 'completed':
      case 'success':
      case 'valid':
      case 'connected':
        return <FaCheckCircle className="status-icon success" />;
      case 'warning':
      case 'pending':
        return <FaExclamationTriangle className="status-icon warning" />;
      case 'error':
      case 'failed':
      case 'blocked':
        return <FaTimesCircle className="status-icon error" />;
      default:
        return <FaClock className="status-icon neutral" />;
    }
  };

  const renderBackupContent = () => (
    <div className="system-content">
      <div className="backup-controls">
        <div className="control-group">
          <h4>Quick Actions</h4>
          <div className="action-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => handleBackupAction('create')}
            >
              <FaCloudUploadAlt />
              Create Backup Now
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => handleBackupAction('restore')}
            >
              <FaCloudDownloadAlt />
              Restore from Backup
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => handleBackupAction('schedule')}
            >
              <FaRegCalendarAlt />
              Schedule Settings
            </button>
          </div>
        </div>

        <div className="storage-status">
          <h4>Storage Status</h4>
          <div className="storage-cards">
            <div className="storage-card">
              <div className="storage-icon">
                <FaDatabase />
              </div>
              <div className="storage-info">
                <span>Database Size</span>
                <strong>2.4 GB</strong>
              </div>
              <div className="storage-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '48%' }}></div>
                </div>
                <span>48% used</span>
              </div>
            </div>
            
            <div className="storage-card">
              <div className="storage-icon">
                <Hdd />
              </div>
              <div className="storage-info">
                <span>Media Files</span>
                <strong>1.8 GB</strong>
              </div>
              <div className="storage-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '36%' }}></div>
                </div>
                <span>36% used</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="backup-history">
        <h4>Recent Backups</h4>
        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Size</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {backupHistory.map(backup => (
                <tr key={backup.id}>
                  <td>{backup.type}</td>
                  <td>{backup.size}</td>
                  <td>
                    {getStatusIcon(backup.status)}
                    <span className={`status-text ${backup.status}`}>
                      {backup.status}
                    </span>
                  </td>
                  <td>{backup.date}</td>
                  <td>{backup.duration}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Download">
                        <FaCloudDownloadAlt />
                      </button>
                      <button className="btn-icon" title="Restore">
                        <FaSync />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSecurityContent = () => (
    <div className="system-content">
      <div className="security-overview">
        <div className="security-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FaShieldAlt />
            </div>
            <div className="stat-content">
              <h3>0</h3>
              <p>Active Threats</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaUserShield />
            </div>
            <div className="stat-content">
              <h3>24</h3>
              <p>Secure Logins</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaLock />
            </div>
            <div className="stat-content">
              <h3>98%</h3>
              <p>System Security</p>
            </div>
          </div>
        </div>

        <div className="security-controls">
          <h4>Security Actions</h4>
          <div className="action-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => handleSecurityAction('scan')}
            >
              <FaShieldAlt />
              Run Security Scan
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => handleSecurityAction('update')}
            >
              <FaSync />
              Check for Updates
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => handleSecurityAction('logs')}
            >
              <FaHistory />
              View Security Logs
            </button>
          </div>
        </div>
      </div>

      <div className="security-logs">
        <h4>Recent Security Events</h4>
        <div className="logs-list">
          {securityLogs.map(log => (
            <div key={log.id} className={`log-item ${log.status}`}>
              <div className="log-icon">
                {getStatusIcon(log.status)}
              </div>
              <div className="log-details">
                <div className="log-event">{log.event}</div>
                <div className="log-meta">
                  <span>User: {log.user}</span>
                  <span>IP: {log.ip}</span>
                </div>
              </div>
              <div className="log-time">{log.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="system-content">
      <div className="settings-grid">
        <div className="settings-group">
          <h4>General Settings</h4>
          <div className="setting-item">
            <label>Site Name</label>
            <input 
              type="text" 
              value={settings.siteName}
              onChange={(e) => handleSettingToggle('siteName', e.target.value)}
            />
          </div>
          <div className="setting-item">
            <label>Timezone</label>
            <select 
              value={settings.timezone}
              onChange={(e) => handleSettingToggle('timezone', e.target.value)}
            >
              <option value="Africa/Kigali">Africa/Kigali (GMT+2)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div className="setting-item">
            <label>Default Language</label>
            <select 
              value={settings.language}
              onChange={(e) => handleSettingToggle('language', e.target.value)}
            >
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Kinyarwanda">Kinyarwanda</option>
            </select>
          </div>
        </div>

        <div className="settings-group">
          <h4>System Features</h4>
          <div className="setting-item toggle">
            <div className="toggle-label">
              <span>Maintenance Mode</span>
              <small>Put the site in maintenance mode</small>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings.maintenance}
                onChange={(e) => handleSettingToggle('maintenance', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item toggle">
            <div className="toggle-label">
              <span>Debug Mode</span>
              <small>Enable detailed error reporting</small>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings.debug}
                onChange={(e) => handleSettingToggle('debug', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item toggle">
            <div className="toggle-label">
              <span>Email Notifications</span>
              <small>Receive system notifications</small>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings.notifications !== false}
                onChange={(e) => handleSettingToggle('notifications', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-group">
          <h4>System Information</h4>
          <div className="info-cards">
            <div className="info-card">
              <FaServer />
              <div className="info-content">
                <span>Server</span>
                <strong>Apache 2.4</strong>
              </div>
            </div>
            <div className="info-card">
              <FaCode />
              <div className="info-content">
                <span>PHP Version</span>
                <strong>8.1.12</strong>
              </div>
            </div>
            <div className="info-card">
              <FaDatabase />
              <div className="info-content">
                <span>Database</span>
                <strong>MySQL 8.0</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn btn-primary">
          Save Changes
        </button>
        <button className="btn btn-outline">
          Reset to Defaults
        </button>
        <button className="btn btn-outline">
          Clear Cache
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="system-loading">
        <div className="loading-spinner"></div>
        <p>Loading {currentType.title}...</p>
      </div>
    );
  }

  return (
    <div className="system-tab">
      <div className="tab-header">
        <div className="header-content">
          <div className="header-icon">
            <currentType.icon />
          </div>
          <div>
            <h2>{currentType.title}</h2>
            <p>{currentType.description}</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <FaSync />
            Refresh Status
          </button>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="system-status-overview">
        <h3>System Status</h3>
        <div className="status-grid">
          {Object.entries(systemStatus).map(([key, status]) => (
            <div key={key} className={`status-card ${status.status}`}>
              <div className="status-header">
                <div className="status-icon">
                  {getStatusIcon(status.status)}
                </div>
                <div className="status-title">
                  <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                  <span className={`status-text ${status.status}`}>
                    {status.status}
                  </span>
                </div>
              </div>
              <div className="status-details">
                {status.cpu && (
                  <div className="status-metric">
                    <span>CPU: {status.cpu}%</span>
                    <div className="metric-bar">
                      <div 
                        className="metric-fill" 
                        style={{ width: `${status.cpu}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {status.memory && (
                  <div className="status-metric">
                    <span>Memory: {status.memory}%</span>
                    <div className="metric-bar">
                      <div 
                        className="metric-fill" 
                        style={{ width: `${status.memory}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {status.connections && (
                  <div className="status-metric">
                    <span>Connections: {status.connections}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Status */}
      <div className="features-status">
        <h3>Feature Status</h3>
        <div className="features-grid">
          {currentType.features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-header">
                <h4>{feature.name}</h4>
                {getStatusIcon(feature.status)}
              </div>
              <div className="feature-details">
                <span className={`status-text ${feature.status}`}>
                  {feature.status}
                </span>
                {feature.details && (
                  <span className="feature-info">{feature.details}</span>
                )}
                {feature.lastRun && (
                  <div className="feature-meta">
                    <span>Last: {feature.lastRun}</span>
                    <span>Next: {feature.nextRun}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Type-specific Content */}
      {type === 'backup' && renderBackupContent()}
      {type === 'security' && renderSecurityContent()}
      {type === 'settings' && renderSettingsContent()}
    </div>
  );
};

export default SystemTab;