import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaPaperPlane, 
  FaCheck, 
  FaClock,
  FaExclamationTriangle,
  FaUserTie,
  FaUserGraduate,
  FaUserFriends,
  FaEnvelope
} from 'react-icons/fa';
import './MessagesCenter.css';

const MessagesCenter = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    loadMessages();
    window.addEventListener('storage', loadMessages);
    return () => window.removeEventListener('storage', loadMessages);
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm, statusFilter, typeFilter]);

  const loadMessages = () => {
    const teacherSubmissions = JSON.parse(localStorage.getItem('apaer_teacher_submissions') || '[]');
    const studentSubmissions = JSON.parse(localStorage.getItem('apaer_student_submissions') || '[]');
    const parentSubmissions = JSON.parse(localStorage.getItem('apaer_parent_submissions') || '[]');
    const registrationSubmissions = JSON.parse(localStorage.getItem('apaer_registrations_submissions') || '[]');

    const allMessages = [
      ...teacherSubmissions.map(msg => ({ ...msg, source: 'Teacher Portal' })),
      ...studentSubmissions.map(msg => ({ ...msg, source: 'Student Portal' })),
      ...parentSubmissions.map(msg => ({ ...msg, source: 'Parent Portal' })),
      ...registrationSubmissions.map(msg => ({ ...msg, source: 'Registration Form' }))
    ].sort((a, b) => new Date(b.submittedAt || b.submissionDate) - new Date(a.submittedAt || a.submissionDate));

    setMessages(allMessages);
  };

  const filterMessages = () => {
    let filtered = messages;

    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(msg => msg.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(msg => msg.type === typeFilter);
    }

    setFilteredMessages(filtered);
  };

  const handleReply = async (messageId) => {
    if (!replyText.trim()) return;

    const message = messages.find(msg => msg.id === messageId);
    if (!message) return;

    const storageKey = `apaer_${message.type}_submissions`;
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    const updated = existing.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            status: 'replied',
            reply: replyText,
            repliedAt: new Date().toISOString(),
            repliedBy: 'Admin'
          }
        : msg
    );

    localStorage.setItem(storageKey, JSON.stringify(updated));
    setReplyText('');
    loadMessages(); // Reload to reflect changes
  };

  const markAsUrgent = (messageId) => {
    const message = messages.find(msg => msg.id === messageId);
    if (!message) return;

    const storageKey = `apaer_${message.type}_submissions`;
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    const updated = existing.map(msg => 
      msg.id === messageId ? { ...msg, status: 'urgent' } : msg
    );

    localStorage.setItem(storageKey, JSON.stringify(updated));
    loadMessages();
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'teacher': return <FaUserTie className="type-icon teacher" />;
      case 'student': return <FaUserGraduate className="type-icon student" />;
      case 'parent': return <FaUserFriends className="type-icon parent" />;
      case 'registration': return <FaUserGraduate className="type-icon registration" />;
      default: return <FaEnvelope className="type-icon default" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'replied': return <FaCheck className="status-icon replied" />;
      case 'pending': return <FaClock className="status-icon pending" />;
      case 'urgent': return <FaExclamationTriangle className="status-icon urgent" />;
      default: return <FaClock className="status-icon pending" />;
    }
  };

  return (
    <div className="messages-center">
      <div className="messages-header">
        <h2>All Communications</h2>
        <p>Manage messages from all channels in one place</p>
      </div>

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
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="replied">Replied</option>
            <option value="urgent">Urgent</option>
          </select>

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="teacher">Teachers</option>
            <option value="student">Students</option>
            <option value="parent">Parents</option>
            <option value="registration">Registrations</option>
          </select>
        </div>
      </div>

      <div className="messages-layout">
        <div className="messages-list">
          {filteredMessages.map(message => (
            <div
              key={message.id}
              className={`message-card ${selectedMessage?.id === message.id ? 'active' : ''} ${message.status}`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="message-header">
                <div className="sender-info">
                  {getTypeIcon(message.type)}
                  <div>
                    <h4>{message.fullName || message.studentName || message.parentName}</h4>
                    <span>{message.source}</span>
                  </div>
                </div>
                <div className="message-meta">
                  {getStatusIcon(message.status)}
                  <span>{new Date(message.submittedAt || message.submissionDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <p className="message-preview">
                {message.message || message.inquiry || 'No message content'}
              </p>

              {message.status === 'pending' && (
                <div className="message-actions">
                  <button 
                    className="btn-urgent"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsUrgent(message.id);
                    }}
                  >
                    <FaExclamationTriangle />
                    Mark Urgent
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="message-detail">
          {selectedMessage ? (
            <div className="detail-view">
              <div className="detail-header">
                <div className="sender-details">
                  {getTypeIcon(selectedMessage.type)}
                  <div>
                    <h3>{selectedMessage.fullName || selectedMessage.studentName || selectedMessage.parentName}</h3>
                    <p>{selectedMessage.source}</p>
                    <p>{selectedMessage.email || selectedMessage.contactNumber}</p>
                    {selectedMessage.studentId && <p>Student ID: {selectedMessage.studentId}</p>}
                  </div>
                </div>
              </div>

              <div className="message-content">
                <h4>Original Message</h4>
                <div className="message-bubble">
                  <p>{selectedMessage.message || selectedMessage.inquiry}</p>
                  <span className="message-time">
                    {new Date(selectedMessage.submittedAt || selectedMessage.submissionDate).toLocaleString()}
                  </span>
                </div>
              </div>

              {selectedMessage.reply ? (
                <div className="reply-section">
                  <h4>Your Response</h4>
                  <div className="reply-bubble">
                    <p>{selectedMessage.reply}</p>
                    <span className="reply-time">
                      Replied: {new Date(selectedMessage.repliedAt).toLocaleString()} by {selectedMessage.repliedBy}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="reply-section">
                  <h4>Send Response</h4>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response here..."
                    rows="6"
                  />
                  <button 
                    className="btn-primary"
                    onClick={() => handleReply(selectedMessage.id)}
                    disabled={!replyText.trim()}
                  >
                    <FaPaperPlane />
                    Send Response
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="no-selection">
              <FaEnvelope />
              <p>Select a message to view details and respond</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesCenter;