import React, { useRef, useState, useEffect } from 'react';
import ContactNav from '../components/Contact/ContactNav';
import CurrentStudentForm from '../components/Contact/CurrentStudentForm';
import JoinUsForm from '../components/Contact/JoinUsForm';
import Form from '../components/Contact/Form';
import TeacherForm from '../components/Contact/TeacherForm';
import Card from '../components/Contact/Card';  
import './contact.css';

const Contact = () => {
  const [activeSection, setActiveSection] = useState('currentStudent');
  const [isScrolling, setIsScrolling] = useState(false);
  const [submissionStats, setSubmissionStats] = useState({});

  // Enhanced contact sections with admin integration
  const contactSections = [
    {
      id: 'currentStudent',
      label: 'Current Student',
      description: 'Get support and assistance for current students',
      icon: '👨‍🎓',
      component: CurrentStudentForm,
      priority: 1,
      storageKey: 'apaer_current_student_submissions',
      adminTab: 'problems'
    },
    {
      id: 'joinUs',
      label: 'Join Our Community',
      description: 'Become part of Apaer Institute family',
      icon: '🤝',
      component: JoinUsForm,
      priority: 2,
      storageKey: 'apaer_join_us_submissions',
      adminTab: 'registrations'
    },
    {
      id: 'parent',
      label: 'Parent Inquiry',
      description: 'Information and support for parents',
      icon: '👨‍👩‍👧‍👦',
      component: Form,
      priority: 3,
      storageKey: 'apaer_parent_submissions',
      adminTab: 'parentInquiries'
    },
    {
      id: 'teacher',
      label: 'Teaching Opportunities',
      description: 'Join our team of educators',
      icon: '👩‍🏫',
      component: TeacherForm,
      priority: 4,
      storageKey: 'apaer_teacher_submissions',
      adminTab: 'teacherInquiries'
    },
    {
      id: 'reportCard',
      label: 'Academic Records',
      description: 'Access and manage student records',
      icon: '📊',
      component: Card,
      priority: 5,
      storageKey: 'apaer_report_card_requests',
      adminTab: 'academicRecords'
    }
  ];

  // Create refs for all sections
  const sectionRefs = useRef(
    contactSections.reduce((acc, section) => {
      acc[section.id] = React.createRef();
      return acc;
    }, {})
  );

  // Enhanced scroll function with analytics
  const scrollToSection = (sectionId) => {
    if (isScrolling) return;

    setIsScrolling(true);
    setActiveSection(sectionId);

    // Track section views for analytics
    const section = contactSections.find(s => s.id === sectionId);
    if (section) {
      logInteraction('section_view', {
        sectionId: sectionId,
        sectionName: section.label,
        timestamp: new Date().toISOString()
      });
    }

    const sectionRef = sectionRefs.current[sectionId];
    if (sectionRef?.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }

    setTimeout(() => setIsScrolling(false), 1000);
  };

  // Analytics logging function
  const logInteraction = (action, data) => {
    const interaction = {
      action,
      ...data,
      page: 'contact',
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Store in localStorage for admin dashboard
    const existingLogs = JSON.parse(localStorage.getItem('apaer_contact_analytics') || '[]');
    existingLogs.push(interaction);
    localStorage.setItem('apaer_contact_analytics', JSON.stringify(existingLogs.slice(-1000)));
  };

  // Enhanced scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const scrollPosition = window.scrollY + 100;
      let currentActive = activeSection;

      for (const section of contactSections) {
        const element = sectionRefs.current[section.id]?.current;
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentActive = section.id;
            break;
          }
        }
      }

      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, isScrolling]);

  // Load submission statistics for display
  useEffect(() => {
    const loadStats = () => {
      const stats = {};
      contactSections.forEach(section => {
        const submissions = JSON.parse(localStorage.getItem(section.storageKey) || '[]');
        stats[section.id] = {
          total: submissions.length,
          pending: submissions.filter(s => s.status === 'pending' || s.status === 'new').length,
          resolved: submissions.filter(s => s.status === 'resolved' || s.status === 'completed').length
        };
      });
      setSubmissionStats(stats);
    };

    loadStats();
    
    // Update stats when storage changes
    const handleStorageChange = () => loadStats();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const sortedSections = [...contactSections].sort((a, b) => a.priority - b.priority);

  // Calculate total stats for display
  const totalSubmissions = Object.values(submissionStats).reduce((sum, stat) => sum + stat.total, 0);
  const totalPending = Object.values(submissionStats).reduce((sum, stat) => sum + stat.pending, 0);
  const totalResolved = Object.values(submissionStats).reduce((sum, stat) => sum + stat.resolved, 0);

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="hero-badge">Get in Touch</div>
          <h1 className="contact-main-title">
            Connect with <span className="text-gradient">Apaer Institute</span>
          </h1>
          <p className="contact-subtitle">
            We're here to help you with any questions, concerns, or opportunities. 
            Choose the category that best fits your needs and let's start the conversation.
          </p>
          
          {/* Enhanced Stats with Real Data */}
          <div className="contact-stats">
            <div className="stat-item">
              <div className="stat-number">24h</div>
              <div className="stat-label">Avg Response Time</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{totalResolved}+</div>
              <div className="stat-label">Issues Resolved</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{contactSections.length}</div>
              <div className="stat-label">Contact Channels</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{totalSubmissions}+</div>
              <div className="stat-label">Total Submissions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="contact-container">
        {/* Sidebar */}
        <aside className="contact-sidebar">
          <ContactNav 
            scrollToSection={scrollToSection} 
            sections={sectionRefs.current}
            activeSection={activeSection}
            sectionConfig={sortedSections}
          />
          
          {/* Quick Contact Info */}
          <div className="quick-contact-info">
            <h3>Quick Contact</h3>
            <div className="contact-method">
              <span className="contact-icon">📞</span>
              <div>
                <div className="method-label">Phone</div>
                <div className="method-value">+250 788 123 456</div>
              </div>
            </div>
            <div className="contact-method">
              <span className="contact-icon">✉️</span>
              <div>
                <div className="method-label">Email</div>
                <div className="method-value">info@apaer.ac.rw</div>
              </div>
            </div>
            <div className="contact-method">
              <span className="contact-icon">📍</span>
              <div>
                <div className="method-label">Address</div>
                <div className="method-value">KG 123 St, Kigali, Rwanda</div>
              </div>
            </div>

            {/* Admin Quick Access */}
            <div className="admin-quick-access">
              <h4>Admin Portal</h4>
              <p>Manage submissions and view analytics</p>
              <button 
                className="admin-access-btn"
                onClick={() => window.location.href = '/admin'}
              >
                📊 Go to Admin Dashboard
              </button>
              
              {/* Quick Stats */}
              <div className="admin-stats">
                <div className="admin-stat">
                  <span className="stat-value">{totalPending}</span>
                  <span className="stat-label">Pending</span>
                </div>
                <div className="admin-stat">
                  <span className="stat-value">{totalSubmissions}</span>
                  <span className="stat-label">Total</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Sections */}
        <main className="contact-content">
          <div className="contact-sections">
            {sortedSections.map((section) => {
              const SectionComponent = section.component;
              const stats = submissionStats[section.id] || { total: 0, pending: 0, resolved: 0 };
              
              return (
                <section
                  key={section.id}
                  ref={sectionRefs.current[section.id]}
                  id={`contact-${section.id}`}
                  className={`contact-section ${activeSection === section.id ? 'active' : ''}`}
                >
                  <div className="section-header">
                    <div className="section-icon">{section.icon}</div>
                    <div className="section-title-content">
                      <h2 className="section-title">{section.label}</h2>
                      <p className="section-description">{section.description}</p>
                    </div>
                    
                    {/* Submission Stats Badge */}
                    <div className="section-stats">
                      <div className="stat-badge total">
                        <span className="stat-count">{stats.total}</span>
                        <span className="stat-label">Total</span>
                      </div>
                      {stats.pending > 0 && (
                        <div className="stat-badge pending">
                          <span className="stat-count">{stats.pending}</span>
                          <span className="stat-label">Pending</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="section-content">
                    <SectionComponent 
                      onSubmissionSuccess={(data) => {
                        // Enhanced success handling with analytics
                        logInteraction('form_submission', {
                          sectionId: section.id,
                          formType: section.label,
                          submissionId: data.id,
                          timestamp: new Date().toISOString()
                        });
                      }}
                    />
                  </div>
                </section>
              );
            })}
          </div>

          {/* Emergency Contact Banner */}
          <div className="emergency-contact-banner">
            <div className="emergency-content">
              <div className="emergency-icon">🚨</div>
              <div className="emergency-text">
                <h3>Emergency Contact</h3>
                <p>For urgent matters outside office hours, call our emergency line</p>
              </div>
              <div className="emergency-contact">
                <div className="emergency-number">+250 788 911 911</div>
                <div className="emergency-note">Available 24/7</div>
              </div>
            </div>
          </div>

          {/* System Status Banner */}
          <div className="system-status-banner">
            <div className="status-content">
              <div className="status-indicator online"></div>
              <div className="status-text">
                <strong>System Status: Operational</strong>
                <span>All contact forms are working properly</span>
              </div>
              <div className="status-actions">
                <button 
                  className="status-btn"
                  onClick={() => window.location.reload()}
                >
                  🔄 Refresh
                </button>
                <button 
                  className="status-btn"
                  onClick={() => window.location.href = '/admin'}
                >
                  📊 View Analytics
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contact;