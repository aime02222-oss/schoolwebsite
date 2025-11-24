import React from 'react';
import { 
  FaTimes, 
  FaEnvelope, 
  FaMoneyBillWave, 
  FaUserGraduate, 
  FaExclamationTriangle,
  FaCheckCircle
} from 'react-icons/fa';
import './NotificationCenter.css';

const NotificationCenter = ({ unreadCount, systemStats, onClose, onNavigate }) => {
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New Student Messages',
      description: `${systemStats.messages.pending} pending student messages`,
      count: systemStats.messages.pending,
      icon: FaEnvelope,
      color: '#e74c3c',
      action: () => onNavigate('student-messages')
    },
    {
      id: 2,
      type: 'payment',
      title: 'Pending Payments',
      description: `${systemStats.payments.pending} payments awaiting verification`,
      count: systemStats.payments.pending,
      icon: FaMoneyBillWave,
      color: '#27ae60',
      action: () => onNavigate('payments')
    },
    {
      id: 3,
      type: 'registration',
      title: 'New Registrations',
      description: `${systemStats.registrations.pending} student registrations pending`,
      count: systemStats.registrations.pending,
      icon: FaUserGraduate,
      color: '#3498db',
      action: () => onNavigate('registrations')
    }
  ];

  const activeNotifications = notifications.filter(notification => notification.count > 0);

  return (
    <div className="notification-center-overlay" onClick={onClose}>
      <div className="notification-center" onClick={e => e.stopPropagation()}>
        <div className="notification-header">
          <h3>Notifications</h3>
          <div className="notification-count">
            {unreadCount} Unread
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="notification-list">
          {activeNotifications.length === 0 ? (
            <div className="no-notifications">
              <FaCheckCircle className="no-notifications-icon" />
              <p>All caught up! No pending notifications.</p>
            </div>
          ) : (
            activeNotifications.map(notification => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className="notification-item"
                  onClick={notification.action}
                >
                  <div 
                    className="notification-icon"
                    style={{ backgroundColor: notification.color }}
                  >
                    <IconComponent />
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.description}</p>
                  </div>
                  <div className="notification-badge">
                    {notification.count}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="notification-footer">
          <button className="view-all-btn" onClick={() => onNavigate('messages')}>
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;