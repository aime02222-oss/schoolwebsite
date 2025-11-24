import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaSignOutAlt, 
  FaCog, 
  FaBell,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaShieldAlt,
  FaTachometerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause
} from 'react-icons/fa';
import schoolLogo from '../assets/logo.png';
import './Navbar.css';

// Import your slideshow images - replace these with your actual images
import slide1 from '../assets/image.jpg';
import slide2 from '../assets/image2.jpg';
import slide3 from '../assets/image3.jpg';
import slide4 from '../assets/image4.jpg';
import slide5 from '../assets/image5.jpg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isSlideshowVisible, setIsSlideshowVisible] = useState(true);
  const [animationKey, setAnimationKey] = useState(0); // Force re-render on slide change

  // Sample slideshow data - replace with your actual content
  const slides = [
    {
      id: 1,
      image: slide1,
      title: "Welcome to APAER Institute",
      subtitle: "Excellence in Education Since 2005",
      description: "Where future leaders are nurtured and developed",
      ctaText: "Discover More",
      ctaLink: "/about"
    },
    {
      id: 2,
      image: slide2,
      title: "Modern Facilities",
      subtitle: "State-of-the-Art Infrastructure",
      description: "Equipped with the latest technology and learning resources",
      ctaText: "View Facilities",
      ctaLink: "/academic"
    },
    {
      id: 3,
      image: slide3,
      title: "Academic Excellence",
      subtitle: "Proven Track Record",
      description: "Consistently producing top performers in national examinations",
      ctaText: "Our Programs",
      ctaLink: "/academic"
    },
    {
      id: 4,
      image: slide4,
      title: "Student Life",
      subtitle: "Holistic Development",
      description: "Balancing academics with sports, arts, and community service",
      ctaText: "Explore Life",
      ctaLink: "/schoollife"
    },
    {
      id: 5,
      image: slide5,
      title: "Admissions Open",
      subtitle: "Enroll for 2024",
      description: "Limited slots available for the upcoming academic year",
      ctaText: "Apply Now",
      ctaLink: "/admissions"
    }
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('apaer_current_user') || 'null');
    setCurrentUser(user);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  // Slideshow auto-play effect
  useEffect(() => {
    let interval;
    if (isAutoPlay && isSlideshowVisible) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, isSlideshowVisible, slides.length]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('apaer_current_user');
    localStorage.removeItem('apaer_token');
    setCurrentUser(null);
    setIsUserMenuOpen(false);
    navigate('/');
    window.location.reload();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAnimationKey(prev => prev + 1); // Force animation reset
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAnimationKey(prev => prev + 1); // Force animation reset
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAnimationKey(prev => prev + 1); // Force animation reset
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const toggleSlideshow = () => {
    setIsSlideshowVisible(!isSlideshowVisible);
  };

  // Function to split text into words for animation
  const splitTextIntoWords = (text) => {
    return text.split(' ').map((word, index) => ({
      word,
      delay: index * 0.1 // Stagger delay for each word
    }));
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/academic', label: 'Academic' },
    { path: '/schoollife', label: 'School Life' },
    { path: '/contact', label: 'Contact' },
    { path: '/payment', label: 'Payment' },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Brand Section */}
          <Link to="/" className="navbar-brand">
            <div className="brand-content">
              <div className="logo-container">
                <img
                  src={schoolLogo}
                  alt="Apaer Institute Logo"
                  className="navbar-logo"
                />
                <div className="logo-glow"></div>
              </div>
              <div className="school-info">
                <h1 className="institute-name">APAER Institute</h1>
                <p className="institute-location">Kigali, Rwanda</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-center">
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.path} className="nav-item">
                  <Link
                    to={link.path}
                    className={`nav-link ${
                      isActive(link.path) ? 'nav-link-active' : ''
                    }`}
                  >
                    {link.label}
                    <span className="nav-link-underline"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - User Menu */}
          <div className="nav-right">
            {/* User Menu */}
            {currentUser ? (
              <div className="user-menu-container">
                <button 
                  className="user-menu-trigger"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <img 
                    src={currentUser.avatar || '/images/default-avatar.png'} 
                    alt={currentUser.fullName}
                    className="user-avatar"
                  />
                  <span className="user-name">{currentUser.fullName}</span>
                  <FaChevronDown className={`chevron ${isUserMenuOpen ? 'open' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <img 
                        src={currentUser.avatar || '/images/default-avatar.png'} 
                        alt={currentUser.fullName}
                        className="dropdown-avatar"
                      />
                      <div className="user-info">
                        <div className="user-display-name">{currentUser.fullName}</div>
                        <div className="user-email">{currentUser.email}</div>
                        <div className="user-role">
                          <FaShieldAlt />
                          <span>{currentUser.role === 'admin' ? 'Administrator' : 'User'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="dropdown-divider"></div>

                    {currentUser.role === 'admin' && (
                      <Link 
                        to="/admin/dashboard" 
                        className="dropdown-item"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FaTachometerAlt />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <Link 
                      to="/profile" 
                      className="dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaUser />
                      <span>My Profile</span>
                    </Link>

                    <Link 
                      to="/settings" 
                      className="dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaCog />
                      <span>Settings</span>
                    </Link>

                    <div className="dropdown-divider"></div>

                    <button 
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/auth" className="auth-link signin">
                  Sign In
                </Link>
                <Link to="/auth" className="auth-link signup">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div
                className={`hamburger ${
                  isMobileMenuOpen ? 'hamburger-active' : ''
                }`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}>
          <div
            className="mobile-nav-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="mobile-nav-content">
            <div className="mobile-nav-header">
              <div className="mobile-brand">
                <img src={schoolLogo} alt="Apaer Institute" className="mobile-logo" />
                <div>
                  <h3>APAER Institute</h3>
                  <p>Kigali, Rwanda</p>
                </div>
              </div>
              <button
                className="mobile-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <ul className="mobile-nav-links">
              {navLinks.map((link) => (
                <li key={link.path} className="mobile-nav-item">
                  <Link
                    to={link.path}
                    className={`mobile-nav-link ${
                      isActive(link.path) ? 'mobile-nav-link-active' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile User Section */}
            <div className="mobile-user-section">
              {currentUser ? (
                <>
                  <div className="mobile-user-info">
                    <img 
                      src={currentUser.avatar || '/images/default-avatar.png'} 
                      alt={currentUser.fullName}
                      className="mobile-user-avatar"
                    />
                    <div className="mobile-user-details">
                      <div className="mobile-user-name">{currentUser.fullName}</div>
                      <div className="mobile-user-email">{currentUser.email}</div>
                    </div>
                  </div>
                  <div className="mobile-user-actions">
                    {currentUser.role === 'admin' && (
                      <Link 
                        to="/admin/dashboard" 
                        className="mobile-user-action"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaTachometerAlt />
                        Admin Dashboard
                      </Link>
                    )}
                    <Link 
                      to="/profile" 
                      className="mobile-user-action"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaUser />
                      My Profile
                    </Link>
                    <button 
                      className="mobile-user-action logout"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt />
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="mobile-auth-buttons">
                  <Link
                    to="/auth"
                    className="mobile-auth-link signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth"
                    className="mobile-auth-link signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="navbar-spacer"></div>

      {/* Modern Slideshow Section */}
      {isSlideshowVisible && location.pathname === '/' && (
        <section className="slideshow-section">
          <div className="slideshow-container">
            {/* Slides */}
            <div className="slides-wrapper">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`slide ${index === currentSlide ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="slide-overlay"></div>
                  <div className="slide-content">
                    <div className="slide-text">
                      {/* Animated Title */}
                      <h2 className="slide-title" key={`title-${animationKey}`}>
                        {splitTextIntoWords(slide.title).map((item, wordIndex) => (
                          <span
                            key={wordIndex}
                            className="word"
                            style={{ animationDelay: `${0.5 + item.delay}s` }}
                          >
                            {item.word}
                            {wordIndex < slide.title.split(' ').length - 1 ? ' ' : ''}
                          </span>
                        ))}
                      </h2>
                      
                      {/* Animated Subtitle */}
                      <p className="slide-subtitle" key={`subtitle-${animationKey}`}>
                        {splitTextIntoWords(slide.subtitle).map((item, wordIndex) => (
                          <span
                            key={wordIndex}
                            className="word"
                            style={{ animationDelay: `${1.0 + item.delay}s` }}
                          >
                            {item.word}
                            {wordIndex < slide.subtitle.split(' ').length - 1 ? ' ' : ''}
                          </span>
                        ))}
                      </p>
                      
                      {/* Animated Description */}
                      <p className="slide-description" key={`description-${animationKey}`}>
                        {splitTextIntoWords(slide.description).map((item, wordIndex) => (
                          <span
                            key={wordIndex}
                            className="word"
                            style={{ animationDelay: `${1.5 + item.delay}s` }}
                          >
                            {item.word}
                            {wordIndex < slide.description.split(' ').length - 1 ? ' ' : ''}
                          </span>
                        ))}
                      </p>
                      
                      {/* Animated CTA Button */}
                      <Link 
                        to={slide.ctaLink} 
                        className="slide-cta"
                        key={`cta-${animationKey}`}
                        style={{ animationDelay: '2.2s' }}
                      >
                        {slide.ctaText}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button className="slide-nav slide-prev" onClick={prevSlide} aria-label="Previous slide">
              <FaChevronLeft />
            </button>
            <button className="slide-nav slide-next" onClick={nextSlide} aria-label="Next slide">
              <FaChevronRight />
            </button>

            {/* Slide Indicators */}
            <div className="slide-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Slideshow Controls */}
            <div className="slideshow-controls">
              <button 
                className="control-btn" 
                onClick={toggleAutoPlay}
                aria-label={isAutoPlay ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isAutoPlay ? <FaPause /> : <FaPlay />}
              </button>
              <button 
                className="control-btn" 
                onClick={toggleSlideshow}
                aria-label="Hide slideshow"
              >
                <FaTimes />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="slide-progress">
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${((currentSlide + 1) / slides.length) * 100}%` 
                }}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Navbar;