import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaFilter,
  FaUser,
  FaCalendar,
  FaInfoCircle,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaEye,
  FaTrash,
  FaShieldAlt,
  FaKey,
  FaDatabase,
  FaUserShield,
  FaFileAlt
} from 'react-icons/fa';
import './AuditLog.css';

const AuditLog = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  const logActions = [
    'user.login',
    'user.logout',
    'user.create',
    'user.update',
    'user.delete',
    'payment.create',
    'payment.verify',
    'student.register',
    'student.update',
    'settings.update',
    'backup.create',
    'backup.restore',
    'system.login_failed'
  ];

  const severityLevels = {
    info: { label: 'Info', icon: FaInfoCircle, color: '#3498db' },
    warning: { label: 'Warning', icon: FaExclamationTriangle, color: '#f39c12' },
    error: { label: 'Error', icon: FaTimesCircle, color: '#e74c3c' },
    success: { label: 'Success', icon: FaCheckCircle, color: '#27ae60' }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, searchTerm, actionFilter, userFilter, dateRange]);

  const loadLogs = () => {
    // Simulated audit log data
    const sampleLogs = [
      {
        id: 1,
        timestamp: '2024-01-15T10:30:00Z',
        user: 'john.doe@apaer.ac.rw',
        action: 'user.login',
        severity: 'info',
        description: 'User logged in successfully',
        ipAddress: '192.168.1.100',
        userAgent: 'Chrome/120.0.0.0',
        resource: 'Authentication',
        details: { method: 'password' }
      },
      {
        id: 2,
        timestamp: '2024-01-15T10:25:00Z',
        user: 'alice.smith@apaer.ac.rw',
        action: 'student.register',
        severity: 'success',
        description: 'New student registration completed',
        ipAddress: '192.168.1.101',
        userAgent: 'Firefox/121.0',
        resource: 'Student Management',
        details: { studentId: 'STU001', name: 'John Smith' }
      },
      {
        id: 3,
        timestamp: '2024-01-15T10:20:00Z',
        user: 'system',
        action: 'system.login_failed',
        severity: 'warning',
        description: 'Failed login attempt',
        ipAddress: '192.168.1.105',
        userAgent: 'Safari/17.0',
        resource: 'Authentication',
        details: { reason: 'Invalid credentials', attempts: 3 }
      },
      {
        id: 4,
        timestamp: '2024-01-15T10:15:00Z',
        user: 'robert.j@apaer.ac.rw',
        action: 'payment.verify',
        severity: 'success',
        description: 'Payment verification completed',
        ipAddress: '192.168.1.102',
        userAgent: 'Chrome/120.0.0.0',
        resource: 'Payment Management',
        details: { paymentId: 'PAY001', amount: '50000 RWF' }
      }
    ];
    setLogs(sampleLogs);
  };

  const filterLogs = () => {
    let filtered = logs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress.includes(searchTerm)
      );
    }

    // Action filter
    if (actionFilter !== 'all') {
      filtered = filtered.filter(log => log.action === actionFilter);
    }

    // User filter
    if (userFilter !== 'all') {
      filtered = filtered.filter(log => log.user === userFilter);
    }

    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(log => new Date(log.timestamp) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      filtered = filtered.filter(log => new Date(log.timestamp) <= new Date(dateRange.end + 'T23:59:59'));
    }

    setFilteredLogs(filtered);
  };

  const clearLogs = () => {
    if (window.confirm('Are you sure you want to clear all audit logs? This action cannot be undone.')) {
      setLogs([]);
    }
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Severity', 'Description', 'IP Address', 'Resource'],
      ...filteredLogs.map(log => [
        new Date(log.timestamp).toLocaleString(),
        log.user,
        log.action,
        log.severity,
        log.description,
        log.ipAddress,
        log.resource
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSeverityIcon = (severity) => {
    const level = severityLevels[severity];
    const IconComponent = level?.icon || FaInfoCircle;
    return <IconComponent style={{ color: level?.color }} />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getUniqueUsers = () => {
    return [...new Set(logs.map(log => log.user))];
  };

  return (
    <div className="audit-log-container">
      <div className="management-header">
        <div className="header-content">
          <FaShieldAlt className="header-icon" />
          <div>
            <h1>Audit Log</h1>
            <p>System activity and security audit trail</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={exportLogs}>
            <FaDownload />
            Export Logs
          </button>
          <button className="btn-danger" onClick={clearLogs}>
            <FaTrash />
            Clear Logs
          </button>
        </div>
      </div>

      <div className="log-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search logs by user, description, IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Actions</option>
            {logActions.map(action => (
              <option key={action} value={action}>{action}</option>
            ))}
          </select>

          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Users</option>
            {getUniqueUsers().map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>

          <div className="date-filters">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              placeholder="Start Date"
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              placeholder="End Date"
            />
          </div>
        </div>
      </div>

      <div className="log-stats">
        <div className="stat-card total">
          <FaFileAlt />
          <div className="stat-content">
            <span className="stat-number">{logs.length}</span>
            <span className="stat-label">Total Logs</span>
          </div>
        </div>
        <div className="stat-card info">
          <FaInfoCircle />
          <div className="stat-content">
            <span className="stat-number">
              {logs.filter(log => log.severity === 'info').length}
            </span>
            <span className="stat-label">Info</span>
          </div>
        </div>
        <div className="stat-card warning">
          <FaExclamationTriangle />
          <div className="stat-content">
            <span className="stat-number">
              {logs.filter(log => log.severity === 'warning').length}
            </span>
            <span className="stat-label">Warnings</span>
          </div>
        </div>
        <div className="stat-card error">
          <FaTimesCircle />
          <div className="stat-content">
            <span className="stat-number">
              {logs.filter(log => log.severity === 'error').length}
            </span>
            <span className="stat-label">Errors</span>
          </div>
        </div>
      </div>

      <div className="logs-table">
        <div className="table-header">
          <div className="col-timestamp">Timestamp</div>
          <div className="col-user">User</div>
          <div className="col-action">Action</div>
          <div className="col-severity">Severity</div>
          <div className="col-description">Description</div>
          <div className="col-ip">IP Address</div>
          <div className="col-resource">Resource</div>
          <div className="col-actions">Actions</div>
        </div>

        <div className="table-body">
          {filteredLogs.map(log => (
            <div key={log.id} className="log-row">
              <div className="col-timestamp">
                <FaCalendar />
                {formatDate(log.timestamp)}
              </div>
              <div className="col-user">
                <FaUser />
                {log.user}
              </div>
              <div className="col-action">
                <code>{log.action}</code>
              </div>
              <div className="col-severity">
                <span className={`severity-badge ${log.severity}`}>
                  {getSeverityIcon(log.severity)}
                  {severityLevels[log.severity]?.label}
                </span>
              </div>
              <div className="col-description">
                {log.description}
              </div>
              <div className="col-ip">
                <code>{log.ipAddress}</code>
              </div>
              <div className="col-resource">
                {log.resource}
              </div>
              <div className="col-actions">
                <button
                  className="btn-view"
                  onClick={() => alert(JSON.stringify(log.details, null, 2))}
                  title="View Details"
                >
                  <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredLogs.length === 0 && (
        <div className="empty-state">
          <FaFileAlt className="empty-icon" />
          <h3>No audit logs found</h3>
          <p>No logs match your search criteria</p>
        </div>
      )}

      <div className="log-settings">
        <h3>Audit Log Settings</h3>
        <div className="settings-grid">
          <div className="setting-group">
            <label>Retention Period</label>
            <select defaultValue="90">
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="365">1 year</option>
              <option value="0">Forever</option>
            </select>
          </div>
          <div className="setting-group">
            <label>Log Level</label>
            <select defaultValue="info">
              <option value="error">Error only</option>
              <option value="warning">Warning and above</option>
              <option value="info">Info and above</option>
              <option value="debug">All events</option>
            </select>
          </div>
          <div className="setting-group">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span className="checkmark"></span>
              Log User Logins
            </label>
          </div>
          <div className="setting-group">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span className="checkmark"></span>
              Log Data Changes
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLog;