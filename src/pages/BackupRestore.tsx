import React, { useState, useEffect } from 'react';
import {
  FaCloudDownloadAlt,
  FaCloudUploadAlt,
  FaHistory,
  FaTrash,
  FaPlay,
  FaPause,
  FaCheckCircle,
  FaExclamationTriangle,
  FaDatabase,
  FaServer,
  FaClock,
  FaFileArchive,
  FaSync,
  FaInfoCircle
} from 'react-icons/fa';
import './BackupRestore.css';

const BackupRestore = () => {
  const [backups, setBackups] = useState([]);
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [retentionPeriod, setRetentionPeriod] = useState(30);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [storageUsage, setStorageUsage] = useState({
    used: 2.5,
    total: 10,
    percentage: 25
  });

  useEffect(() => {
    loadBackups();
  }, []);

  const loadBackups = () => {
    // Simulated backup data
    const sampleBackups = [
      {
        id: 1,
        name: 'backup_20240115_103000',
        size: '1.2 GB',
        date: '2024-01-15T10:30:00Z',
        type: 'full',
        status: 'completed',
        description: 'Automatic daily backup'
      },
      {
        id: 2,
        name: 'backup_20240114_103000',
        size: '1.1 GB',
        date: '2024-01-14T10:30:00Z',
        type: 'full',
        status: 'completed',
        description: 'Automatic daily backup'
      },
      {
        id: 3,
        name: 'manual_backup_20240113_153000',
        size: '1.3 GB',
        date: '2024-01-13T15:30:00Z',
        type: 'full',
        status: 'completed',
        description: 'Manual backup before system update'
      }
    ];
    setBackups(sampleBackups);
  };

  const createBackup = async () => {
    setIsBackingUp(true);
    
    // Simulate backup process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newBackup = {
      id: Date.now(),
      name: `manual_backup_${new Date().toISOString().replace(/[:.]/g, '')}`,
      size: '1.4 GB',
      date: new Date().toISOString(),
      type: 'full',
      status: 'completed',
      description: 'Manual backup'
    };
    
    setBackups([newBackup, ...backups]);
    setIsBackingUp(false);
    
    alert('Backup created successfully!');
  };

  const restoreBackup = async (backupId) => {
    if (!window.confirm('Are you sure you want to restore this backup? This will replace all current data.')) {
      return;
    }
    
    setIsRestoring(true);
    
    // Simulate restore process
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    setIsRestoring(false);
    alert('Backup restored successfully!');
  };

  const deleteBackup = (backupId) => {
    if (window.confirm('Are you sure you want to delete this backup? This action cannot be undone.')) {
      setBackups(backups.filter(backup => backup.id !== backupId));
    }
  };

  const downloadBackup = (backupId) => {
    const backup = backups.find(b => b.id === backupId);
    alert(`Downloading backup: ${backup.name}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="status-completed" />;
      case 'failed':
        return <FaExclamationTriangle className="status-failed" />;
      case 'in-progress':
        return <FaSync className="status-in-progress" />;
      default:
        return <FaClock className="status-pending" />;
    }
  };

  return (
    <div className="backup-restore-container">
      <div className="management-header">
        <div className="header-content">
          <FaDatabase className="header-icon" />
          <div>
            <h1>Backup & Restore</h1>
            <p>Manage system backups and data recovery</p>
          </div>
        </div>
        <button 
          className={`btn-primary ${isBackingUp ? 'loading' : ''}`}
          onClick={createBackup}
          disabled={isBackingUp}
        >
          {isBackingUp ? <FaSync className="spinner" /> : <FaCloudDownloadAlt />}
          {isBackingUp ? 'Creating Backup...' : 'Create Backup Now'}
        </button>
      </div>

      <div className="backup-overview">
        <div className="overview-card">
          <div className="overview-icon storage">
            <FaServer />
          </div>
          <div className="overview-content">
            <h3>Storage Usage</h3>
            <div className="storage-bar">
              <div 
                className="storage-fill"
                style={{ width: `${storageUsage.percentage}%` }}
              ></div>
            </div>
            <div className="storage-info">
              <span>{storageUsage.used} GB of {storageUsage.total} GB used</span>
              <span>{storageUsage.percentage}%</span>
            </div>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon backups">
            <FaFileArchive />
          </div>
          <div className="overview-content">
            <h3>Total Backups</h3>
            <div className="stat-number">{backups.length}</div>
            <span>Backup files stored</span>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon auto">
            <FaSync />
          </div>
          <div className="overview-content">
            <h3>Auto Backup</h3>
            <div className="stat-number">
              {autoBackup ? 'Enabled' : 'Disabled'}
            </div>
            <span>Next backup: Today, 02:00 AM</span>
          </div>
        </div>
      </div>

      <div className="backup-settings">
        <h3>Backup Settings</h3>
        <div className="settings-grid">
          <div className="setting-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={autoBackup}
                onChange={(e) => setAutoBackup(e.target.checked)}
              />
              <span className="checkmark"></span>
              Enable Automatic Backups
            </label>
          </div>

          <div className="setting-group">
            <label>Backup Frequency</label>
            <select
              value={backupFrequency}
              onChange={(e) => setBackupFrequency(e.target.value)}
              disabled={!autoBackup}
            >
              <option value="hourly">Every Hour</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="setting-group">
            <label>Retention Period (days)</label>
            <input
              type="number"
              min="1"
              max="365"
              value={retentionPeriod}
              onChange={(e) => setRetentionPeriod(parseInt(e.target.value))}
            />
          </div>

          <div className="setting-group">
            <label>Backup Location</label>
            <select defaultValue="local">
              <option value="local">Local Server</option>
              <option value="cloud">Cloud Storage</option>
              <option value="external">External Drive</option>
            </select>
          </div>
        </div>

        <div className="setting-actions">
          <button className="btn-secondary">
            <FaSync />
            Test Backup
          </button>
          <button className="btn-primary">
            <FaCheckCircle />
            Save Settings
          </button>
        </div>
      </div>

      <div className="backups-list">
        <div className="section-header">
          <h3>Available Backups</h3>
          <span className="section-count">{backups.length} backups</span>
        </div>

        <div className="backups-table">
          {backups.map(backup => (
            <div key={backup.id} className="backup-item">
              <div className="backup-info">
                <div className="backup-icon">
                  <FaFileArchive />
                </div>
                <div className="backup-details">
                  <h4>{backup.name}</h4>
                  <p>{backup.description}</p>
                  <div className="backup-meta">
                    <span><FaClock /> {formatDate(backup.date)}</span>
                    <span><FaDatabase /> {backup.size}</span>
                    <span><FaInfoCircle /> {backup.type}</span>
                    <span className={`status ${backup.status}`}>
                      {getStatusIcon(backup.status)}
                      {backup.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="backup-actions">
                <button
                  className="btn-download"
                  onClick={() => downloadBackup(backup.id)}
                  title="Download Backup"
                >
                  <FaCloudDownloadAlt />
                </button>
                <button
                  className={`btn-restore ${isRestoring ? 'loading' : ''}`}
                  onClick={() => restoreBackup(backup.id)}
                  disabled={isRestoring}
                  title="Restore Backup"
                >
                  {isRestoring ? <FaSync className="spinner" /> : <FaCloudUploadAlt />}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deleteBackup(backup.id)}
                  title="Delete Backup"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {backups.length === 0 && (
          <div className="empty-state">
            <FaFileArchive className="empty-icon" />
            <h3>No backups available</h3>
            <p>Create your first backup to get started</p>
          </div>
        )}
      </div>

      <div className="restore-section">
        <h3>Restore Options</h3>
        <div className="restore-options">
          <div className="restore-option">
            <div className="option-icon full">
              <FaDatabase />
            </div>
            <div className="option-content">
              <h4>Full Restore</h4>
              <p>Restore entire system including all data and settings</p>
              <button className="btn-secondary">
                Select Backup
              </button>
            </div>
          </div>

          <div className="restore-option">
            <div className="option-icon partial">
              <FaHistory />
            </div>
            <div className="option-content">
              <h4>Partial Restore</h4>
              <p>Restore specific data types (students, payments, etc.)</p>
              <button className="btn-secondary">
                Choose Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupRestore;