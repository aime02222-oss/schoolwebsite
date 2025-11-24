import React, { useState } from 'react';
import { 
  FaUser, 
  FaUserGraduate, 
  FaIdCard, 
  FaUsers, 
  FaPhone, 
  FaEnvelope,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUserFriends
} from 'react-icons/fa';
import './Form.css';

// Define TypeScript type for the form state
interface FormData {
  parentName: string;
  studentName: string;
  studentId: string;
  relationship: string;
  contactNumber: string;
  message: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    studentName: '',
    studentId: '',
    relationship: '',
    contactNumber: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        parentName: '',
        studentName: '',
        studentId: '',
        relationship: '',
        contactNumber: '',
        message: ''
      });
    }, 3000);
  };

  const relationshipOptions = [
    'Father',
    'Mother', 
    'Guardian',
    'Grandparent',
    'Sibling',
    'Other Family Member'
  ];

  if (isSubmitted) {
    return (
      <div className="modern-parent-form-success">
        <div className="success-animation">
          <FaCheckCircle className="success-icon" />
          <div className="success-ring"></div>
        </div>
        <h2>Message Sent Successfully!</h2>
        <p>We've received your inquiry and will contact you within 24 hours.</p>
        <div className="success-details">
          <div className="detail-item">
            <span>Reference ID:</span>
            <strong>PAR-{Date.now().toString().slice(-6)}</strong>
          </div>
          <div className="detail-item">
            <span>Student:</span>
            <strong>{formData.studentName}</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-parent-form-container">
      {/* Header Section */}
      <div className="form-header-section">
        <div className="header-content">
          <div className="header-icon">
            <FaUserFriends />
          </div>
          <div className="header-text">
            <h2>Parent & Guardian Portal</h2>
            <p>Connect with us regarding your child's education and well-being</p>
          </div>
        </div>
        <div className="header-badge">
          <FaExclamationTriangle />
          <span>Priority Response for Parents</span>
        </div>
      </div>

      <form className="modern-parent-form" onSubmit={handleSubmit}>
        {/* Parent Information Section */}
        <div className="form-section">
          <div className="section-header">
            <FaUser className="section-icon" />
            <h3>Parent/Guardian Information</h3>
          </div>
          
          <div className="form-grid">
            <div className="modern-form-group">
              <label className="form-label">
                <FaUser className="label-icon" />
                Your Full Name *
              </label>
              <div className="input-container">
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
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
                Relationship to Student *
              </label>
              <div className="select-container">
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="modern-select"
                  required
                >
                  <option value="">Select Relationship</option>
                  {relationshipOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <div className="select-arrow"></div>
              </div>
            </div>

            <div className="modern-form-group">
              <label className="form-label">
                <FaPhone className="label-icon" />
                Contact Number *
              </label>
              <div className="input-container">
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="modern-input"
                  required
                  placeholder="+250 XXX XXX XXX"
                  pattern="[+0-9\s\-\(\)]{10,}"
                />
                <div className="input-focus-border"></div>
              </div>
              <div className="input-hint">Include country code if international</div>
            </div>
          </div>
        </div>

        {/* Student Information Section */}
        <div className="form-section">
          <div className="section-header">
            <FaUserGraduate className="section-icon" />
            <h3>Student Information</h3>
          </div>

          <div className="form-grid">
            <div className="modern-form-group">
              <label className="form-label">
                <FaUserGraduate className="label-icon" />
                Student's Full Name *
              </label>
              <div className="input-container">
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="modern-input"
                  required
                  placeholder="Enter student's full name"
                />
                <div className="input-focus-border"></div>
              </div>
            </div>

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
                  placeholder="Enter student ID"
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
            <h3>Your Message</h3>
          </div>

          <div className="modern-form-group full-width">
            <label className="form-label">
              <FaPaperPlane className="label-icon" />
              Message Details *
            </label>
            <div className="textarea-container">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="modern-textarea"
                required
                rows={6} // ✅ number, not string
                placeholder="Please describe your inquiry, concern, or feedback regarding your child's education..."
              ></textarea>
              <div className="textarea-focus-border"></div>
              <div className="character-count">
                {formData.message.length}/1000 characters
              </div>
            </div>
            <div className="input-hint">
              Please include specific details about academic progress, behavior, or any concerns
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
                <span>Send Message to School</span>
              </>
            )}
          </button>
          
          <div className="form-note">
            <FaExclamationTriangle className="note-icon" />
            <span>All fields marked with * are required. We prioritize parent communications.</span>
          </div>
        </div>
      </form>

      {/* Contact Information */}
      <div className="parent-support-info">
        <h4>Additional Support Channels</h4>
        <div className="support-options">
          <div className="support-option">
            <div className="option-icon urgent">
              <FaExclamationTriangle />
            </div>
            <div className="option-details">
              <strong>Urgent Matters</strong>
              <span>Call: +250 788 123 456</span>
              <small>Available 8:00 AM - 5:00 PM</small>
            </div>
          </div>
          <div className="support-option">
            <div className="option-icon email">
              <FaEnvelope />
            </div>
            <div className="option-details">
              <strong>Email Support</strong>
              <span>parents@apaer.ac.rw</span>
              <small>Response within 24 hours</small>
            </div>
          </div>
          <div className="support-option">
            <div className="option-icon meeting">
              <FaUserFriends />
            </div>
            <div className="option-details">
              <strong>Parent Meetings</strong>
              <span>Schedule appointment</span>
              <small>Via school office</small>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="privacy-notice">
        <FaExclamationTriangle className="privacy-icon" />
        <div className="privacy-text">
          <strong>Privacy Assurance:</strong> All information provided is kept strictly confidential 
          and used solely for educational purposes in accordance with our privacy policy.
        </div>
      </div>
    </div>
  );
};

export default Form;
