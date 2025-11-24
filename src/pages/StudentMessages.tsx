import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaReply, 
  FaCheck, 
  FaClock,
  FaUserGraduate,
  FaEnvelope,
  FaCalendar,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimes
} from 'react-icons/fa';
import './StudentMessages.css';

interface StudentMessage {
  id: string;
  studentId: string;
  fullName: string;
  studentClass: string;
  messageType: string;
  message: string;
  status: 'pending' | 'replied' | 'resolved';
  createdAt: string;
  updatedAt: string;
  responses: MessageResponse[];
}

interface MessageResponse {
  id: string;
  adminName: string;
  message: string;
  createdAt: string;
}

const StudentMessages = () => {
  const [messages, setMessages] = useState<StudentMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<StudentMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<StudentMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    loadMessages();
    // Listen for new messages
    window.addEventListener('storage', loadMessages);
    return () => window.removeEventListener('storage', loadMessages);
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm, statusFilter]);

  const loadMessages = () => {
    try {
      const storedMessages = JSON.parse(localStorage.getItem('apaer_student_messages') || '[]');
      // Sort by creation date (newest first)
      const sortedMessages = storedMessages.sort((a: StudentMessage, b: StudentMessage) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.messageType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(message => message.status === statusFilter);
    }

    setFilteredMessages(filtered);
  };

  const handleReply = async (message: StudentMessage) => {
    if (!replyText.trim()) return;

    setIsReplying(true);

    try {
      const response: MessageResponse = {
        id: Date.now().toString(),
        adminName: 'System Administrator',
        message: replyText,
        createdAt: new Date().toISOString()
      };

      const updatedMessages = messages.map(msg =>
        msg.id === message.id
          ? {
              ...msg,
              status: 'replied',
              responses: [...msg.responses, response],
              updatedAt: new Date().toISOString()
            }
          : msg
      );

      localStorage.setItem('apaer_student_messages', JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
      setReplyText('');
      setSelectedMessage(null);
      
      // Trigger storage event
      window.dispatchEvent(new Event('storage'));

    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply. Please try again.');
    } finally {
      setIsReplying(false);
    }
  };

  const markAsResolved = (messageId: string) => {
    const updatedMessages = messages.map(msg =>
      msg.id === messageId
        ? { ...msg, status: 'resolved', updatedAt: new Date().toISOString() }
        : msg
    );

    localStorage.setItem('apaer_student_messages', JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
    window.dispatchEvent(new Event('storage'));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FaClock className="status-pending" />;
      case 'replied':
        return <FaReply className="status-replied" />;
      case 'resolved':
        return <FaCheckCircle className="status-resolved" />;
      default:
        return <FaClock className="status-pending" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending Response';
      case 'replied':
        return 'Replied';
      case 'resolved':
        return 'Resolved';
      default:
        return 'Pending';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="student-messages-container">
      {/* Header */}
      <div className="messages-header">
        <div className="header-content">
          <h1>Student Messages</h1>
          <p>Manage and respond to student inquiries and messages</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-icon total">
              <FaEnvelope />
            </div>
            <div className="stat-info">
              <span className="stat-number">{messages.length}</span>
              <span className="stat-label">Total Messages</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon pending">
              <FaClock />
            </div>
            <div className="stat-info">
              <span className="stat-number">
                {messages.filter(m => m.status === 'pending').length}
              </span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon replied">
              <FaReply />
            </div>
            <div className="stat-info">
              <span className="stat-number">
                {messages.filter(m => m.status === 'replied').length}
              </span>
              <span className="stat-label">Replied</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="messages-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="replied">Replied</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="messages-list">
        {filteredMessages.length === 0 ? (
          <div className="empty-state">
            <FaEnvelope className="empty-icon" />
            <h3>No messages found</h3>
            <p>There are no student messages matching your criteria.</p>
          </div>
        ) : (
          filteredMessages.map(message => (
            <div
              key={message.id}
              className={`message-card ${message.status} ${
                selectedMessage?.id === message.id ? 'selected' : ''
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="message-header">
                <div className="student-info">
                  <div className="student-avatar">
                    <FaUserGraduate />
                  </div>
                  <div className="student-details">
                    <h4>{message.fullName}</h4>
                    <p>ID: {message.studentId} • {message.studentClass}</p>
                  </div>
                </div>
                <div className="message-meta">
                  <div className="message-type">{message.messageType}</div>
                  <div className="message-status">
                    {getStatusIcon(message.status)}
                    <span>{getStatusText(message.status)}</span>
                  </div>
                  <div className="message-date">
                    <FaCalendar />
                    {formatDate(message.createdAt)}
                  </div>
                </div>
              </div>

              <div className="message-content">
                <p>{message.message}</p>
              </div>

              {message.responses.length > 0 && (
                <div className="responses-section">
                  <div className="responses-header">
                    <FaReply />
                    <span>Admin Responses ({message.responses.length})</span>
                  </div>
                  {message.responses.map(response => (
                    <div key={response.id} className="response-item">
                      <div className="response-header">
                        <strong>{response.adminName}</strong>
                        <span>{formatDate(response.createdAt)}</span>
                      </div>
                      <p>{response.message}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="message-actions">
                {message.status !== 'resolved' && (
                  <>
                    <button
                      className="btn-reply"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMessage(message);
                      }}
                    >
                      <FaReply />
                      Reply
                    </button>
                    <button
                      className="btn-resolve"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsResolved(message.id);
                      }}
                    >
                      <FaCheck />
                      Mark Resolved
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reply Modal */}
      {selectedMessage && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="reply-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reply to {selectedMessage.fullName}</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedMessage(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-content">
              <div className="original-message">
                <h4>Original Message:</h4>
                <p>{selectedMessage.message}</p>
                <div className="message-info">
                  <span><strong>Type:</strong> {selectedMessage.messageType}</span>
                  <span><strong>Class:</strong> {selectedMessage.studentClass}</span>
                  <span><strong>Sent:</strong> {formatDate(selectedMessage.createdAt)}</span>
                </div>
              </div>

              <div className="reply-section">
                <label>Your Response:</label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response here..."
                  rows={6}
                />
              </div>

              {selectedMessage.responses.length > 0 && (
                <div className="previous-responses">
                  <h4>Previous Responses:</h4>
                  {selectedMessage.responses.map(response => (
                    <div key={response.id} className="response-item">
                      <div className="response-header">
                        <strong>{response.adminName}</strong>
                        <span>{formatDate(response.createdAt)}</span>
                      </div>
                      <p>{response.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setSelectedMessage(null)}
              >
                Cancel
              </button>
              <button
                className="btn-send"
                onClick={() => handleReply(selectedMessage)}
                disabled={!replyText.trim() || isReplying}
              >
                {isReplying ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaReply />
                    Send Response
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMessages;