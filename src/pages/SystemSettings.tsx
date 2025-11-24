import React, { useState, useEffect } from 'react';
import {
  FaSave,
  FaUndo,
  FaDatabase,
  FaShieldAlt,
  FaBell,
  FaPalette,
  FaUsers,
  FaEnvelope,
  FaGlobe,
  FaLock,
  FaCloud,
  FaCog,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from 'react-icons/fa';
import './SystemSettings.css';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    schoolName: 'Apaer Institute',
    schoolEmail: 'contact@apaer.ac.rw',
    schoolPhone: '+250 788 123 456',
    timezone: 'Africa/Kigali',
    language: 'en',
    dateFormat: 'DD/MM/YYYY',
    
    // Security Settings
    sessionTimeout: 30,
    passwordPolicy: 'medium',
    twoFactorAuth: false,
    loginAttempts: 5,
    ipWhitelist: [],
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notifyNewRegistrations: true,
    notifyPayments: true,
    notifyMessages: true,
    
    // Appearance Settings
    theme: 'light',
    primaryColor: '#3498db',
    sidebarStyle: 'expanded',
    dashboardLayout: 'grid',
    
    // System Settings
    autoBackup: true,
    backupFrequency: 'daily',
    storageLimit: 1000, // MB
    cacheEnabled: true,
    maintenanceMode: false,
    
    // Email Settings
    smtpHost: 'smtp.apaer.ac.rw',
    smtpPort: 587,
    smtpUsername: 'noreply@apaer.ac.rw',
    smtpPassword: '',
    emailFrom: 'noreply@apaer.ac.rw'
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [changes, setChanges] = useState({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    try {
      const savedSettings = JSON.parse(localStorage.getItem('apaer_system_settings') || '{}');
      setSettings(prev => ({ ...prev, ...savedSettings }));
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    setSaveStatus('saving');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedSettings = { ...settings, ...changes };
      localStorage.setItem('apaer_system_settings', JSON.stringify(updatedSettings));
      
      setSettings(updatedSettings);
      setChanges({});
      setSaveStatus('success');
      
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      localStorage.removeItem('apaer_system_settings');
      loadSettings();
      setChanges({});
    }
  };

  const handleSettingChange = (category, key, value) => {
    setChanges(prev => ({
      ...prev,
      [key]: value
    }));
    
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const hasUnsavedChanges = Object.keys(changes).length > 0;

  const tabs = [
    { id: 'general', label: 'General', icon: FaCog },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
    { id: 'system', label: 'System', icon: FaDatabase },
    { id: 'email', label: 'Email', icon: FaEnvelope }
  ];

  const renderGeneralSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <FaGlobe className="section-icon" />
        <h3>General Information</h3>
      </div>
      
      <div className="settings-grid">
        <div className="setting-group">
          <label>School Name</label>
          <input
            type="text"
            value={settings.schoolName}
            onChange={(e) => handleSettingChange('general', 'schoolName', e.target.value)}
            placeholder="Enter school name"
          />
        </div>

        <div className="setting-group">
          <label>School Email</label>
          <input
            type="email"
            value={settings.schoolEmail}
            onChange={(e) => handleSettingChange('general', 'schoolEmail', e.target.value)}
            placeholder="Enter school email"
          />
        </div>

        <div className="setting-group">
          <label>School Phone</label>
          <input
            type="tel"
            value={settings.schoolPhone}
            onChange={(e) => handleSettingChange('general', 'schoolPhone', e.target.value)}
            placeholder="Enter school phone"
          />
        </div>

        <div className="setting-group">
          <label>Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
          >
            <option value="Africa/Kigali">East Africa Time (EAT)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="Europe/London">Greenwich Mean Time (GMT)</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Language</label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="rw">Kinyarwanda</option>
            <option value="sw">Swahili</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Date Format</label>
          <select
            value={settings.dateFormat}
            onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <FaLock className="section-icon" />
        <h3>Security Settings</h3>
      </div>
      
      <div className="settings-grid">
        <div className="setting-group">
          <label>Session Timeout (minutes)</label>
          <input
            type="number"
            min="5"
            max="120"
            value={settings.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
          />
          <span className="setting-description">Automatic logout after inactivity</span>
        </div>

        <div className="setting-group">
          <label>Password Policy</label>
          <select
            value={settings.passwordPolicy}
            onChange={(e) => handleSettingChange('security', 'passwordPolicy', e.target.value)}
          >
            <option value="low">Low (6+ characters)</option>
            <option value="medium">Medium (8+ characters, mixed case)</option>
            <option value="high">High (10+ characters, mixed case + numbers + symbols)</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Max Login Attempts</label>
          <input
            type="number"
            min="3"
            max="10"
            value={settings.loginAttempts}
            onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
          />
          <span className="setting-description">Account lock after failed attempts</span>
        </div>

        <div className="setting-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
            />
            <span className="checkmark"></span>
            Enable Two-Factor Authentication
          </label>
          <span className="setting-description">Extra security layer for admin accounts</span>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <FaBell className="section-icon" />
        <h3>Notification Settings</h3>
      </div>
      
      <div className="settings-grid">
        <div className="setting-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
            />
            <span className="checkmark"></span>
            Email Notifications
          </label>
        </div>

        <div className="setting-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
            />
            <span className="checkmark"></span>
            SMS Notifications
          </label>
        </div>

        <div className="setting-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
            />
            <span className="checkmark"></span>
            Push Notifications
          </label>
        </div>

        <div className="notification-types">
          <h4>Notification Types</h4>
          
          <div className="setting-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifyNewRegistrations}
                onChange={(e) => handleSettingChange('notifications', 'notifyNewRegistrations', e.target.checked)}
              />
              <span className="checkmark"></span>
              New Student Registrations
            </label>
          </div>

          <div className="setting-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifyPayments}
                onChange={(e) => handleSettingChange('notifications', 'notifyPayments', e.target.checked)}
              />
              <span className="checkmark"></span>
              Payment Notifications
            </label>
          </div>

          <div className="setting-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifyMessages}
                onChange={(e) => handleSettingChange('notifications', 'notifyMessages', e.target.checked)}
              />
              <span className="checkmark"></span>
              New Messages
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <FaPalette className="section-icon" />
        <h3>Appearance Settings</h3>
      </div>
      
      <div className="settings-grid">
        <div className="setting-group">
          <label>Theme</label>
          <select
            value={settings.theme}
            onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto (System)</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Primary Color</label>
          <div className="color-picker">
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
            />
            <span className="color-value">{settings.primaryColor}</span>
          </div>
        </div>

        <div className="setting-group">
          <label>Sidebar Style</label>
          <select
            value={settings.sidebarStyle}
            onChange={(e) => handleSettingChange('appearance', 'sidebarStyle', e.target.value)}
          >
            <option value="expanded">Expanded</option>
            <option value="compact">Compact</option>
            <option value="icons">Icons Only</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Dashboard Layout</label>
          <select
            value={settings.dashboardLayout}
            onChange={(e) => handleSettingChange('appearance', 'dashboardLayout', e.target.value)}
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
            <option value="cards">Cards</option>
          </select>
        </div>
      </div>

      <div className="theme-preview">
        <h4>Theme Preview</h4>
        <div className={`preview-container ${settings.theme}`}>
          <div className="preview-header" style={{ backgroundColor: settings.primaryColor }}>
            <span>Header</span>
          </div>
          <div className="preview-sidebar">
            <span>Sidebar</span>
          </div>
          <div className="preview-content">
            <span>Content Area</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <FaDatabase className="section-icon" />
        <h3>System Settings</h3>
      </div>
      
      <div className="settings-grid">
        <div className="setting-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.autoBackup}
              onChange={(e) => handleSettingChange('system', 'autoBackup', e.target.checked)}
            />
            <span className="checkmark"></span>
            Automatic Backups
          </label>
        </div>

        <div className="setting-group">
          <label>Backup Frequency</label>
          <select
            value={settings.backupFrequency}
            onChange={(e) => handleSettingChange('system', 'backupFrequency', e.target.value)}
            disabled={!settings.autoBackup}
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Storage Limit (MB)</label>
          <input
            type="number"
            min="100"
            max="10000"
            value={settings.storageLimit}
            onChange={(e) => handleSettingChange('system', 'storageLimit', parseInt(e.target.value))}
          />
          <span className="setting-description">Maximum storage for backups and files</span>
        </div>

        <div className="setting-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.cacheEnabled}
              onChange={(e) => handleSettingChange('system', 'cacheEnabled', e.target.checked)}
            />
            <span className="checkmark"></span>
            Enable Caching
          </label>
          <span className="setting-description">Improves performance by caching data</span>
        </div>

        <div className="setting-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => handleSettingChange('system', 'maintenanceMode', e.target.checked)}
            />
            <span className="checkmark"></span>
            Maintenance Mode
          </label>
          <span className="setting-description warning">Site will be unavailable to users</span>
        </div>
      </div>

      <div className="system-actions">
        <h4>System Actions</h4>
        <div className="action-buttons">
          <button className="btn-secondary" onClick={() => alert('Backup initiated!')}>
            <FaCloud />
            Create Backup Now
          </button>
          <button className="btn-secondary" onClick={() => alert('Cache cleared!')}>
            <FaDatabase />
            Clear Cache
          </button>
          <button className="btn-secondary" onClick={() => alert('System check completed!')}>
            <FaCheckCircle />
            System Check
          </button>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <FaEnvelope className="section-icon" />
        <h3>Email Settings</h3>
      </div>
      
      <div className="settings-grid">
        <div className="setting-group">
          <label>SMTP Host</label>
          <input
            type="text"
            value={settings.smtpHost}
            onChange={(e) => handleSettingChange('email', 'smtpHost', e.target.value)}
            placeholder="smtp.yourschool.com"
          />
        </div>

        <div className="setting-group">
          <label>SMTP Port</label>
          <input
            type="number"
            value={settings.smtpPort}
            onChange={(e) => handleSettingChange('email', 'smtpPort', parseInt(e.target.value))}
            placeholder="587"
          />
        </div>

        <div className="setting-group">
          <label>SMTP Username</label>
          <input
            type="text"
            value={settings.smtpUsername}
            onChange={(e) => handleSettingChange('email', 'smtpUsername', e.target.value)}
            placeholder="noreply@yourschool.com"
          />
        </div>

        <div className="setting-group">
          <label>SMTP Password</label>
          <input
            type="password"
            value={settings.smtpPassword}
            onChange={(e) => handleSettingChange('email', 'smtpPassword', e.target.value)}
            placeholder="Enter SMTP password"
          />
        </div>

        <div className="setting-group">
          <label>From Email</label>
          <input
            type="email"
            value={settings.emailFrom}
            onChange={(e) => handleSettingChange('email', 'emailFrom', e.target.value)}
            placeholder="noreply@yourschool.com"
          />
        </div>
      </div>

      <div className="email-test">
        <h4>Test Email Configuration</h4>
        <button className="btn-secondary" onClick={() => alert('Test email sent!')}>
          <FaEnvelope />
          Send Test Email
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'system':
        return renderSystemSettings();
      case 'email':
        return renderEmailSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="system-settings-container">
      <div className="settings-header">
        <div className="header-content">
          <FaCog className="header-icon" />
          <div>
            <h1>System Settings</h1>
            <p>Configure and customize your school management system</p>
          </div>
        </div>
        
        <div className="header-actions">
          {hasUnsavedChanges && (
            <div className="unsaved-changes">
              <FaExclamationTriangle />
              <span>Unsaved Changes</span>
            </div>
          )}
          
          <button 
            className="btn-secondary"
            onClick={resetSettings}
            disabled={isSaving}
          >
            <FaUndo />
            Reset to Default
          </button>
          
          <button 
            className={`btn-primary ${isSaving ? 'saving' : ''}`}
            onClick={saveSettings}
            disabled={isSaving || !hasUnsavedChanges}
          >
            {isSaving ? (
              <>
                <div className="spinner"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FaSave />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {saveStatus === 'success' && (
        <div className="save-status success">
          <FaCheckCircle />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="save-status error">
          <FaExclamationTriangle />
          <span>Failed to save settings. Please try again.</span>
        </div>
      )}

      <div className="settings-layout">
        <div className="settings-sidebar">
          <nav className="settings-tabs">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent className="tab-icon" />
                  <span className="tab-label">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="settings-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;