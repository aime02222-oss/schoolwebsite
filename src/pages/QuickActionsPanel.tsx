import React from 'react';
import { FaSync, FaDatabase, FaDownload, FaChartBar } from 'react-icons/fa';
import './QuickActionsPanel.css';

const QuickActionsPanel = ({ onAction }) => {
  const actions = [
    { id: 'refresh', label: 'Refresh', icon: FaSync, color: '#3498db' },
    { id: 'clearCache', label: 'Clear Cache', icon: FaDatabase, color: '#e74c3c' },
    { id: 'backup', label: 'Backup', icon: FaDownload, color: '#27ae60' },
    { id: 'reports', label: 'Reports', icon: FaChartBar, color: '#9b59b6' }
  ];

  return (
    <div className="quick-actions">
      <h4 className="actions-title">Quick Actions</h4>
      <div className="action-buttons">
        {actions.map(action => {
          const IconComponent = action.icon;
          return (
            <button
              key={action.id}
              className="action-btn"
              onClick={() => onAction(action.id)}
              style={{ '--action-color': action.color }}
              title={action.label}
            >
              <IconComponent />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActionsPanel;