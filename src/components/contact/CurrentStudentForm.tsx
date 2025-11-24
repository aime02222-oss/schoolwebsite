import { useState } from 'react';
import { 
  FaUserGraduate, 
  FaIdCard, 
  FaUsers, 
  FaEnvelope, 
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import './CurrentStudentForm.css';

interface FormData {
  studentId: string;
  fullName: string;
  studentClass: string;
  messageType: string;
  message: string;
}

const CurrentStudentForm = () => {
  const [formData, setFormData] = useState<FormData>({
    studentId: '',
    fullName: '',
    studentClass: '',
    messageType: 'Academic Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save message to localStorage
      const messageData = {
        id: Date.now().toString(),
        studentId: formData.studentId,
        fullName: formData.fullName,
        studentClass: formData.studentClass,
        messageType: formData.messageType,
        message: formData.message,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        responses: []
      };

      // Get existing messages
      const existingMessages = JSON.parse(localStorage.getItem('apaer_student_messages') || '[]');
      const updatedMessages = [...existingMessages, messageData];
      
      // Save to localStorage
      localStorage.setItem('apaer_student_messages', JSON.stringify(updatedMessages));
      
      // Trigger storage event for admin dashboard
      window.dispatchEvent(new Event('storage'));

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          studentId: '',
          fullName: '',
          studentClass: '',
          messageType: 'Academic Inquiry',
          message: ''
        });
      }, 3000);

    } catch (error) {
      console.error('Error submitting message:', error);
      setIsSubmitting(false);
      alert('Failed to send message. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="modern-form-success">
        <div className="success-animation">
          <FaCheckCircle className="success-icon" />
          <div className="success-ring"></div>
        </div>
        <h2>Message Sent Successfully!</h2>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <div className="success-details">
          <div className="detail-item">
            <span>Reference ID:</span>
            <strong>STU-{Date.now().toString().slice(-6)}</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-contact-form-container">
      {/* Form Header */}
      <div className="form-header-section">
        <div className="header-content">
          <div className="header-icon">
            <FaUserGraduate />
          </div>
          <div className="header-text">
            <h2>Student Support Portal</h2>
            <p>Get in touch with our academic and administrative teams</p>
          </div>
        </div>
        <div className="header-badge">
          <FaExclamationTriangle />
          <span>Response within 24 hours</span>
        </div>
      </div>

      <form className="modern-contact-form" onSubmit={handleSubmit}>
        {/* Student Info Section */}
        <div className="form-section">
          <div className="section-header">
            <FaIdCard className="section-icon" />
            <h3>Student Information</h3>
          </div>

          <div className="form-grid">
            <div className="modern-form-group">
              <label className="form-label">
                <FaIdCard className="label-icon" />
                Student ID *
              </label>
              <div className="input-container">
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="modern-input"
                  required
                  placeholder="Enter your student ID"
                />
                <div className="input-focus-border"></div>
              </div>
            </div>

            <div className="modern-form-group">
              <label className="form-label">
                <FaUserGraduate className="label-icon" />
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
                <FaUsers className="label-icon" />
                Class/Level *
              </label>
              <div className="input-container">
                <input
                  type="text"
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleChange}
                  className="modern-input"
                  required
                  placeholder="e.g., S3A, TVET Level 4"
                />
                <div className="input-focus-border"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Section */}
        <div className="form-section">
          <div className="section-header">
            <FaEnvelope className="section-icon" />
            <h3>Message Details</h3>
          </div>

          <div className="form-grid">
            <div className="modern-form-group">
              <label className="form-label">
                <FaEnvelope className="label-icon" />
                Message Type
              </label>
              <div className="select-container">
                <select
                  name="messageType"
                  value={formData.messageType}
                  onChange={handleChange}
                  className="modern-select"
                >
                  <option value="Academic Inquiry">Academic Inquiry</option>
                  <option value="Administrative Issue">Administrative Issue</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Fee & Payment">Fee & Payment</option>
                  <option value="Other">Other</option>
                </select>
                <div className="select-arrow"></div>
              </div>
            </div>

            <div className="modern-form-group full-width">
              <label className="form-label">
                <FaPaperPlane className="label-icon" />
                Your Message *
              </label>
              <div className="textarea-container">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="modern-textarea"
                  required
                  rows={6}
                  placeholder="Please describe your inquiry or issue in detail..."
                  maxLength={500}
                ></textarea>
                <div className="textarea-focus-border"></div>
                <div className="character-count">
                  {formData.message.length}/500 characters
                </div>
              </div>
            </div>
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
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <FaPaperPlane />
                <span>Send Message</span>
              </>
            )}
          </button>

          <div className="form-note">
            <FaExclamationTriangle className="note-icon" />
            <span>All fields marked with * are required</span>
          </div>
        </div>
      </form>

      {/* Support Info */}
      <div className="support-info">
        <h4>Need Immediate Assistance?</h4>
        <div className="support-options">
          <div className="support-option">
            <div className="option-icon emergency">
              <FaExclamationTriangle />
            </div>
            <div className="option-details">
              <strong>Urgent Issues</strong>
              <span>Visit Student Affairs Office</span>
            </div>
          </div>
          <div className="support-option">
            <div className="option-icon email">
              <FaEnvelope />
            </div>
            <div className="option-details">
              <strong>Email Support</strong>
              <span>student-support@apaer.ac.rw</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentStudentForm;