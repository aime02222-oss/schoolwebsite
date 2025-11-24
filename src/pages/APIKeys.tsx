import React, { useState, useEffect } from 'react';
import {
  FaKey,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendar,
  FaSearch,
  FaFilter,
  FaExclamationTriangle,
  FaRegClock,
  FaServer
} from 'react-icons/fa';
import './APIKeys.css';

const APIKeys = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [editingKey, setEditingKey] = useState(null);

  const [newKey, setNewKey] = useState({
    name: '',
    description: '',
    permissions: [],
    expiresAt: '',
    rateLimit: 1000
  });

  useEffect(() => {
    loadAPIKeys();
  }, []);

  useEffect(() => {
    filterKeys();
  }, [apiKeys, searchTerm, statusFilter]);

  const loadAPIKeys = () => {
    // Simulated API key data
    const sampleKeys = [
      {
        id: 1,
        name: 'Mobile App',
        key: 'sk_live_1234567890abcdef',
        description: 'API key for mobile application',
        permissions: ['students:read', 'payments:read'],
        status: 'active',
        createdAt: '2024-01-01T00:00:00Z',
        expiresAt: '2024-12-31T23:59:59Z',
        lastUsed: '2024-01-15T10:30:00Z',
        rateLimit: 1000,
        usage: 245
      },
      {
        id: 2,
        name: 'Website Integration',
        key: 'sk_test_abcdef1234567890',
        description: 'API key for website payment integration',
        permissions: ['payments:create', 'payments:read'],
        status: 'active',
        createdAt: '2024-01-10T00:00:00Z',
        expiresAt: '2024-06-30T23:59:59Z',
        lastUsed: '2024-01-14T15:45:00Z',
        rateLimit: 500,
        usage: 89
      },
      {
        id: 3,
        name: 'Analytics Service',
        key: 'sk_inactive_9876543210',
        description: 'API key for analytics dashboard (inactive)',
        permissions: ['students:read', 'teachers:read'],
        status: 'inactive',
        createdAt: '2023-12-01T00:00:00Z',
        expiresAt: '2024-12-31T23:59:59Z',
        lastUsed: null,
        rateLimit: 100,
        usage: 0
      }
    ];
    setApiKeys(sampleKeys);
  };

  const filterKeys = () => {
    let filtered = apiKeys;

    if (searchTerm) {
      filtered = filtered.filter(key =>
        key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        key.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(key => key.status === statusFilter);
    }

    setFilteredKeys(filtered);
  };

  const generateAPIKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'sk_live_';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  };

  const handleCreateKey = () => {
    setEditingKey(null);
    setNewKey({
      name: '',
      description: '',
      permissions: [],
      expiresAt: '',
      rateLimit: 1000
    });
    setShowKeyModal(true);
  };

  const handleSaveKey = () => {
    const keyData = {
      ...newKey,
      id: editingKey ? editingKey.id : Date.now(),
      key: editingKey ? editingKey.key : generateAPIKey(),
      status: 'active',
      createdAt: editingKey ? editingKey.createdAt : new Date().toISOString(),
      lastUsed: null,
      usage: 0
    };

    if (editingKey) {
      setApiKeys(apiKeys.map(key => key.id === editingKey.id ? keyData : key));
    } else {
      setApiKeys([...apiKeys, keyData]);
    }

    setShowKeyModal(false);
    setEditingKey(null);
  };

  const handleEditKey = (key) => {
    setEditingKey(key);
    setNewKey({
      name: key.name,
      description: key.description,
      permissions: [...key.permissions],
      expiresAt: key.expiresAt.split('T')[0],
      rateLimit: key.rateLimit
    });
    setShowKeyModal(true);
  };

  const handleDeleteKey = (keyId) => {
    if (window.confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(apiKeys.filter(key => key.id !== keyId));
    }
  };

  const toggleKeyStatus = (keyId) => {
    setApiKeys(apiKeys.map(key =>
      key.id === keyId
        ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
        : key
    ));
  };

  const copyToClipboard = (text, keyId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKeyId(keyId);
      setTimeout(() => setCopiedKeyId(null), 2000);
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const permissionOptions = [
    'students:read',
    'students:write',
    'teachers:read',
    'teachers:write',
    'payments:read',
    'payments:write',
    'payments:verify',
    'users:read',
    'users:write',
    'reports:generate',
    'system:read'
  ];

  const isKeyExpired = (expiresAt) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="api-keys-container">
      <div className="management-header">
        <div className="header-content">
          <FaKey className="header-icon" />
          <div>
            <h1>API Management</h1>
            <p>Manage API keys and access permissions</p>
          </div>
        </div>
        <button className="btn-primary" onClick={handleCreateKey}>
          <FaPlus />
          Generate New Key
        </button>
      </div>

      <div className="api-keys-overview">
        <div className="overview-card">
          <div className="overview-icon total">
            <FaKey />
          </div>
          <div className="overview-content">
            <h3>Total Keys</h3>
            <div className="stat-number">{apiKeys.length}</div>
            <span>API keys generated</span>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon active">
            <FaCheckCircle />
          </div>
          <div className="overview-content">
            <h3>Active Keys</h3>
            <div className="stat-number">
              {apiKeys.filter(key => key.status === 'active').length}
            </div>
            <span>Currently active</span>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon usage">
            <FaServer />
          </div>
          <div className="overview-content">
            <h3>Total Usage</h3>
            <div className="stat-number">
              {apiKeys.reduce((sum, key) => sum + key.usage, 0)}
            </div>
            <span>API calls this month</span>
          </div>
        </div>
      </div>

      <div className="api-keys-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search API keys by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="api-keys-list">
        {filteredKeys.map(apiKey => (
          <div key={apiKey.id} className="api-key-card">
            <div className="key-header">
              <div className="key-info">
                <h3>{apiKey.name}</h3>
                <p>{apiKey.description}</p>
                <div className="key-meta">
                  <span className={`key-status ${apiKey.status}`}>
                    {apiKey.status === 'active' ? <FaCheckCircle /> : <FaTimesCircle />}
                    {apiKey.status}
                  </span>
                  <span className="key-created">
                    <FaCalendar />
                    Created: {formatDate(apiKey.createdAt)}
                  </span>
                  {apiKey.lastUsed && (
                    <span className="key-last-used">
                      <FaRegClock />
                      Last used: {formatDate(apiKey.lastUsed)}
                    </span>
                  )}
                  {isKeyExpired(apiKey.expiresAt) && (
                    <span className="key-expired">
                      <FaExclamationTriangle />
                      Expired
                    </span>
                  )}
                </div>
              </div>
              <div className="key-actions">
                <button
                  className="btn-copy"
                  onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                  title="Copy API Key"
                >
                  {copiedKeyId === apiKey.id ? <FaCheckCircle /> : <FaCopy />}
                </button>
                <button
                  className="btn-edit"
                  onClick={() => handleEditKey(apiKey)}
                  title="Edit API Key"
                >
                  <FaEdit />
                </button>
                <button
                  className={`btn-status ${apiKey.status}`}
                  onClick={() => toggleKeyStatus(apiKey.id)}
                  title={apiKey.status === 'active' ? 'Deactivate Key' : 'Activate Key'}
                >
                  {apiKey.status === 'active' ? <FaTimesCircle /> : <FaCheckCircle />}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteKey(apiKey.id)}
                  title="Delete API Key"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="key-details">
              <div className="key-value">
                <label>API Key:</label>
                <div className="key-display">
                  <code>
                    {showKey ? apiKey.key : '•'.repeat(apiKey.key.length)}
                  </code>
                  <button
                    className="btn-toggle-visibility"
                    onClick={() => setShowKey(!showKey)}
                    title={showKey ? 'Hide Key' : 'Show Key'}
                  >
                    {showKey ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="key-specs">
                <div className="spec-item">
                  <label>Rate Limit:</label>
                  <span>{apiKey.rateLimit} requests/hour</span>
                </div>
                <div className="spec-item">
                  <label>Expires:</label>
                  <span>{formatDate(apiKey.expiresAt)}</span>
                </div>
                <div className="spec-item">
                  <label>Usage:</label>
                  <span>{apiKey.usage} requests this month</span>
                </div>
              </div>

              <div className="key-permissions">
                <label>Permissions:</label>
                <div className="permissions-list">
                  {apiKey.permissions.map(permission => (
                    <span key={permission} className="permission-tag">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredKeys.length === 0 && (
        <div className="empty-state">
          <FaKey className="empty-icon" />
          <h3>No API keys found</h3>
          <p>No keys match your search criteria</p>
        </div>
      )}

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="modal-overlay" onClick={() => setShowKeyModal(false)}>
          <div className="api-key-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingKey ? 'Edit API Key' : 'Generate New API Key'}</h2>
              <button
                className="modal-close"
                onClick={() => setShowKeyModal(false)}
              >
                <FaTimesCircle />
              </button>
            </div>

            <div className="modal-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Key Name *</label>
                  <input
                    type="text"
                    value={newKey.name}
                    onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                    placeholder="Enter a descriptive name"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newKey.description}
                    onChange={(e) => setNewKey({ ...newKey, description: e.target.value })}
                    placeholder="Describe what this API key will be used for"
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Expiration Date</label>
                  <input
                    type="date"
                    value={newKey.expiresAt}
                    onChange={(e) => setNewKey({ ...newKey, expiresAt: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label>Rate Limit (requests/hour)</label>
                  <input
                    type="number"
                    value={newKey.rateLimit}
                    onChange={(e) => setNewKey({ ...newKey, rateLimit: parseInt(e.target.value) })}
                    min="1"
                    max="10000"
                  />
                </div>
              </div>

              <div className="permissions-section">
                <h4>Permissions</h4>
                <div className="permissions-grid">
                  {permissionOptions.map(permission => (
                    <label key={permission} className="permission-checkbox">
                      <input
                        type="checkbox"
                        checked={newKey.permissions.includes(permission)}
                        onChange={(e) => {
                          const updatedPermissions = e.target.checked
                            ? [...newKey.permissions, permission]
                            : newKey.permissions.filter(p => p !== permission);
                          setNewKey({ ...newKey, permissions: updatedPermissions });
                        }}
                      />
                      <span className="checkmark"></span>
                      {permission}
                    </label>
                  ))}
                </div>
              </div>

              {!editingKey && (
                <div className="security-notice">
                  <FaExclamationTriangle />
                  <p>
                    <strong>Important:</strong> Store your API key securely. 
                    You will only be able to view it once after generation.
                  </p>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowKeyModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handleSaveKey}
                disabled={!newKey.name || newKey.permissions.length === 0}
              >
                {editingKey ? 'Update Key' : 'Generate Key'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APIKeys;