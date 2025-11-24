import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaIdCard, 
  FaBuilding, 
  FaBook, 
  FaEnvelope,
  FaPaperPlane,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaFilter,
  FaExclamationTriangle,
  FaChalkboardTeacher,
  FaReply,
  FaPhone
} from 'react-icons/fa';
import './TeacherSubmissions.css';

interface TeacherMessage {
  id: string;
  fullName: string;
  staffId: string;
  department: string;
  subjectTeaching: string;
  messageType: string;
  message: string;
  urgency: string;
  status: 'pending' | 'replied';
  timestamp: string;
  adminReply?: string;
  replyTimestamp?: string;
}

const TeacherSubmissions: React.FC = () => {
  const [messages, setMessages] = useState<TeacherMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<TeacherMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'replied'>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | 'normal' | 'high' | 'urgent'>('all');
  const [selectedMessage, setSelectedMessage] = useState<TeacherMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  // Load messages from localStorage
  useEffect(() => {
    loadMessages();
  }, []);

  // Filter messages based on search, status, and urgency
  useEffect(() => {
    let filtered = messages;
    
    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.messageType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(msg => msg.status === statusFilter);
    }
    
    if (urgencyFilter !== 'all') {
      filtered = filtered.filter(msg => msg.urgency === urgencyFilter);
    }
    
    setFilteredMessages(filtered);
  }, [messages, searchTerm, statusFilter, urgencyFilter]);

  const loadMessages = () => {
    try {
      const storedMessages = JSON.parse(localStorage.getItem('apaer_teacher_submissions') || '[]');
      setMessages(storedMessages);
    } catch (error) {
      console.error('Error loading teacher messages:', error);
      setMessages([]);
    }
  };

  const handleReply = async (message: TeacherMessage) => {
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
      localStorage.setItem('apaer_teacher_submissions', JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
      
      // Reset form
      setReplyText('');
      setSelectedMessage(null);
      
      alert('Reply sent successfully!');
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

  const getUrgencyBadge = (urgency: string) => {
    const urgencyConfig = {
      normal: { class: 'normal', label: 'Normal' },
      high: { class: 'high', label: 'High' },
      urgent: { class: 'urgent', label: 'Urgent' }
    };
    
    const config = urgencyConfig[urgency as keyof typeof urgencyConfig] || urgencyConfig.normal;
    
    return (
      <span className={`urgency-badge ${config.class}`}>
        <FaExclamationTriangle />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getMessageTypeIcon = (type: string) => {
    const typeIcons: { [key: string]: JSX.Element } = {
      'Administrative': <FaBuilding />,
      'Academic': <FaBook />,
      'Resource Request': <FaPaperPlane />,
      'Technical Support': <FaChalkboardTeacher />,
      'Professional Development': <FaUser />,
      'Student Concern': <FaIdCard />,
      'Curriculum Feedback': <FaEnvelope />,
      'Other': <FaEnvelope />
    };
    
    return typeIcons[type] || <FaEnvelope />;
  };

  const pendingCount = messages.filter(msg => msg.status === 'pending').length;
  const urgentCount = messages.filter(msg => msg.urgency === 'urgent' && msg.status === 'pending').length;

  return (
    <div className="teacher-submissions-container">
      {/* Header */}
      <div className="submissions-header">
        <div className="header-content">
          <div className="header-icon">
            <FaChalkboardTeacher />
          </div>
          <div className="header-text">
            <h1>Teacher Submissions</h1>
            <p>Manage faculty communications and professional inquiries</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-icon total">
              <FaEnvelope />
            </div>
            <div className="stat-info">
              <span className="stat-value">{messages.length}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon pending">
              <FaClock />
            </div>
            <div className="stat-info">
              <span className="stat-value">{pendingCount}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon urgent">
              <FaExclamationTriangle />
            </div>
            <div className="stat-info">
              <span className="stat-value">{urgentCount}</span>
              <span className="stat-label">Urgent</span>
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
            placeholder="Search by name, staff ID, department..."
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
            <option value="all">All Status</option>
            <option value="pending">Pending Only</option>
            <option value="replied">Replied</option>
          </select>
          
          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value as any)}
            className="filter-select"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
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
            <FaChalkboardTeacher className="empty-icon" />
            <h3>No teacher submissions found</h3>
            <p>
              {searchTerm || statusFilter !== 'all' || urgencyFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No teacher messages have been submitted yet'
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
                      <strong>{message.fullName}</strong>
                      <span className="staff-id">{message.staffId}</span>
                    </div>
                  </div>
                  <div className="message-meta">
                    {getUrgencyBadge(message.urgency)}
                    {getStatusIcon(message.status)}
                    <span className="status-text">{getStatusText(message.status)}</span>
                  </div>
                </div>

                <div className="professional-info">
                  <div className="info-item">
                    <FaBuilding className="info-icon" />
                    <span>{message.department}</span>
                  </div>
                  <div className="info-item">
                    <FaBook className="info-icon" />
                    <span>{message.subjectTeaching}</span>
                  </div>
                  <div className="info-item">
                    {getMessageTypeIcon(message.messageType)}
                    <span>{message.messageType}</span>
                  </div>
                </div>

                <div className="message-preview">
                  <p>{message.message.substring(0, 120)}...</p>
                </div>

                <div className="message-footer">
                  <div className="message-date">
                    {formatDate(message.timestamp)}
                  </div>
                  {message.status === 'pending' && (
                    <button 
                      className="quick-reply-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMessage(message);
                      }}
                    >
                      <FaReply />
                      Reply
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply Panel */}
      {selectedMessage && (
        <div className="reply-panel">
          <div className="reply-header">
            <h3>Response to {selectedMessage.fullName}</h3>
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
            <div className="detail-section">
              <h4>Professional Information</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Staff Name:</label>
                  <span>{selectedMessage.fullName}</span>
                </div>
                <div className="detail-item">
                  <label>Staff ID:</label>
                  <span>{selectedMessage.staffId}</span>
                </div>
                <div className="detail-item">
                  <label>Department:</label>
                  <span>{selectedMessage.department}</span>
                </div>
                <div className="detail-item">
                  <label>Subject:</label>
                  <span>{selectedMessage.subjectTeaching}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Inquiry Details</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Message Type:</label>
                  <span>{selectedMessage.messageType}</span>
                </div>
                <div className="detail-item">
                  <label>Priority:</label>
                  {getUrgencyBadge(selectedMessage.urgency)}
                </div>
                <div className="detail-item full-width">
                  <label>Original Message:</label>
                  <div className="original-message">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedMessage.status === 'replied' && selectedMessage.adminReply ? (
            <div className="previous-reply">
              <h4>Previous Response</h4>
              <div className="reply-content">
                <p>{selectedMessage.adminReply}</p>
                <span className="reply-date">
                  Sent on {selectedMessage.replyTimestamp && formatDate(selectedMessage.replyTimestamp)}
                </span>
              </div>
            </div>
          ) : (
            <div className="reply-form">
              <label htmlFor="replyText">Administrative Response:</label>
              <textarea
                id="replyText"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response to the faculty member..."
                rows={6}
                className="reply-textarea"
              />
              
              <div className="reply-actions">
                <button
                  className="submit-reply-btn"
                  onClick={() => handleReply(selectedMessage)}
                  disabled={isReplying || !replyText.trim()}
                >
                  {isReplying ? (
                    <>
                      <div className="spinner"></div>
                      Sending Response...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Response
                    </>
                  )}
                </button>
                
                <div className="response-note">
                  <FaExclamationTriangle />
                  <span>This response will be recorded in the system</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherSubmissions;