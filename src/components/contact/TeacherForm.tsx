import React, { useState } from 'react';
import { 
  FaUser, 
  FaIdCard, 
  FaBuilding, 
  FaBook, 
  FaEnvelope,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaClipboardList,
  FaUserTie
} from 'react-icons/fa';
import './TeacherForm.css';
const TeacherForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    staffId: '',
    department: '',
    subjectTeaching: '',
    messageType: 'Administrative',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        staffId: '',
        department: '',
        subjectTeaching: '',
        messageType: 'Administrative',
        message: ''
      });
    }, 3000);
  };

  const messageTypes = [
    'Administrative',
    'Academic', 
    'Resource Request',
    'Technical Support',
    'Professional Development',
    'Student Concern',
    'Curriculum Feedback',
    'Other'
  ];

  const departments = [
    'Sciences',
    'Humanities',
    'Mathematics',
    'Languages',
    'TVET - Software Development',
    'TVET - Networking',
    'TVET - Tourism',
    'TVET - Masonry',
    'TVET - Accounting',
    'TVET - Multimedia',
    'TVET - Electronics',
    'Administration'
  ];

  if (isSubmitted) {
    return (
      <div className="modern-teacher-form-success">
        <div className="success-animation">
          <FaCheckCircle className="success-icon" />
          <div className="success-ring"></div>
        </div>
        <h2>Message Submitted Successfully!</h2>
        <p>Your inquiry has been forwarded to the relevant department.</p>
        <div className="success-details">
          <div className="detail-item">
            <span>Reference ID:</span>
            <strong>TCH-{Date.now().toString().slice(-6)}</strong>
          </div>
          <div className="detail-item">
            <span>Priority Level:</span>
            <strong className="priority-high">High</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-teacher-form-container">
      {/* Header Section */}
      <div className="form-header-section">
        <div className="header-content">
          <div className="header-icon">
            <FaChalkboardTeacher />
          </div>
          <div className="header-text">
            <h2>Faculty Communication Portal</h2>
            <p>Professional communication channel for teaching staff and administration</p>
          </div>
        </div>
        <div className="header-badge">
          <FaUserTie />
          <span>Staff Priority Access</span>
        </div>
      </div>

      <form className="modern-teacher-form" onSubmit={handleSubmit}>
        {/* Professional Information Section */}
        <div className="form-section">
          <div className="section-header">
            <FaUserTie className="section-icon" />
            <h3>Professional Information</h3>
          </div>
          
          <div className="form-grid">
            <div className="modern-form-group">
              <label className="form-label">
                <FaUser className="label-icon" />
                Full Name *
              </label>
              <div className="input-container">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="modern-input"
                  required
                  placeholder="Enter your full name"
                />
                <div className="input-focus-border"></div>
              </div>
            </div>

            <div className="modern-form-group">
              <label className="form-label">
                <FaIdCard className="label-icon" />
                Staff ID *
              </label>
              <div className="input-container">
                <input
                  type="text"
                  name="staffId"
                  value={formData.staffId}
                  onChange={handleChange}
                  className="modern-input"
                  required
                  placeholder="STAFF-XXXXX"
                />
                <div className="input-focus-border"></div>
              </div>
            </div>

            <div className="modern-form-group">
              <label className="form-label">
                <FaBuilding className="label-icon" />
                Department *
              </label>
              <div className="select-container">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="modern-select"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <div className="select-arrow"></div>
              </div>
            </div>

            <div className="modern-form-group">
              <label className="form-label">
                <FaBook className="label-icon" />
                Subject Teaching *
              </label>
              <div className="input-container">
                <input
                  type="text"
                  name="subjectTeaching"
                  value={formData.subjectTeaching}
                  onChange={handleChange}
                  className="modern-input"
                  required
                  placeholder="Primary teaching subject"
                />
                <div className="input-focus-border"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Details Section */}
        <div className="form-section">
          <div className="section-header">
            <FaClipboardList className="section-icon" />
            <h3>Inquiry Details</h3>
          </div>

          <div className="form-grid">
            <div className="modern-form-group">
              <label className="form-label">
                <FaEnvelope className="label-icon" />
                Message Type *
              </label>
              <div className="select-container">
                <select
                  name="messageType"
                  value={formData.messageType}
                  onChange={handleChange}
                  className="modern-select"
                  required
                >
                  {messageTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="select-arrow"></div>
              </div>
            </div>

            <div className="modern-form-group full-width">
              <label className="form-label">
                <FaPaperPlane className="label-icon" />
                Detailed Message *
              </label>
              <div className="textarea-container">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="modern-textarea"
                  required
                  rows="6"
                  placeholder="Please provide detailed information about your inquiry, request, or concern. Include any relevant student names, class details, or specific requirements..."
                ></textarea>
                <div className="textarea-focus-border"></div>
                <div className="character-count">
                  {formData.message.length}/1500 characters
                </div>
              </div>
              <div className="input-hint">
                For resource requests, please include quantity, specifications, and required date
              </div>
            </div>
          </div>
        </div>

        {/* Urgency Level */}
        <div className="urgency-section">
          <div className="urgency-header">
            <FaExclamationTriangle className="urgency-icon" />
            <h4>Priority Level</h4>
          </div>
          <div className="urgency-options">
            <label className="urgency-option">
              <input type="radio" name="urgency" value="normal" defaultChecked />
              <span className="urgency-label normal">
                <div className="urgency-dot"></div>
                Normal Priority
                <small>Response within 48 hours</small>
              </span>
            </label>
            <label className="urgency-option">
              <input type="radio" name="urgency" value="high" />
              <span className="urgency-label high">
                <div className="urgency-dot"></div>
                High Priority
                <small>Response within 24 hours</small>
              </span>
            </label>
            <label className="urgency-option">
              <input type="radio" name="urgency" value="urgent" />
              <span className="urgency-label urgent">
                <div className="urgency-dot"></div>
                Urgent
                <small>Immediate attention required</small>
              </span>
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                <span>Processing Request...</span>
              </>
            ) : (
              <>
                <FaPaperPlane />
                <span>Submit Professional Request</span>
              </>
            )}
          </button>
          
          <div className="form-note">
            <FaExclamationTriangle className="note-icon" />
            <span>All communications are logged for professional record-keeping</span>
          </div>
        </div>
      </form>

      {/* Support Channels */}
      <div className="teacher-support-info">
        <h4>Immediate Support Channels</h4>
        <div className="support-options">
          <div className="support-option">
            <div className="option-icon urgent">
              <FaExclamationTriangle />
            </div>
            <div className="option-details">
              <strong>Urgent Administrative</strong>
              <span>Principal's Office</span>
              <small>Extension: 101</small>
            </div>
          </div>
          <div className="support-option">
            <div className="option-icon academic">
              <FaGraduationCap />
            </div>
            <div className="option-details">
              <strong>Academic Affairs</strong>
              <span>Dean of Academics</span>
              <small>Extension: 102</small>
            </div>
          </div>
          <div className="support-option">
            <div className="option-icon technical">
              <FaChalkboardTeacher />
            </div>
            <div className="option-details">
              <strong>Technical Support</strong>
              <span>IT Department</span>
              <small>Extension: 103</small>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Guidelines */}
      <div className="guidelines-notice">
        <FaClipboardList className="guidelines-icon" />
        <div className="guidelines-text">
          <strong>Professional Communication Guidelines:</strong> Please ensure all communications 
          maintain professional standards. For student-related concerns, include relevant context 
          while respecting confidentiality protocols.
        </div>
      </div>
    </div>
  );
};

export default TeacherForm;