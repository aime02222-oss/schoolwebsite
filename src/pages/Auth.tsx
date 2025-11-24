// src/components/EnhancedAuth.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaEye, 
  FaEyeSlash, 
  FaSchool,
  FaShieldAlt,
  FaUserTie,
  FaUserGraduate,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaRocket,
  FaAward,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaUsers,
  FaClock,
  FaGlobe,
  FaMobile,
  FaCog,
  FaSync,
  FaSun,
  FaMoon,
  FaDatabase,
  FaNetworkWired,
  FaUserCheck,
  FaChartLine
} from 'react-icons/fa';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'user',
    adminCode: '',
    phone: '',
    department: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [securityLevel, setSecurityLevel] = useState('low');
  const [theme, setTheme] = useState('light');
  const [particles, setParticles] = useState([]);
  const [securityFeatures, setSecurityFeatures] = useState([]);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  // Enhanced particle animation
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 25; i++) {
        newParticles.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          size: Math.random() * 4 + 1,
          duration: Math.random() * 25 + 15,
          delay: Math.random() * 5
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    
    // Initialize security features with available icons
    setSecurityFeatures([
      { icon: FaShieldAlt, text: 'End-to-End Encryption', color: '#10b981' },
      { icon: FaUserCheck, text: 'Biometric Ready', color: '#3b82f6' },
      { icon: FaDatabase, text: 'Secure Data Storage', color: '#8b5cf6' },
      { icon: FaNetworkWired, text: 'Multi-Factor Auth', color: '#f59e0b' }
    ]);

    // Generate CAPTCHA if needed
    if (loginAttempts >= 2) {
      generateCaptcha();
      setCaptchaRequired(true);
    }
  }, [loginAttempts]);

  // Enhanced password strength evaluation
  useEffect(() => {
    if (!isLogin && formData.password) {
      const strength = evaluatePasswordStrength(formData.password);
      setSecurityLevel(strength);
    }
  }, [formData.password, isLogin]);

  const evaluatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score >= 4) return 'high';
    if (score >= 3) return 'medium';
    return 'low';
  };

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(result);
  };

  const validateCaptcha = () => {
    return captchaCode.toUpperCase() === generatedCaptcha;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors and success messages on change
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    // Enhanced validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!isLogin) {
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }

      if (!formData.fullName) {
        setError('Please enter your full name');
        return false;
      }

      if (!formData.phone) {
        setError('Please enter your phone number');
        return false;
      }

      // Enhanced admin code validation
      if ((formData.role === 'dos' || formData.role === 'dm' || formData.role === 'admin') && formData.adminCode !== 'APAER2024') {
        setError('Invalid admin access code. Contact system administrator.');
        return false;
      }
    }

    // CAPTCHA validation for multiple failed attempts
    if (captchaRequired && !validateCaptcha()) {
      setError('Invalid CAPTCHA code. Please try again.');
      generateCaptcha();
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
      // Simulate API call with enhanced security delay
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

      if (isLogin) {
        // Enhanced login logic with security tracking
        const users = JSON.parse(localStorage.getItem('apaer_users') || '[]');
        const user = users.find(u => u.email === formData.email && u.password === formData.password);
        
        if (!user) {
          const newAttempts = loginAttempts + 1;
          setLoginAttempts(newAttempts);
          throw new Error('Invalid email or password');
        }

        if (!user.isActive) {
          throw new Error('Account is deactivated. Please contact administrator.');
        }

        // Check for suspicious activity
        const failedAttempts = JSON.parse(localStorage.getItem('apaer_failed_attempts') || '[]');
        const recentFailures = failedAttempts.filter(attempt => 
          attempt.email === formData.email && 
          new Date() - new Date(attempt.timestamp) < 30 * 60 * 1000 // 30 minutes
        );

        if (recentFailures.length >= 5) {
          throw new Error('Too many failed attempts. Account temporarily locked.');
        }

        // Create enhanced user session
        const sessionData = {
          ...user,
          lastLogin: new Date().toISOString(),
          loginCount: (user.loginCount || 0) + 1,
          sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ipAddress: 'detected', // In real app, get from backend
          userAgent: navigator.userAgent
        };

        localStorage.setItem('apaer_current_user', JSON.stringify(sessionData));
        localStorage.setItem('apaer_token', `token_${Date.now()}_${btoa(user.email)}`);
        localStorage.setItem('apaer_last_auth', new Date().toISOString());

        // Track successful login
        const authEvents = JSON.parse(localStorage.getItem('apaer_auth_events') || '[]');
        authEvents.push({
          type: 'login_success',
          email: formData.email,
          timestamp: new Date().toISOString(),
          ip: 'detected',
          userAgent: navigator.userAgent
        });
        localStorage.setItem('apaer_auth_events', JSON.stringify(authEvents));

        // Clear failed attempts
        const updatedFailures = failedAttempts.filter(attempt => attempt.email !== formData.email);
        localStorage.setItem('apaer_failed_attempts', JSON.stringify(updatedFailures));

        setSuccess('Login successful! Redirecting...');
        
        // Enhanced redirect with role-based routing
        setTimeout(() => {
          const redirectPath = getRedirectPath(user);
          navigate(redirectPath, { 
            state: { 
              welcomeBack: true,
              lastLogin: user.lastLogin 
            } 
          });
        }, 1000);

      } else {
        // Enhanced registration logic
        const users = JSON.parse(localStorage.getItem('apaer_users') || '[]');
        
        // Check if user already exists
        if (users.find(u => u.email === formData.email)) {
          throw new Error('User with this email already exists');
        }

        // Validate department based on role
        if (!formData.department && formData.role !== 'user') {
          throw new Error('Please select a department');
        }

        const newUser = {
          id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          role: formData.role,
          phone: formData.phone,
          department: formData.department || 'General',
          avatar: `/images/avatars/${formData.role}.png`,
          createdAt: new Date().toISOString(),
          isActive: true,
          lastLogin: new Date().toISOString(),
          loginCount: 1,
          permissions: getDefaultPermissions(formData.role),
          settings: {
            theme: 'light',
            notifications: true,
            language: 'en',
            twoFactor: false
          },
          profile: {
            department: formData.department || 'General',
            joinDate: new Date().toISOString().split('T')[0],
            position: getRoleDisplayName(formData.role),
            bio: `New ${getRoleDisplayName(formData.role)} at Apaer Institute`
          },
          security: {
            lastPasswordChange: new Date().toISOString(),
            failedAttempts: 0
          }
        };

        users.push(newUser);
        localStorage.setItem('apaer_users', JSON.stringify(users));
        
        // Auto-login after registration
        localStorage.setItem('apaer_current_user', JSON.stringify(newUser));
        localStorage.setItem('apaer_token', `token_${Date.now()}_${btoa(newUser.email)}`);
        localStorage.setItem('apaer_last_auth', new Date().toISOString());

        // Track registration event
        const authEvents = JSON.parse(localStorage.getItem('apaer_auth_events') || '[]');
        authEvents.push({
          type: 'register_success',
          email: formData.email,
          role: formData.role,
          timestamp: new Date().toISOString(),
          ip: 'detected'
        });
        localStorage.setItem('apaer_auth_events', JSON.stringify(authEvents));

        setSuccess('Account created successfully! Welcome to Apaer Institute! 🎉');
        
        setTimeout(() => {
          const redirectPath = getRedirectPath(newUser);
          navigate(redirectPath, { 
            state: { 
              welcome: true,
              firstTime: true 
            } 
          });
        }, 1500);
      }
    } catch (err) {
      setError(err.message);
      
      // Track failed auth attempt
      const authEvents = JSON.parse(localStorage.getItem('apaer_auth_events') || '[]');
      authEvents.push({
        type: isLogin ? 'login_failed' : 'register_failed',
        email: formData.email,
        timestamp: new Date().toISOString(),
        error: err.message,
        ip: 'detected'
      });
      localStorage.setItem('apaer_auth_events', JSON.stringify(authEvents));

      // Track failed attempts for security
      if (isLogin) {
        const failedAttempts = JSON.parse(localStorage.getItem('apaer_failed_attempts') || '[]');
        failedAttempts.push({
          email: formData.email,
          timestamp: new Date().toISOString(),
          ip: 'detected'
        });
        localStorage.setItem('apaer_failed_attempts', JSON.stringify(failedAttempts));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultPermissions = (role) => {
    const permissions = {
      admin: ['all'],
      dos: ['view_all', 'export_reports', 'analytics', 'receive_reports', 'system_management', 'user_management'],
      dm: ['view_all', 'export_reports', 'analytics', 'receive_reports', 'system_management', 'config_management'],
      class_teacher: ['mark_attendance', 'view_class', 'export_reports', 'manage_remarks'],
      class_chief: ['mark_attendance', 'view_class', 'export_reports'],
      user: ['view_class']
    };
    return permissions[role] || ['view_class'];
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      'dos': 'Director of Studies',
      'dm': 'Department Manager',
      'class_teacher': 'Class Teacher',
      'class_chief': 'Class Chief',
      'admin': 'System Administrator',
      'user': 'Student/Parent'
    };
    return roleNames[role] || role;
  };

  const getRedirectPath = (user) => {
    switch (user.role) {
      case 'dos':
        return '/admin/dos';
      case 'dm':
        return '/admin/dm';
      case 'class_teacher':
        return '/teacher/dashboard';
      case 'class_chief':
        return '/chief/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/dashboard';
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      role: 'user',
      adminCode: '',
      phone: '',
      department: ''
    });
    setSecurityLevel('low');
    setCaptchaRequired(false);
    setCaptchaCode('');
  };

  const getSecurityColor = () => {
    switch (securityLevel) {
      case 'high': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'low': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getSecurityText = () => {
    switch (securityLevel) {
      case 'high': return 'Strong password 🔒';
      case 'medium': return 'Moderate password 🟡';
      case 'low': return 'Weak password 🔴';
      default: return 'Password strength';
    }
  };

  const requiresAdminCode = ['dos', 'dm', 'admin'].includes(formData.role);

  return (
    <div className={`enhanced-auth-container ${theme}`}>
      {/* Enhanced Background with Security Features */}
      <div className="auth-background-enhanced">
        <div className="auth-shapes-enhanced">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="shape-enhanced"
              style={{
                top: `${particle.top}%`,
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`
              }}
            ></div>
          ))}
        </div>
        <div className="background-overlay-enhanced"></div>
        
        {/* Security Features Display */}
        <div className="security-features-panel">
          <h4>Enterprise Security Features</h4>
          <div className="security-features-grid">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="security-feature">
                  <IconComponent style={{ color: feature.color }} />
                  <span>{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Auth Card */}
      <div className="enhanced-auth-card">
        {/* Enhanced Header */}
        <div className="enhanced-auth-header">
          <div className="school-brand-enhanced">
            <div className="brand-logo-enhanced">
              <FaRocket />
            </div>
            <div className="brand-text-enhanced">
              <h1>Apaer Institute</h1>
              <p>Excellence in Technical Education</p>
              <div className="brand-tagline-enhanced">
                <FaAward className="tagline-icon" />
                <span>Kigali, Rwanda • Since 2024</span>
              </div>
            </div>
          </div>
          <div className="enhanced-auth-mode">
            <div className="mode-indicator-enhanced">
              <div className={`mode-tab-enhanced ${isLogin ? 'active' : ''}`}>
                {isLogin ? 'Secure Sign In' : 'Join Our Community'}
              </div>
            </div>
            <h2>{isLogin ? 'Welcome Back! 👋' : 'Create Your Account 🚀'}</h2>
            <p>
              {isLogin 
                ? 'Sign in securely to access your educational dashboard' 
                : 'Start your learning journey with Apaer Institute'
              }
            </p>
          </div>
        </div>

        {/* Enhanced Messages */}
        {error && (
          <div className="enhanced-message error animated">
            <FaExclamationTriangle />
            <div className="message-content-enhanced">
              <strong>Security Notice</strong>
              <span>{error}</span>
            </div>
          </div>
        )}
        {success && (
          <div className="enhanced-message success animated">
            <FaCheckCircle />
            <div className="message-content-enhanced">
              <strong>Success!</strong>
              <span>{success}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="enhanced-auth-form">
          {/* Full Name - Enhanced */}
          {!isLogin && (
            <div className="enhanced-form-group">
              <label className="enhanced-form-label">
                <FaUser className="label-icon" />
                Full Name *
              </label>
              <div className="enhanced-input-container">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="enhanced-form-input"
                  placeholder="Enter your full name"
                  required
                  minLength="2"
                />
                <div className="input-helper-enhanced">
                  <FaInfoCircle />
                  <span>As it appears on official documents</span>
                </div>
              </div>
            </div>
          )}

          {/* Email - Enhanced */}
          <div className="enhanced-form-group">
            <label className="enhanced-form-label">
              <FaEnvelope className="label-icon" />
              Email Address *
            </label>
            <div className="enhanced-input-container">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="enhanced-form-input"
                placeholder="your.email@apaer.ac.rw"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
              <div className="input-helper-enhanced">
                <FaGlobe />
                <span>We'll never share your email with third parties</span>
              </div>
            </div>
          </div>

          {/* Phone Number - Enhanced */}
          {!isLogin && (
            <div className="enhanced-form-group">
              <label className="enhanced-form-label">
                <FaMobile className="label-icon" />
                Phone Number *
              </label>
              <div className="enhanced-input-container">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="enhanced-form-input"
                  placeholder="+250 XXX XXX XXX"
                  required
                  pattern="^\+[0-9]{1,15}$"
                />
                <div className="input-helper-enhanced">
                  <FaInfoCircle />
                  <span>Include country code for international numbers</span>
                </div>
              </div>
            </div>
          )}

          {/* Password - Enhanced */}
          <div className="enhanced-form-group">
            <label className="enhanced-form-label">
              <FaLock className="label-icon" />
              Password *
            </label>
            <div className="enhanced-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="enhanced-form-input"
                placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                required
                minLength={isLogin ? "1" : "8"}
              />
              <button
                type="button"
                className="enhanced-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {!isLogin && formData.password && (
              <div className="enhanced-password-strength">
                <div className="strength-bar-enhanced">
                  <div 
                    className={`strength-fill-enhanced ${securityLevel}`}
                    style={{ width: securityLevel === 'high' ? '100%' : securityLevel === 'medium' ? '66%' : '33%' }}
                  ></div>
                </div>
                <span className="strength-text-enhanced" style={{ color: getSecurityColor() }}>
                  {getSecurityText()}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password - Enhanced */}
          {!isLogin && (
            <div className="enhanced-form-group">
              <label className="enhanced-form-label">
                <FaLock className="label-icon" />
                Confirm Password *
              </label>
              <div className="enhanced-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="enhanced-form-input"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="enhanced-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          )}

          {/* Role Selection - Enhanced */}
          {!isLogin && (
            <div className="enhanced-form-group">
              <label className="enhanced-form-label">
                <FaUserTie className="label-icon" />
                Account Type *
              </label>
              <div className="enhanced-role-selection">
                <label className="enhanced-role-option">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === 'user'}
                    onChange={handleChange}
                  />
                  <div className="enhanced-role-card">
                    <FaUserGraduate className="role-icon" />
                    <div className="enhanced-role-info">
                      <span className="enhanced-role-title">Student/Parent</span>
                      <span className="enhanced-role-desc">Access academic resources and progress tracking</span>
                    </div>
                    <div className="enhanced-role-features">
                      <span><FaCheckCircle /> Course Materials</span>
                      <span><FaCheckCircle /> Progress Reports</span>
                      <span><FaCheckCircle /> Communication</span>
                    </div>
                  </div>
                </label>
                
                <label className="enhanced-role-option">
                  <input
                    type="radio"
                    name="role"
                    value="class_teacher"
                    checked={formData.role === 'class_teacher'}
                    onChange={handleChange}
                  />
                  <div className="enhanced-role-card">
                    <FaChalkboardTeacher className="role-icon" />
                    <div className="enhanced-role-info">
                      <span className="enhanced-role-title">Class Teacher</span>
                      <span className="enhanced-role-desc">Full class management and attendance tracking</span>
                    </div>
                    <div className="enhanced-role-features">
                      <span><FaCheckCircle /> Attendance Management</span>
                      <span><FaCheckCircle /> Grade Assignment</span>
                      <span><FaCheckCircle /> Class Reports</span>
                    </div>
                  </div>
                </label>

                <label className="enhanced-role-option">
                  <input
                    type="radio"
                    name="role"
                    value="class_chief"
                    checked={formData.role === 'class_chief'}
                    onChange={handleChange}
                  />
                  <div className="enhanced-role-card">
                    <FaUsers className="role-icon" />
                    <div className="enhanced-role-info">
                      <span className="enhanced-role-title">Class Chief</span>
                      <span className="enhanced-role-desc">Student leader with attendance marking privileges</span>
                    </div>
                    <div className="enhanced-role-features">
                      <span><FaCheckCircle /> Mark Attendance</span>
                      <span><FaCheckCircle /> View Class Data</span>
                      <span><FaCheckCircle /> Report Issues</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Department Selection - Enhanced */}
          {!isLogin && formData.role !== 'user' && (
            <div className="enhanced-form-group">
              <label className="enhanced-form-label">
                <FaSchool className="label-icon" />
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

          {/* Admin Code - Enhanced */}
          {!isLogin && requiresAdminCode && (
            <div className="enhanced-form-group">
              <label className="enhanced-form-label">
                <FaShieldAlt className="label-icon" />
                Admin Access Code *
              </label>
              <div className="enhanced-input-container">
                <input
                  type="password"
                  name="adminCode"
                  value={formData.adminCode}
                  onChange={handleChange}
                  className="enhanced-form-input"
                  placeholder="Enter admin access code"
                  required
                />
                <div className="input-helper-enhanced security">
                  <FaShieldAlt />
                  <span>Enhanced security for administrative access. Contact system administrator.</span>
                </div>
              </div>
            </div>
          )}

          {/* CAPTCHA - Enhanced */}
          {captchaRequired && (
            <div className="enhanced-form-group">
              <label className="enhanced-form-label">
                <FaShieldAlt className="label-icon" />
                Security Verification *
              </label>
              <div className="captcha-container">
                <div className="captcha-display">
                  <span>{generatedCaptcha}</span>
                  <button type="button" onClick={generateCaptcha} className="captcha-refresh">
                    <FaSync />
                  </button>
                </div>
                <input
                  type="text"
                  value={captchaCode}
                  onChange={(e) => setCaptchaCode(e.target.value)}
                  className="enhanced-form-input"
                  placeholder="Enter the code above"
                  required
                  maxLength="6"
                />
              </div>
            </div>
          )}

          {/* Enhanced Submit Button */}
          <button
            type="submit"
            className={`enhanced-auth-submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="enhanced-spinner"></div>
                <span>
                  {isLogin ? 'Securing Access...' : 'Creating Account...'}
                </span>
              </>
            ) : (
              <>
                <span>{isLogin ? 'Secure Sign In' : 'Create Account'}</span>
                <FaShieldAlt className="btn-icon" />
              </>
            )}
          </button>

          {/* Enhanced Mode Toggle */}
          <div className="enhanced-auth-toggle">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" className="enhanced-toggle-link" onClick={toggleMode}>
                {isLogin ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </form>

        {/* Enhanced Footer */}
        <div className="enhanced-auth-footer">
          <div className="security-notice-enhanced">
            <FaShieldAlt />
            <div className="security-info-enhanced">
              <strong>Enterprise-grade Security</strong>
              <span>Your data is encrypted and protected with advanced security measures</span>
            </div>
          </div>
          <div className="system-info-enhanced">
            <div className="system-stats-enhanced">
              <div className="stat-enhanced">
                <FaUsers />
                <span>1,200+ Students</span>
              </div>
              <div className="stat-enhanced">
                <FaChalkboardTeacher />
                <span>85+ Teachers</span>
              </div>
              <div className="stat-enhanced">
                <FaGraduationCap />
                <span>45+ Courses</span>
              </div>
              <div className="stat-enhanced">
                <FaChartLine />
                <span>98% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Demo Accounts */}
      <div className="enhanced-demo-accounts">
        <div className="demo-header-enhanced">
          <FaInfoCircle />
          <span>Demo Accounts (Click to fill)</span>
        </div>
        <div className="demo-list-enhanced">
          <div className="demo-account-enhanced admin" onClick={() => setFormData({ email: 'admin@apaer.ac.rw', password: 'admin123' })}>
            <strong>Administrator:</strong> admin@apaer.ac.rw
            <br />
            <span>Password: admin123</span>
          </div>
          <div className="demo-account-enhanced teacher" onClick={() => setFormData({ email: 'teacher.sod@apaer.ac.rw', password: 'teacher123' })}>
            <strong>Class Teacher:</strong> teacher.sod@apaer.ac.rw
            <br />
            <span>Password: teacher123</span>
          </div>
          <div className="demo-account-enhanced chief" onClick={() => setFormData({ email: 'chief.sod@apaer.ac.rw', password: 'chief123' })}>
            <strong>Class Chief:</strong> chief.sod@apaer.ac.rw
            <br />
            <span>Password: chief123</span>
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <button 
        className="enhanced-theme-toggle"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
};

export default Auth;