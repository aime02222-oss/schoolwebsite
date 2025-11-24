import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaUserGraduate, 
  FaPhone, 
  FaEnvelope, 
  FaWhatsapp,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaFilter,
  FaPaperPlane,
  FaExclamationTriangle,
  FaUserFriends,
  FaIdCard
} from 'react-icons/fa';
import './ParentSubmissions.css';

interface ParentMessage {
  id: string;
  parentName: string;
  studentName: string;
  studentId: string;
  relationship: string;
  contactNumber: string;
  message: string;
  status: 'pending' | 'replied';
  timestamp: string;
  adminReply?: string;
  replyTimestamp?: string;
}

const ParentSubmissions: React.FC = () => {
  const [messages, setMessages] = useState<ParentMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ParentMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'replied'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ParentMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  // Load messages from localStorage
  useEffect(() => {
    loadMessages();
  }, []);

  // Filter messages based on search and status
  useEffect(() => {
    let filtered = messages;
    
    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(msg => msg.status === statusFilter);
    }
    
    setFilteredMessages(filtered);
  }, [messages, searchTerm, statusFilter]);

  const loadMessages = () => {
    try {
      const storedMessages = JSON.parse(localStorage.getItem('apaer_parent_submissions') || '[]');
      setMessages(storedMessages);
    } catch (error) {
      console.error('Error loading parent messages:', error);
      setMessages([]);
    }
  };

  const handleReply = async (message: ParentMessage) => {
    if (!replyText.trim()) return;

    setIsReplying(true);
    
    try {
      // Update message status and add reply
      const updatedMessages = messages.map(msg =>
        msg.id === message.id
          ? {
              ...msg,
              status: 'replied',
              adminReply: replyText,
              replyTimestamp: new Date().toISOString()
            }
          : msg
      );

      // Save to localStorage
      localStorage.setItem('apaer_parent_submissions', JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
      
      // Send WhatsApp message
      const whatsappUrl = `https://wa.me/${message.contactNumber.replace(/\D/g, '')}?text=${encodeURIComponent(replyText)}`;
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      setReplyText('');
      setSelectedMessage(null);
      
      alert('Reply sent via WhatsApp!');
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Error sending reply. Please try again.');
    } finally {
      setIsReplying(false);
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'replied' ? 
      <FaCheckCircle className="status-icon replied" /> : 
      <FaClock className="status-icon pending" />;
  };

  const getStatusText = (status: string) => {
    return status === 'replied' ? 'Replied' : 'Pending Response';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const pendingCount = messages.filter(msg => msg.status === 'pending').length;

  return (
    <div className="parent-submissions-container">
      {/* Header */}
      <div className="submissions-header">
        <div className="header-content">
          <div className="header-icon">
            <FaUserFriends />
          </div>
          <div className="header-text">
            <h1>Parent Communications</h1>
            <p>Manage and respond to parent inquiries and concerns</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-icon total">
              <FaEnvelope />
            </div>
            <div className="stat-info">
              <span className="stat-value">{messages.length}</span>
              <span className="stat-label">Total Messages</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon pending">
              <FaClock />
            </div>
            <div className="stat-info">
              <span className="stat-value">{pendingCount}</span>
              <span className="stat-label">Pending Reply</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon replied">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <span className="stat-value">{messages.length - pendingCount}</span>
              <span className="stat-label">Replied</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by parent, student, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="filter-select"
          >
            <option value="all">All Messages</option>
            <option value="pending">Pending Only</option>
            <option value="replied">Replied</option>
          </select>
          
          <button 
            className="refresh-btn"
            onClick={loadMessages}
            title="Refresh messages"
          >
            <FaFilter />
            Refresh
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="messages-container">
        {filteredMessages.length === 0 ? (
          <div className="empty-state">
            <FaEnvelope className="empty-icon" />
            <h3>No messages found</h3>
            <p>
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No parent messages have been submitted yet'
              }
            </p>
          </div>
        ) : (
          <div className="messages-grid">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`message-card ${message.status} ${
                  selectedMessage?.id === message.id ? 'selected' : ''
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="message-header">
                  <div className="message-sender">
                    <FaUser className="sender-icon" />
                    <div className="sender-info">
                      <strong>{message.parentName}</strong>
                      <span className="relationship">{message.relationship}</span>
                    </div>
                  </div>
                  <div className="message-status">
                    {getStatusIcon(message.status)}
                    <span>{getStatusText(message.status)}</span>
                  </div>
                </div>

                <div className="student-info">
                  <FaUserGraduate className="student-icon" />
                  <div className="student-details">
                    <span className="student-name">{message.studentName}</span>
                    <span className="student-id">ID: {message.studentId}</span>
                  </div>
                </div>

                <div className="message-preview">
                  <p>{message.message.substring(0, 150)}...</p>
                </div>

                <div className="message-footer">
                  <div className="contact-info">
                    <FaPhone className="contact-icon" />
                    <span>{message.contactNumber}</span>
                  </div>
                  <div className="message-date">
                    {formatDate(message.timestamp)}
                  </div>
                </div>

                {message.status === 'replied' && message.adminReply && (
                  <div className="admin-reply-preview">
                    <div className="reply-header">
                      <FaCheckCircle className="reply-icon" />
                      <span>Admin Reply</span>
                      <span className="reply-date">
                        {message.replyTimestamp && formatDate(message.replyTimestamp)}
                      </span>
                    </div>
                    <p className="reply-text">{message.adminReply.substring(0, 100)}...</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply Panel */}
      {selectedMessage && (
        <div className="reply-panel">
          <div className="reply-header">
            <h3>Reply to {selectedMessage.parentName}</h3>
            <button
              className="close-btn"
              onClick={() => {
                setSelectedMessage(null);
                setReplyText('');
              }}
            >
              ×
            </button>
          </div>

          <div className="message-details">
            <div className="detail-row">
              <label>Parent:</label>
              <span>{selectedMessage.parentName} ({selectedMessage.relationship})</span>
            </div>
            <div className="detail-row">
              <label>Student:</label>
              <span>{selectedMessage.studentName} (ID: {selectedMessage.studentId})</span>
            </div>
            <div className="detail-row">
              <label>Contact:</label>
              <span className="contact-number">
                <FaPhone />
                {selectedMessage.contactNumber}
              </span>
            </div>
            <div className="detail-row">
              <label>Original Message:</label>
              <div className="original-message">
                {selectedMessage.message}
              </div>
            </div>
          </div>

          {selectedMessage.status === 'replied' && selectedMessage.adminReply ? (
            <div className="previous-reply">
              <h4>Previous Reply</h4>
              <div className="reply-content">
                <p>{selectedMessage.adminReply}</p>
                <span className="reply-date">
                  Sent on {selectedMessage.replyTimestamp && formatDate(selectedMessage.replyTimestamp)}
                </span>
              </div>
            </div>
          ) : (
            <div className="reply-form">
              <label htmlFor="replyText">Your Response:</label>
              <textarea
                id="replyText"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response to the parent. This will be sent via WhatsApp..."
                rows={6}
                className="reply-textarea"
              />
              
              <div className="reply-actions">
                <button
                  className="whatsapp-btn"
                  onClick={() => handleReply(selectedMessage)}
                  disabled={isReplying || !replyText.trim()}
                >
                  {isReplying ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaWhatsapp />
                      Send via WhatsApp
                    </>
                  )}
                </button>
                
                <div className="whatsapp-note">
                  <FaExclamationTriangle />
                  <span>This will open WhatsApp with your pre-filled message</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParentSubmissions;