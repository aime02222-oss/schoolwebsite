import React, { useState } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaGraduationCap, 
  FaComment, 
  FaPaperPlane,
  FaUpload,
  FaIdCard,
  FaCalendar,
  FaMapMarkerAlt,
  FaTransgender,
  FaSchool,
  FaFilePdf,
  FaImage,
  FaBook,
  FaLaptop,
  FaBuilding,
  FaCamera,
  FaCalculator,
  FaCog
} from 'react-icons/fa';
import './JoinUsForm.css';

const JoinUsForm = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    address: '',
    
    // Academic Information
    programType: 'o-level', // 'o-level' or 'tvet'
    program: '',
    level: '',
    
    // TVET Specific Fields
    tvetTrade: '',
    tvetLevel: '',
    
    currentSchool: '',
    previousGrades: '',
    
    // Documents (removed birth certificate and national ID)
    reportCard: null,
    studentPhoto: null,
    
    // Additional Information
    message: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    specialNeeds: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState({});

  // Program options
  const programOptions = {
    'o-level': [
      { value: 's1', label: 'Senior 1' },
      { value: 's2', label: 'Senior 2' },
      { value: 's3', label: 'Senior 3' },
      { value: 's4', label: 'Senior 4' }
    ],
    'tvet': {
      trades: [
        { value: 'tourism', label: 'Tourism', icon: FaCamera },
        { value: 'masonry', label: 'Masonry', icon: FaBuilding },
        { value: 'software', label: 'Software Development', icon: FaLaptop },
        { value: 'nit', label: 'NIT', icon: FaCog },
        { value: 'multimedia', label: 'Multimedia', icon: FaCamera },
        { value: 'accounting', label: 'Accounting', icon: FaCalculator },
        { value: 'electronics', label: 'Electronics', icon: FaCog }
      ],
      levels: [
        { value: 'level3', label: 'Level 3' },
        { value: 'level4', label: 'Level 4' },
        { value: 'level5', label: 'Level 5' }
      ]
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      
      if (file) {
        setUploadedFiles(prev => ({
          ...prev,
          [name]: URL.createObjectURL(file)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleProgramTypeChange = (programType) => {
    setFormData(prev => ({
      ...prev,
      programType,
      program: '',
      level: '',
      tvetTrade: '',
      tvetLevel: ''
    }));
  };

  // Function to save submission to AdminDashboard storage
  const saveToAdminDashboard = (submissionData) => {
    try {
      // Get existing submissions or initialize empty array
      const existingSubmissions = JSON.parse(localStorage.getItem('apaer_registrations_submissions') || '[]');
      
      // Create submission object matching AdminDashboard structure
      const adminSubmission = {
        id: Date.now(),
        // Personal Information
        fullName: submissionData.fullName,
        email: submissionData.email,
        phone: submissionData.phone,
        dateOfBirth: submissionData.dateOfBirth,
        gender: submissionData.gender,
        nationality: submissionData.nationality,
        address: submissionData.address,
        
        // Academic Information
        programType: submissionData.programType,
        program: submissionData.program,
        level: submissionData.level,
        tvetTrade: submissionData.tvetTrade,
        tvetLevel: submissionData.tvetLevel,
        
        currentSchool: submissionData.currentSchool,
        previousGrades: submissionData.previousGrades,
        
        // Document Information
        documents: {
          reportCard: submissionData.reportCard ? {
            name: submissionData.reportCard.name,
            type: submissionData.reportCard.type,
            size: submissionData.reportCard.size
          } : null,
          studentPhoto: submissionData.studentPhoto ? {
            name: submissionData.studentPhoto.name,
            type: submissionData.studentPhoto.type,
            size: submissionData.studentPhoto.size
          } : null
        },
        
        // Additional Information
        message: submissionData.message,
        emergencyContact: submissionData.emergencyContact,
        emergencyPhone: submissionData.emergencyPhone,
        medicalConditions: submissionData.medicalConditions,
        specialNeeds: submissionData.specialNeeds,
        
        // Metadata matching AdminDashboard structure
        status: 'pending',
        submittedAt: new Date().toISOString(),
        submissionDate: new Date().toISOString(),
        type: 'registration',
        hasDocuments: !!(submissionData.reportCard || submissionData.studentPhoto),
        
        // Fields expected by AdminDashboard submissions manager
        studentName: submissionData.fullName,
        description: `New ${submissionData.programType === 'o-level' ? 'O-Level' : 'TVET'} application for ${submissionData.level || submissionData.tvetLevel}`,
        inquiry: submissionData.message || 'No additional message provided'
      };

      // Add to existing submissions
      existingSubmissions.push(adminSubmission);
      
      // Save back to localStorage
      localStorage.setItem('apaer_registrations_submissions', JSON.stringify(existingSubmissions));
      
      // Update dashboard stats by triggering a storage event
      window.dispatchEvent(new Event('storage'));
      
      return true;
    } catch (error) {
      console.error('Error saving to AdminDashboard:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create submission data
      const submission = {
        id: Date.now(),
        // Personal Information
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        nationality: formData.nationality,
        address: formData.address,
        
        // Academic Information
        programType: formData.programType,
        program: formData.program,
        level: formData.level,
        tvetTrade: formData.tvetTrade,
        tvetLevel: formData.tvetLevel,
        
        currentSchool: formData.currentSchool,
        previousGrades: formData.previousGrades,
        
        // Document Information
        documents: {
          reportCard: formData.reportCard ? {
            name: formData.reportCard.name,
            type: formData.reportCard.type,
            size: formData.reportCard.size
          } : null,
          studentPhoto: formData.studentPhoto ? {
            name: formData.studentPhoto.name,
            type: formData.studentPhoto.type,
            size: formData.studentPhoto.size
          } : null
        },
        
        // Additional Information
        message: formData.message,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        medicalConditions: formData.medicalConditions,
        specialNeeds: formData.specialNeeds,
        
        // Metadata
        status: 'pending',
        submittedAt: new Date().toISOString(),
        type: 'registration',
        hasDocuments: !!(formData.reportCard || formData.studentPhoto)
      };

      // Save to both local storage and AdminDashboard
      const existingSubmissions = JSON.parse(localStorage.getItem('apaer_join_us_submissions') || '[]');
      existingSubmissions.push(submission);
      localStorage.setItem('apaer_join_us_submissions', JSON.stringify(existingSubmissions));

      // Save to AdminDashboard
      const adminSaveSuccess = saveToAdminDashboard(formData);

      if (!adminSaveSuccess) {
        throw new Error('Failed to save to admin dashboard');
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        address: '',
        programType: 'o-level',
        program: '',
        level: '',
        tvetTrade: '',
        tvetLevel: '',
        currentSchool: '',
        previousGrades: '',
        reportCard: null,
        studentPhoto: null,
        message: '',
        emergencyContact: '',
        emergencyPhone: '',
        medicalConditions: '',
        specialNeeds: ''
      });
      
      setUploadedFiles({});
      setCurrentStep(1);
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: null
    }));
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[fieldName];
      return newFiles;
    });
  };

  const getTradeIcon = (tradeValue) => {
    const trade = programOptions.tvet.trades.find(t => t.value === tradeValue);
    return trade ? trade.icon : FaBook;
  };

  return (
    <div className="contact-form-container">
      <div className="form-header">
        <h2>Join Apaer Institute</h2>
        <p>Complete your application for O-Level or TVET programs</p>
        
        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-steps">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className={`step ${step === currentStep ? 'active' : step < currentStep ? 'completed' : ''}`}>
                <div className="step-number">{step}</div>
                <div className="step-label">
                  {step === 1 && 'Personal Info'}
                  {step === 2 && 'Program Selection'}
                  {step === 3 && 'Documents'}
                  {step === 4 && 'Review & Submit'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {submitStatus === 'success' && (
        <div className="success-message">
          <FaPaperPlane />
          <div>
            <h4>Application Submitted Successfully!</h4>
            <p>Thank you for your application to Apaer Institute. Our admissions team will review your documents and contact you soon.</p>
            <p><strong>Your application has been sent to the admin dashboard for review.</strong></p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="error-message">
          <h4>Submission Failed</h4>
          <p>There was an error submitting your application. Please try again or contact us directly.</p>
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="form-step">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group with-icon">
                <label htmlFor="fullName">Full Name *</label>
                <FaUser className="form-icon" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="form-group with-icon">
                <label htmlFor="email">Email Address *</label>
                <FaEnvelope className="form-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group with-icon">
                <label htmlFor="phone">Phone Number *</label>
                <FaPhone className="form-icon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+250 78X XXX XXX"
                />
              </div>
              
              <div className="form-group with-icon">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <FaCalendar className="form-icon" />
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group with-icon">
                <label htmlFor="gender">Gender *</label>
                <FaTransgender className="form-icon" />
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              
              <div className="form-group with-icon">
                <label htmlFor="nationality">Nationality *</label>
                <FaIdCard className="form-icon" />
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  placeholder="Your nationality"
                />
              </div>
            </div>

            <div className="form-group with-icon">
              <label htmlFor="address">Home Address *</label>
              <FaMapMarkerAlt className="form-icon" />
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                placeholder="Enter your complete home address"
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="button" className="next-button" onClick={nextStep}>
                Next: Program Selection →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Program Selection */}
        {currentStep === 2 && (
          <div className="form-step">
            <h3>Program Selection</h3>
            
            <div className="program-type-selection">
              <h4>Choose Your Program Type</h4>
              <div className="program-type-buttons">
                <button
                  type="button"
                  className={`program-type-btn ${formData.programType === 'o-level' ? 'active' : ''}`}
                  onClick={() => handleProgramTypeChange('o-level')}
                >
                  <FaBook />
                  <span>Ordinary Level (O-Level)</span>
                  <small>Secondary Education</small>
                </button>
                <button
                  type="button"
                  className={`program-type-btn ${formData.programType === 'tvet' ? 'active' : ''}`}
                  onClick={() => handleProgramTypeChange('tvet')}
                >
                  <FaGraduationCap />
                  <span>TVET Program</span>
                  <small>Technical & Vocational</small>
                </button>
              </div>
            </div>

            {formData.programType === 'o-level' && (
              <div className="program-selection">
                <h4>O-Level Program</h4>
                <div className="form-group with-icon">
                  <label htmlFor="level">Grade Level *</label>
                  <FaSchool className="form-icon" />
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Grade Level</option>
                    {programOptions['o-level'].map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {formData.programType === 'tvet' && (
              <div className="program-selection">
                <h4>TVET Program Selection</h4>
                <div className="form-row">
                  <div className="form-group with-icon">
                    <label htmlFor="tvetTrade">Trade *</label>
                    <FaGraduationCap className="form-icon" />
                    <select
                      id="tvetTrade"
                      name="tvetTrade"
                      value={formData.tvetTrade}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Trade</option>
                      {programOptions.tvet.trades.map(trade => {
                        const IconComponent = trade.icon;
                        return (
                          <option key={trade.value} value={trade.value}>
                            {trade.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  
                  <div className="form-group with-icon">
                    <label htmlFor="tvetLevel">Level *</label>
                    <FaSchool className="form-icon" />
                    <select
                      id="tvetLevel"
                      name="tvetLevel"
                      value={formData.tvetLevel}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Level</option>
                      {programOptions.tvet.levels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.tvetTrade && (
                  <div className="trade-preview">
                    <div className="trade-icon">
                      {(() => {
                        const trade = programOptions.tvet.trades.find(t => t.value === formData.tvetTrade);
                        const IconComponent = trade ? trade.icon : FaBook;
                        return <IconComponent />;
                      })()}
                    </div>
                    <div className="trade-info">
                      <h5>Selected Trade: {programOptions.tvet.trades.find(t => t.value === formData.tvetTrade)?.label}</h5>
                      <p>Level: {programOptions.tvet.levels.find(l => l.value === formData.tvetLevel)?.label}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="form-group with-icon">
              <label htmlFor="currentSchool">Current/Previous School *</label>
              <FaSchool className="form-icon" />
              <input
                type="text"
                id="currentSchool"
                name="currentSchool"
                value={formData.currentSchool}
                onChange={handleChange}
                required
                placeholder="Name of your current or previous school"
              />
            </div>

            <div className="form-group with-icon">
              <label htmlFor="previousGrades">Previous Academic Performance</label>
              <FaGraduationCap className="form-icon" />
              <textarea
                id="previousGrades"
                name="previousGrades"
                value={formData.previousGrades}
                onChange={handleChange}
                rows="3"
                placeholder="Describe your previous academic performance, grades, or any notable achievements..."
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="button" className="back-button" onClick={prevStep}>
                ← Back
              </button>
              <button type="button" className="next-button" onClick={nextStep}>
                Next: Required Documents →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Document Upload - Removed birth certificate and national ID */}
        {currentStep === 3 && (
          <div className="form-step">
            <h3>Required Documents</h3>
            <p className="section-description">
              Please upload the following documents to complete your application. 
              Supported formats: PDF, JPG, PNG (Max 5MB per file)
            </p>

            <div className="document-upload-grid">
              {/* Report Card */}
              <div className="upload-card">
                <div className="upload-header">
                  <FaFilePdf className="upload-icon" />
                  <div>
                    <h4>Report Card/Transcript</h4>
                    <p>Most recent academic report card or transcript</p>
                  </div>
                </div>
                <label className="file-upload-button">
                  <FaUpload />
                  {formData.reportCard ? 'Change File' : 'Upload Report Card'}
                  <input
                    type="file"
                    name="reportCard"
                    onChange={handleChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="file-input"
                  />
                </label>
                {formData.reportCard && (
                  <div className="file-preview">
                    <span className="file-name">{formData.reportCard.name}</span>
                    <span className="file-size">{formatFileSize(formData.reportCard.size)}</span>
                    <button 
                      type="button" 
                      className="remove-file"
                      onClick={() => removeFile('reportCard')}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Student Photo */}
              <div className="upload-card">
                <div className="upload-header">
                  <FaImage className="upload-icon" />
                  <div>
                    <h4>Student Photo</h4>
                    <p>Recent passport-sized photograph</p>
                  </div>
                </div>
                <label className="file-upload-button">
                  <FaUpload />
                  {formData.studentPhoto ? 'Change Photo' : 'Upload Photo'}
                  <input
                    type="file"
                    name="studentPhoto"
                    onChange={handleChange}
                    accept=".jpg,.jpeg,.png"
                    className="file-input"
                  />
                </label>
                {formData.studentPhoto && (
                  <div className="file-preview">
                    {uploadedFiles.studentPhoto && (
                      <img 
                        src={uploadedFiles.studentPhoto} 
                        alt="Student preview" 
                        className="photo-preview"
                      />
                    )}
                    <span className="file-name">{formData.studentPhoto.name}</span>
                    <span className="file-size">{formatFileSize(formData.studentPhoto.size)}</span>
                    <button 
                      type="button" 
                      className="remove-file"
                      onClick={() => removeFile('studentPhoto')}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="back-button" onClick={prevStep}>
                ← Back
              </button>
              <button type="button" className="next-button" onClick={nextStep}>
                Next: Review & Submit →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review and Additional Information */}
        {currentStep === 4 && (
          <div className="form-step">
            <h3>Review & Submit</h3>
            
            <div className="review-section">
              <h4>Personal Information</h4>
              <div className="review-grid">
                <div className="review-item">
                  <strong>Full Name:</strong>
                  <span>{formData.fullName}</span>
                </div>
                <div className="review-item">
                  <strong>Email:</strong>
                  <span>{formData.email}</span>
                </div>
                <div className="review-item">
                  <strong>Phone:</strong>
                  <span>{formData.phone}</span>
                </div>
                <div className="review-item">
                  <strong>Date of Birth:</strong>
                  <span>{formData.dateOfBirth}</span>
                </div>
                <div className="review-item">
                  <strong>Gender:</strong>
                  <span>{formData.gender}</span>
                </div>
                <div className="review-item">
                  <strong>Nationality:</strong>
                  <span>{formData.nationality}</span>
                </div>
                <div className="review-item full-width">
                  <strong>Address:</strong>
                  <span>{formData.address}</span>
                </div>
              </div>
            </div>

            <div className="review-section">
              <h4>Academic Information</h4>
              <div className="review-grid">
                <div className="review-item">
                  <strong>Program Type:</strong>
                  <span>{formData.programType === 'o-level' ? 'Ordinary Level' : 'TVET Program'}</span>
                </div>
                {formData.programType === 'o-level' && (
                  <div className="review-item">
                    <strong>Grade Level:</strong>
                    <span>{programOptions['o-level'].find(l => l.value === formData.level)?.label}</span>
                  </div>
                )}
                {formData.programType === 'tvet' && (
                  <>
                    <div className="review-item">
                      <strong>Trade:</strong>
                      <span>{programOptions.tvet.trades.find(t => t.value === formData.tvetTrade)?.label}</span>
                    </div>
                    <div className="review-item">
                      <strong>Level:</strong>
                      <span>{programOptions.tvet.levels.find(l => l.value === formData.tvetLevel)?.label}</span>
                    </div>
                  </>
                )}
                <div className="review-item full-width">
                  <strong>Current School:</strong>
                  <span>{formData.currentSchool}</span>
                </div>
              </div>
            </div>

            <div className="review-section">
              <h4>Uploaded Documents</h4>
              <div className="documents-list">
                {formData.reportCard && (
                  <div className="document-item">
                    <FaFilePdf />
                    <span>Report Card: {formData.reportCard.name}</span>
                  </div>
                )}
                {formData.studentPhoto && (
                  <div className="document-item">
                    <FaImage />
                    <span>Student Photo: {formData.studentPhoto.name}</span>
                  </div>
                )}
                {!formData.reportCard && !formData.studentPhoto && (
                  <p className="no-documents">No documents uploaded</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="emergencyContact">Emergency Contact Person *</label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                required
                placeholder="Full name of emergency contact"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emergencyPhone">Emergency Contact Phone *</label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  required
                  placeholder="Emergency contact phone number"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="medicalConditions">Medical Conditions</label>
                <input
                  type="text"
                  id="medicalConditions"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  placeholder="Any known medical conditions"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="specialNeeds">Special Educational Needs</label>
              <textarea
                id="specialNeeds"
                name="specialNeeds"
                value={formData.specialNeeds}
                onChange={handleChange}
                rows="3"
                placeholder="Any special educational needs or accommodations required..."
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="message">Additional Information</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Any additional information you'd like to share with our admissions team..."
              ></textarea>
              <div className="char-count">
                {formData.message.length}/500 characters
              </div>
            </div>

            <div className="form-footer">
              <p className="form-note">
                * Required fields. By submitting this form, you confirm that all information provided is accurate and complete. 
                You agree to our privacy policy and consent to being contacted by our admissions team.
                <br /><br />
                <strong>Your application will be sent directly to the admin dashboard for review.</strong>
              </p>
              
              <div className="form-actions">
                <button type="button" className="back-button" onClick={prevStep}>
                  ← Back
                </button>
                <button 
                  type="submit" 
                  className={`submit-button ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Submit Complete Application
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>

      <div className="contact-info">
        <h4>Need Help With Your Application?</h4>
        <div className="info-grid">
          <div className="info-item">
            <strong>Visit Our Campus</strong>
            <p>Apaer Institute, Kigali, Rwanda</p>
            <p>Monday - Friday, 8:00 AM - 5:00 PM</p>
          </div>
          <div className="info-item">
            <strong>Call Admissions</strong>
            <p>+250 788 123 456</p>
            <p>admissions@apaer.ac.rw</p>
          </div>
          <div className="info-item">
            <strong>Document Requirements</strong>
            <p>• Report Card/Transcript</p>
            <p>• Student Photo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUsForm;