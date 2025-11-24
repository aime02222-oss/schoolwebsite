import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaArrowRight,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaCalendarAlt,
  FaImages,
  FaShareAlt
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Quick links data
  const quickLinks = {
    school: [
      { name: 'Student Login', path: '/login', icon: <FaArrowRight /> },
      { name: 'New Registration', path: '/registration', icon: <FaArrowRight /> },
      { name: 'Academic Calendar', path: '/calendar', icon: <FaArrowRight /> },
      { name: 'Student Portal', path: '/portal', icon: <FaArrowRight /> }
    ],
    academic: [
      { name: 'Class Timetable', path: '/timetable', icon: <FaArrowRight /> },
      { name: 'Apply Now', path: '/apply', icon: <FaArrowRight /> },
      { name: 'Courses & Programs', path: '/courses', icon: <FaArrowRight /> },
      { name: 'Faculty Directory', path: '/faculty', icon: <FaArrowRight /> }
    ],
    events: [
      { name: 'Photo Gallery', path: '/gallery', icon: <FaArrowRight /> },
      { name: 'Upcoming Events', path: '/events', icon: <FaArrowRight /> },
      { name: 'News & Announcements', path: '/news', icon: <FaArrowRight /> },
      { name: 'Campus Tour', path: '/tour', icon: <FaArrowRight /> }
    ]
  };

  // Social media data
  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebook />,
      url: 'https://facebook.com/apaerinstitute',
      color: '#1877F2'
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      url: 'https://twitter.com/apaerinstitute',
      color: '#1DA1F2'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://instagram.com/apaerinstitute',
      color: '#E4405F'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://linkedin.com/company/apaerinstitute',
      color: '#0A66C2'
    },
    {
      name: 'YouTube',
      icon: <FaYoutube />,
      url: 'https://youtube.com/apaerinstitute',
      color: '#FF0000'
    }
  ];

  // Contact information
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'Kigali, Rwanda',
      details: 'KG 123 St, Kicukiro District'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+250 788 123 456',
      details: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'info@apaerinstitute.edu.rw',
      details: 'Admissions: admissions@apaerinstitute.edu.rw'
    }
  ];

  return (
    <footer className="modern-footer">
      {/* Decorative Top Border */}
      <div className="footer-top-accent"></div>
      
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          {/* School Section */}
          <div className="footer-section">
            <div className="section-header">
              <div className="section-icon">
                <div className="icon-wrapper">
                  <FaGraduationCap />
                </div>
              </div>
              <div className="section-title-content">
                <h3 className="section-title">School Portal</h3>
                <p className="section-subtitle">Access student resources</p>
              </div>
            </div>
            <ul className="footer-links">
              {quickLinks.school.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="footer-link">
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Section */}
          <div className="footer-section">
            <div className="section-header">
              <div className="section-icon">
                <div className="icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  </svg>
                </div>
              </div>
              <div className="section-title-content">
                <h3 className="section-title">Academic</h3>
                <p className="section-subtitle">Programs & admissions</p>
              </div>
            </div>
            <ul className="footer-links">
              {quickLinks.academic.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="footer-link">
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Events Section */}
          <div className="footer-section">
            <div className="section-header">
              <div className="section-icon">
                <div className="icon-wrapper">
                  <FaCalendarAlt />
                </div>
              </div>
              <div className="section-title-content">
                <h3 className="section-title">Events & Media</h3>
                <p className="section-subtitle">Campus life & news</p>
              </div>
            </div>
            <ul className="footer-links">
              {quickLinks.events.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="footer-link">
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Social Media Section */}
          <div className="footer-section social-section-enhanced">
            <div className="section-header">
              <div className="section-icon">
                <div className="icon-wrapper">
                  <FaShareAlt />
                </div>
              </div>
              <div className="section-title-content">
                <h3 className="section-title">Connect With Us</h3>
                <p className="section-subtitle">Stay updated on social media</p>
              </div>
            </div>
            
            <div className="social-content">
              <p className="social-description">
                Follow us for the latest news, events, and campus updates
              </p>
              
              {/* Social Links Grid */}
              <div className="social-grid-enhanced">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className={`social-card social-${social.name.toLowerCase()}`}
                    aria-label={`Follow us on ${social.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="social-card-inner">
                      <div className="social-icon-container">
                        <div className="social-platform-icon">
                          {social.icon}
                        </div>
                        <div className="social-external-indicator">
                          <FaExternalLinkAlt />
                        </div>
                      </div>
                      <span className="social-platform-name">{social.name}</span>
                      <div className="social-follower-count">
                        {index === 0 && '15K+ followers'}
                        {index === 1 && '8K+ followers'}
                        {index === 2 && '12K+ followers'}
                        {index === 3 && '5K+ followers'}
                        {index === 4 && '20K+ subscribers'}
                      </div>
                    </div>
                    <div className="social-hover-glow"></div>
                  </a>
                ))}
              </div>

              {/* Newsletter Subscription */}
              <div className="newsletter-section">
                <h4 className="newsletter-title">Stay Updated</h4>
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="newsletter-input"
                  />
                  <button className="newsletter-button">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Section */}
          <div className="footer-section contact-section-enhanced">
            <div className="section-header">
              <div className="section-icon">
                <div className="icon-wrapper">
                  <FaEnvelope />
                </div>
              </div>
              <div className="section-title-content">
                <h3 className="section-title">Contact Info</h3>
                <p className="section-subtitle">Get in touch with us</p>
              </div>
            </div>
            
            <div className="contact-info-enhanced">
              {contactInfo.map((contact, index) => (
                <div key={index} className="contact-card">
                  <div className="contact-icon-wrapper">
                    {contact.icon}
                  </div>
                  <div className="contact-details-enhanced">
                    <span className="contact-label">{contact.label}</span>
                    <span className="contact-value">{contact.value}</span>
                    <span className="contact-additional">{contact.details}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="action-buttons">
              <button className="action-button primary">
                <FaPhone />
                Call Now
              </button>
              <button className="action-button secondary">
                <FaEnvelope />
                Email Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="footer-brand">
              <div className="brand-logo">
                <FaGraduationCap />
              </div>
              <div className="brand-info">
                <h4 className="institute-name">Apaer Institute</h4>
                <p className="institute-motto">Excellence in Education Since 2010</p>
              </div>
            </div>
            
            <div className="copyright-content">
              <div className="copyright-text">
                <p>&copy; {currentYear} Apaer Institute. All rights reserved.</p>
                <span className="copyright-extra">Proudly serving the community</span>
              </div>
            </div>
            
            <div className="footer-legal-enhanced">
              <a href="/privacy" className="legal-link">Privacy Policy</a>
              <a href="/terms" className="legal-link">Terms of Service</a>
              <a href="/sitemap" className="legal-link">Sitemap</a>
              <a href="/accessibility" className="legal-link">Accessibility</a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="footer-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shape shape-4"></div>
      </div>
    </footer>
  );
};

export default Footer;