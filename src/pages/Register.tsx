// src/components/EnhancedRegister.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaPhone,
  FaSchool,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    adminCode: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    level: 'weak',
    score: 0,
    checks: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    authService.initialize();
  }, []);

  const evaluatePasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };

    const score = Object.values(checks).filter(Boolean).length;
    let level = 'weak';
    if (score >= 4) level = 'strong';
    else if (score >= 3) level = 'medium';

    return { level, score, checks };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');

    // Evaluate password strength in real-time
    if (name === 'password') {
      setPasswordStrength(evaluatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    // Enhanced validation
    const requiredFields = ['fullName', 'email', 'phone', 'password', 'confirmPassword'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError('Please fill in all required fields');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (passwordStrength.score < 3) {
      setError('Please choose a stronger password');
      return false;
    }

    const phoneRegex = /^\+[0-9]{1,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid phone number with country code');
      return false;
    }

    // Admin code validation for specific roles
    if ((formData.role === 'dos' || formData.role === 'dm' || formData.role === 'admin') && formData.adminCode !== 'APAER2024') {
      setError('Invalid admin access code');
      return false;
    }

    // Department validation for staff roles
    if (formData.role !== 'user' && !formData.department) {
      setError('Please select a department');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const user = await authService.register(formData);
      
      setSuccess('Account created successfully! Welcome to Apaer Institute 🎉');
      
      // Enhanced redirect with welcome message
      setTimeout(() => {
        const redirectPaths = {
          'dos': '/admin/dos',
          'dm': '/admin/dm',
          'admin': '/admin/dashboard',
          'class_teacher': '/teacher/dashboard',
          'class_chief': '/chief/dashboard',
          'user': '/dashboard'
        };
        navigate(redirectPaths[user.role] || '/dashboard', {
          state: { welcome: true, firstTime: true }
        });
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const requiresAdminCode = ['dos', 'dm', 'admin'].includes(formData.role);
  const isStaffRole = formData.role !== 'user';

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.level) {
      case 'strong': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'weak': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="enhanced-register-container">
      <div className="enhanced-register-card">
        <div className="enhanced-register-header">
          <h2>Create Your Account</h2>
          <p>Join the Apaer Institute community</p>
        </div>

        {error && (
          <div className="enhanced-register-error">
            <FaExclamationTriangle />
            <div className="error-content">
              <strong>Registration Error</strong>
              <span>{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="enhanced-register-success">
            <FaCheckCircle />
            <div className="success-content">
              <strong>Success!</strong>
              <span>{success}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="enhanced-register-form">
          {/* Personal Information Section */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="enhanced-form-group">
                <label className="enhanced-form-label">
                  <FaUser />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="enhanced-form-input"
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="enhanced-form-group">
                <label className="enhanced-form-label">
                  <FaEnvelope />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="enhanced-form-input"
                  required
                  placeholder="your.email@apaer.ac.rw"
                />
              </div>

              <div className="enhanced-form-group">
                <label className="enhanced-form-label">
                  <FaPhone />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="enhanced-form-input"
                  required
                  placeholder="+250 XXX XXX XXX"
                />
              </div>
            </div>
          </div>

          {/* Account Type Section */}
          <div className="form-section">
            <h3>Account Type</h3>
            <div className="enhanced-form-group">
              <label className="enhanced-form-label">
                <FaSchool />
                Select Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="enhanced-form-input"
                required
              >
                <option value="user">Student/Parent</option>
                <option value="class_teacher">Class Teacher</option>
                <option value="class_chief">Class Chief</option>
                <option value="dos">Director of Studies</option>
                <option value="dm">Department Manager</option>
                <option value="admin">System Administrator</option>
              </select>
              <div className="role-description">
                {formData.role === 'class_teacher' && 'Full class management and attendance tracking'}
                {formData.role === 'class_chief' && 'Student leader with attendance marking privileges'}
                {formData.role === 'dos' && 'Academic oversight and system management'}
                {formData.role === 'dm' && 'Department administration and configuration'}
                {formData.role === 'admin' && 'Full system access and administration'}
                {formData.role === 'user' && 'Access academic resources and progress tracking'}
              </div>
            </div>

            {isStaffRole && (
              <div className="enhanced-form-group">
                <label className="enhanced-form-label">
                  <FaSchool />
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="enhanced-form-input"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Tourism & Hospitality">Tourism & Hospitality</option>
                  <option value="Masonry">Masonry</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="Electrical Installation">Electrical Installation</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Academic Administration">Academic Administration</option>
                  <option value="Management">Management</option>
                </select>
              </div>
            )}
          </div>

          {/* Security Section */}
          <div className="form-section">
            <h3>Security</h3>
            <div className="form-grid">
              <div className="enhanced-form-group">
                <label className="enhanced-form-label">
                  <FaLock />
                  Password *
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="enhanced-form-input"
                    required
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="password-strength-indicator">
                    <div className="strength-bar">
                      <div 
                        className={`strength-fill ${passwordStrength.level}`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                      {passwordStrength.level.toUpperCase()} password
                    </div>
                    <div className="password-requirements">
                      {Object.entries(passwordStrength.checks).map(([key, met]) => (
                        <div key={key} className={`requirement ${met ? 'met' : 'unmet'}`}>
                          <FaCheckCircle />
                          <span>
                            {key === 'length' && 'At least 8 characters'}
                            {key === 'uppercase' && 'One uppercase letter'}
                            {key === 'lowercase' && 'One lowercase letter'}
                            {key === 'number' && 'One number'}
                            {key === 'special' && 'One special character'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="enhanced-form-group">
                <label className="enhanced-form-label">
                  <FaLock />
                  Confirm Password *
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="enhanced-form-input"
                    required
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <div className="password-match success">
                    <FaCheckCircle />
                    <span>Passwords match</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Admin Access Section */}
          {requiresAdminCode && (
            <div className="form-section">
              <h3>Admin Verification</h3>
              <div className="enhanced-form-group">
                <label className="enhanced-form-label">
                  <FaShieldAlt />
                  Admin Access Code *
                </label>
                <input
                  type="password"
                  name="adminCode"
                  value={formData.adminCode}
                  onChange={handleChange}
                  className="enhanced-form-input"
                  required
                  placeholder="Enter admin access code"
                />
                <div className="admin-code-note">
                  <FaShieldAlt />
                  <span>Required for administrative roles. Contact system administrator for code.</span>
                </div>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className={`enhanced-register-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="register-spinner"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <FaCheckCircle />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <div className="enhanced-register-footer">
          <p>
            Already have an account? <Link to="/login" className="login-link">Sign in</Link>
          </p>
          <div className="security-assurance">
            <FaShieldAlt />
            <span>Your information is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;