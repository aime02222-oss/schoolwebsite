import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHistory,
  FaBullseye,
  FaEye,
  FaGraduationCap,
  FaDollarSign,
  FaUsers,
  FaUserTie,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaDownload,
  FaArrowRight,
  FaAward,
  FaChartLine,
  FaHandshake,
  FaBook,
  FaUniversity,
  FaRocket,
  FaStar,
  FaHeart,
  FaShieldAlt,
  FaLightbulb,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaQuoteLeft,
  FaPlay,
  FaPause
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  const [activeSection, setActiveSection] = useState('mission');
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const mainContentRef = useRef(null);

  // Mission, Vision, and Values
  const missionVision = {
    mission: {
      title: "Our Mission",
      icon: FaBullseye,
      description: "To provide quality education that empowers students with knowledge, skills, and values to excel in their chosen paths and contribute positively to society.",
      points: [
        "Deliver comprehensive academic and vocational training",
        "Foster critical thinking and innovation",
        "Develop responsible global citizens",
        "Promote lifelong learning and personal growth"
      ]
    },
    vision: {
      title: "Our Vision",
      icon: FaEye,
      description: "To be a leading educational institution recognized for academic excellence, innovation, and producing well-rounded individuals who drive positive change in their communities.",
      points: [
        "Center of excellence in O-Level and TVET education",
        "Hub for innovation and technological advancement",
        "Model for sustainable educational practices",
        "Source of future leaders and change-makers"
      ]
    },
    values: {
      title: "Our Values",
      icon: FaHeart,
      description: "Guiding principles that shape our community and educational approach.",
      points: [
        { name: "Excellence", icon: FaStar, description: "Striving for the highest standards in everything we do" },
        { name: "Integrity", icon: FaShieldAlt, description: "Upholding honesty and ethical conduct" },
        { name: "Innovation", icon: FaLightbulb, description: "Embracing creativity and forward-thinking" },
        { name: "Community", icon: FaUsers, description: "Building strong, supportive relationships" }
      ]
    }
  };

  // Admission and Fees Information
  const admissions = {
    requirements: [
      "Completed application form",
      "Original birth certificate",
      "Previous school transcripts",
      "Two recent passport photos",
      "Medical fitness certificate",
      "Recommendation letter from previous school"
    ],
    programs: [
      {
        name: "Ordinary Level (O-Level)",
        duration: "3 Years",
        subjects: "Sciences, Humanities, Languages, Mathematics",
        requirements: "Primary School Certificate",
        features: ["Comprehensive curriculum", "Experienced teachers", "Modern laboratories", "Career guidance"]
      },
      {
        name: "TVET Programs",
        duration: "1-3 Years",
        subjects: "Software Development, Tourism, Masonry, Carpentry",
        requirements: "O-Level Certificate or equivalent",
        features: ["Hands-on training", "Industry partnerships", "Internship opportunities", "Job placement support"]
      }
    ],
    fees: {
      oLevel: {
        tuition: "500,000 RWF per term",
        registration: "50,000 RWF (one-time)",
        materials: "100,000 RWF per year",
        boarding: "300,000 RWF per term (optional)"
      },
      tvet: {
        tuition: "600,000 RWF per term",
        registration: "50,000 RWF (one-time)",
        materials: "150,000 RWF per year",
        practical: "200,000 RWF per year"
      },
      scholarships: [
        {
          name: "Academic Excellence Scholarship",
          coverage: "Up to 100% tuition",
          requirements: "Top 5% in entrance exam"
        },
        {
          name: "Sports Talent Scholarship",
          coverage: "Up to 75% tuition",
          requirements: "National level achievement"
        },
        {
          name: "Arts and Culture Scholarship",
          coverage: "Up to 50% tuition", 
          requirements: "Portfolio and audition"
        },
        {
          name: "Community Service Scholarship",
          coverage: "Up to 25% tuition",
          requirements: "Proven community involvement"
        }
      ]
    },
    documents: [
      {
        name: "Admission Requirements PDF",
        url: "/documents/admission-requirements.pdf",
        size: "2.1 MB",
        updated: "2024-01-15",
        downloads: 1245
      },
      {
        name: "Fee Structure 2024",
        url: "/documents/fee-structure-2024.pdf",
        size: "1.8 MB",
        updated: "2024-01-10",
        downloads: 987
      },
      {
        name: "Scholarship Application Form",
        url: "/documents/scholarship-application.pdf",
        size: "1.2 MB",
        updated: "2024-01-08",
        downloads: 756
      }
    ]
  };

  // School History Timeline
  const historyTimeline = [
    {
      year: "1995",
      title: "Foundation",
      description: "Apaer Institute was established with a vision to provide quality education to the local community.",
      image: "/images/history/foundation.jpg",
      milestones: ["Started with 50 students", "2 classrooms", "5 teaching staff"],
      achievements: ["First private school in region", "Community support initiative"]
    },
    {
      year: "2000",
      title: "First Graduation",
      description: "Celebrated our first graduating class with 25 students completing O-Level education.",
      image: "/images/history/first-graduation.jpg",
      milestones: ["First graduation ceremony", "25 graduates", "90% pass rate"],
      achievements: ["National recognition", "Alumni association formed"]
    },
    {
      year: "2005",
      title: "TVET Program Launch",
      description: "Expanded our offerings to include Technical and Vocational Education Training programs.",
      image: "/images/history/tvet-launch.jpg",
      milestones: ["3 TVET programs", "New workshops", "Industry partnerships"],
      achievements: ["First TVET accreditation", "Industry partnerships established"]
    },
    {
      year: "2010",
      title: "Campus Expansion",
      description: "Opened new campus facilities including science labs and computer centers.",
      image: "/images/history/campus-expansion.jpg",
      milestones: ["New science block", "Computer lab", "Library expansion"],
      achievements: ["State-of-the-art facilities", "Increased capacity to 500 students"]
    },
    {
      year: "2015",
      title: "20th Anniversary",
      description: "Celebrated 20 years of educational excellence and community impact.",
      image: "/images/history/20th-anniversary.jpg",
      milestones: ["2,000+ alumni", "National recognition", "Community outreach programs"],
      achievements: ["Presidential award", "International partnerships"]
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Implemented comprehensive digital learning platforms and infrastructure.",
      image: "/images/history/digital-transformation.jpg",
      milestones: ["Online learning", "Digital resources", "Smart classrooms"],
      achievements: ["E-learning platform", "Digital literacy program"]
    },
    {
      year: "2024",
      title: "Modern Era",
      description: "Continuing our legacy of excellence with innovative educational approaches.",
      image: "/images/history/modern-era.jpg",
      milestones: ["AI integration", "Global partnerships", "Sustainable campus"],
      achievements: ["Green campus initiative", "Research center establishment"]
    }
  ];

  // Community Impact
  const communityImpact = [
    {
      area: "Education Access",
      impact: "5,000+ students educated",
      description: "Providing quality education to students from diverse backgrounds",
      icon: FaGraduationCap,
      growth: "+15% yearly"
    },
    {
      area: "Employment",
      impact: "85% employment rate",
      description: "Graduates successfully employed or pursuing higher education",
      icon: FaUsers,
      growth: "+8% since 2020"
    },
    {
      area: "Skills Development",
      impact: "2,000+ TVET graduates",
      description: "Technical skills training for local industry needs",
      icon: FaHandshake,
      growth: "+25% enrollment"
    },
    {
      area: "Community Projects",
      impact: "50+ projects completed",
      description: "Student-led community service initiatives",
      icon: FaHeart,
      growth: "5 new projects yearly"
    }
  ];

  // Administration Team
  const administration = [
    {
      name: "Dr. Jean Bosco Uwimana",
      position: "Head of School",
      image: "/images/administration/headmaster.jpg",
      education: "PhD in Educational Leadership, University of Rwanda",
      experience: "15+ years in educational administration",
      email: "headmaster@apaeer.ac.rw",
      phone: "+250 788 123 456",
      achievements: ["Education Excellence Award 2020", "Published 3 research papers"],
      quote: "Education is the most powerful tool for transforming communities."
    },
    {
      name: "Mrs. Marie Claire Uwase",
      position: "Deputy Head Academics",
      image: "/images/administration/deputy-academic.jpg",
      education: "Masters in Curriculum Development, Makerere University",
      experience: "12 years in academic planning",
      email: "academic@apaeer.ac.rw",
      phone: "+250 788 123 457",
      achievements: ["Curriculum Innovation Award", "Teacher Training Program Lead"],
      quote: "Every student has unique potential waiting to be discovered."
    },
    {
      name: "Mr. Patrick Ndayisaba",
      position: "TVET Coordinator",
      image: "/images/administration/tvet-coordinator.jpg",
      education: "Masters in Technical Education, Kigali Institute",
      experience: "10 years in vocational training",
      email: "tvet@apaeer.ac.rw",
      phone: "+250 788 123 458",
      achievements: ["Industry Partnership Award", "Skills Development Champion"],
      quote: "Practical skills empower students to build their future."
    },
    {
      name: "Ms. Alice Mugisha",
      position: "Student Affairs",
      image: "/images/administration/student-affairs.jpg",
      education: "Masters in Counseling Psychology, UR",
      experience: "8 years in student welfare",
      email: "studentaffairs@apaeer.ac.rw",
      phone: "+250 788 123 459",
      achievements: ["Student Wellness Program", "Mental Health Advocacy"],
      quote: "Student success is measured beyond academic achievements."
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Eric Mugisha",
      role: "O-Level Graduate, Class of 2020",
      content: "Apaer Institute provided me with not just education, but life skills that helped me excel in university and beyond.",
      image: "/images/testimonials/student1.jpg",
      achievement: "Now studying Computer Science at University of Rwanda"
    },
    {
      name: "Sarah Uwase",
      role: "TVET Software Development, Class of 2021",
      content: "The hands-on training in software development gave me the confidence to start my own tech startup immediately after graduation.",
      image: "/images/testimonials/student2.jpg",
      achievement: "Founder of TechSolutions Rwanda"
    },
    {
      name: "David Habimana",
      role: "Parent",
      content: "As a parent, I appreciate the holistic approach to education. My children are not just learning; they're becoming responsible citizens.",
      image: "/images/testimonials/parent1.jpg",
      achievement: "Parent of two Apaer graduates"
    },
    {
      name: "Grace Ingabire",
      role: "Industry Partner",
      content: "We consistently hire Apaer graduates because they come with practical skills and strong work ethics.",
      image: "/images/testimonials/partner1.jpg",
      achievement: "HR Manager at Rwanda Tech Ltd"
    }
  ];

  // Opportunities
  const opportunities = [
    {
      category: "Academic",
      title: "Scholarship Programs",
      description: "Full and partial scholarships for outstanding students based on academic merit and financial need.",
      deadline: "2024-03-15",
      requirements: ["Academic excellence", "Financial need assessment", "Community involvement", "Interview process"],
      icon: FaAward,
      spots: "15 available",
      duration: "Annual renewable"
    },
    {
      category: "Sports",
      title: "Athletic Scholarships",
      description: "Develop your sports talent while pursuing academic excellence with our comprehensive athletic program.",
      deadline: "2024-02-28",
      requirements: ["Sports achievement records", "Team participation history", "Academic commitment", "Physical fitness test"],
      icon: FaRocket,
      spots: "8 available", 
      duration: "Per semester"
    },
    {
      category: "Arts",
      title: "Creative Arts Program",
      description: "Nurture your artistic talents in music, drama, visual arts, and creative writing with specialized mentorship.",
      deadline: "2024-04-10",
      requirements: ["Portfolio submission", "Audition performance", "Creative potential", "Academic minimum maintained"],
      icon: FaStar,
      spots: "12 available",
      duration: "Annual program"
    },
    {
      category: "International",
      title: "Exchange Programs",
      description: "Experience global education through our international student exchange and partnership programs.",
      deadline: "2024-05-20",
      requirements: ["Language proficiency", "Academic performance", "Cultural adaptability", "Interview selection"],
      icon: FaGlobe,
      spots: "5 available",
      duration: "6-12 months"
    }
  ];

  // Social Media Links
  const socialLinks = [
    { platform: "Facebook", url: "https://facebook.com/apaeerinstitute", icon: FaFacebook, followers: "12.5K" },
    { platform: "Twitter", url: "https://twitter.com/apaeerinstitute", icon: FaTwitter, followers: "8.3K" },
    { platform: "Instagram", url: "https://instagram.com/apaeerinstitute", icon: FaInstagram, followers: "15.2K" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/apaeerinstitute", icon: FaLinkedin, followers: "5.7K" }
  ];

  // Enhanced useEffect for scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.about-section');
      const scrollPos = window.scrollY + 100;

      // Update active section
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });

      // Update scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play timeline
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimelineIndex((prev) => 
          prev === historyTimeline.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, historyTimeline.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handlePdfDownload = (url, filename) => {
    // Simulate download - in real app, this would be actual file download
    console.log(`Downloading ${filename} from ${url}`);
    alert(`Starting download: ${filename}`);
  };

  const nextTimeline = () => {
    setCurrentTimelineIndex(prev => 
      prev === historyTimeline.length - 1 ? 0 : prev + 1
    );
  };

  const prevTimeline = () => {
    setCurrentTimelineIndex(prev => 
      prev === 0 ? historyTimeline.length - 1 : prev - 1
    );
  };

  const goToTimeline = (index) => {
    setCurrentTimelineIndex(index);
  };

  const toggleTimelinePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleImageLoad = (imageUrl) => {
    setLoadedImages(prev => ({ ...prev, [imageUrl]: true }));
  };

  return (
    <div className="about-page">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress">
        <div 
          className="scroll-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Navigation Sidebar */}
      <nav className="about-nav">
        <div className="nav-header">
          <div className="school-logo">
            <FaUniversity />
            <span>Apaer Institute</span>
          </div>
          <h2>About Us</h2>
        </div>

        <ul className="nav-menu">
          {[
            { id: 'mission', icon: FaBullseye, label: 'Mission & Vision' },
            { id: 'admissions', icon: FaGraduationCap, label: 'Admissions & Fees' },
            { id: 'history', icon: FaHistory, label: 'Our History' },
            { id: 'testimonials', icon: FaQuoteLeft, label: 'Testimonials' },
            { id: 'opportunities', icon: FaAward, label: 'Opportunities' },
            { id: 'administration', icon: FaUserTie, label: 'Administration' },
          ].map((item) => (
            <li key={item.id}>
              <button 
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                <item.icon />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-footer">
          <div className="contact-info">
            <h4>Contact Info</h4>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <span>KG 123 St, Kigali, Rwanda</span>
            </div>
            <div className="contact-item">
              <FaPhone />
              <span>+250 788 123 456</span>
            </div>
            <div className="contact-item">
              <FaEnvelope />
              <span>info@apaeer.ac.rw</span>
            </div>
          </div>

          <div className="social-links">
            <h4>Follow Us</h4>
            <div className="social-icons">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={social.platform}
                  title={`${social.platform} - ${social.followers} followers`}
                >
                  <social.icon />
                  <span className="social-followers">{social.followers}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="about-content" ref={mainContentRef}>
        {/* Enhanced Hero Section */}
        <section className="about-hero">
          <div className="hero-background">
            <div className="hero-overlay"></div>
          </div>
          <div className="hero-content">
            <div className="hero-badge">
              <span>Est. 1995</span>
            </div>
            <h1>Welcome to Apaer Institute</h1>
            <p className="hero-subtitle">
              Transforming lives through quality education for over 28 years. 
              Join our community of learners, innovators, and future leaders.
            </p>
            <div className="hero-actions">
              <Link to="/admissions" className="cta-btn primary">
                Start Your Journey <FaArrowRight />
              </Link>
              <Link to="/tour" className="cta-btn secondary">
                Take Virtual Tour
              </Link>
            </div>
            <div className="hero-stats">
              {[
                { number: "5,000+", label: "Students Educated" },
                { number: "28+", label: "Years of Excellence" },
                { number: "85%", label: "Success Rate" },
                { number: "50+", label: "Community Projects" }
              ].map((stat, index) => (
                <div key={index} className="stat">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Mission & Vision Section */}
        <section id="mission" className="about-section">
          <div className="section-header">
            <h2>Our Foundation</h2>
            <p>Guiding principles that shape our educational approach and community</p>
          </div>

          <div className="foundation-grid">
            {Object.entries(missionVision).map(([key, data]) => (
              <div key={key} className={`foundation-card ${key}`}>
                <div className="card-header">
                  <div className="card-icon">
                    <data.icon />
                  </div>
                  <h3>{data.title}</h3>
                </div>
                <p>{data.description}</p>
                {key === 'values' ? (
                  <div className="values-grid">
                    {data.points.map((value, index) => (
                      <div key={index} className="value-item">
                        <div className="value-icon">
                          <value.icon />
                        </div>
                        <div className="value-content">
                          <h4>{value.name}</h4>
                          <p>{value.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="points-list">
                    {data.points.map((point, index) => (
                      <li key={index}>
                        <FaArrowRight />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Admissions & Fees Section */}
        <section id="admissions" className="about-section">
          <div className="section-header">
            <h2>Admissions & Fees</h2>
            <p>Join our community of learners and innovators</p>
          </div>

          <div className="admissions-content">
            {/* Enhanced Programs */}
            <div className="admissions-section">
              <h3>Academic Programs</h3>
              <div className="programs-grid">
                {admissions.programs.map((program, index) => (
                  <div key={index} className="program-card">
                    <div className="program-header">
                      <h4>{program.name}</h4>
                      <span className="program-duration">{program.duration}</span>
                    </div>
                    <div className="program-details">
                      <div className="detail">
                        <strong>Subjects:</strong> {program.subjects}
                      </div>
                      <div className="detail">
                        <strong>Requirements:</strong> {program.requirements}
                      </div>
                    </div>
                    <div className="program-features">
                      <h5>Key Features:</h5>
                      <ul>
                        {program.features.map((feature, fIndex) => (
                          <li key={fIndex}>
                            <FaCheck className="feature-check" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className="program-cta">
                      Learn More <FaArrowRight />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Fees Structure */}
            <div className="admissions-section">
              <h3>Fee Structure</h3>
              <div className="fees-comparison">
                <div className="fee-category">
                  <h4>O-Level Program</h4>
                  <div className="fee-items">
                    {Object.entries(admissions.fees.oLevel).map(([key, value]) => (
                      <div key={key} className="fee-item">
                        <span className="fee-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                        <strong className="fee-amount">{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="fee-category">
                  <h4>TVET Programs</h4>
                  <div className="fee-items">
                    {Object.entries(admissions.fees.tvet).map(([key, value]) => (
                      <div key={key} className="fee-item">
                        <span className="fee-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                        <strong className="fee-amount">{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Scholarships */}
            <div className="admissions-section">
              <h3>Scholarship Opportunities</h3>
              <div className="scholarships-grid">
                {admissions.fees.scholarships.map((scholarship, index) => (
                  <div key={index} className="scholarship-card">
                    <FaAward className="scholarship-icon" />
                    <div className="scholarship-content">
                      <h5>{scholarship.name}</h5>
                      <div className="scholarship-coverage">{scholarship.coverage}</div>
                      <p className="scholarship-requirements">{scholarship.requirements}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Documents Download */}
            <div className="admissions-section">
              <h3>Download Documents</h3>
              <div className="documents-grid">
                {admissions.documents.map((doc, index) => (
                  <div key={index} className="document-card">
                    <div className="document-icon">
                      <FaDownload />
                    </div>
                    <div className="document-info">
                      <h5>{doc.name}</h5>
                      <div className="document-meta">
                        <span>Size: {doc.size}</span>
                        <span>Updated: {doc.updated}</span>
                        <span>Downloads: {doc.downloads}</span>
                      </div>
                    </div>
                    <button 
                      className="download-btn"
                      onClick={() => handlePdfDownload(doc.url, doc.name)}
                    >
                      <FaDownload />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced History Section */}
        <section id="history" className="about-section">
          <div className="section-header">
            <h2>Our History</h2>
            <p>28 years of educational excellence and community impact</p>
          </div>

          <div className="history-content">
            {/* Interactive Timeline */}
            <div className="timeline-section">
              <div className="timeline-controls">
                <button onClick={prevTimeline} className="timeline-btn">
                  <FaChevronLeft />
                </button>
                <button onClick={toggleTimelinePlay} className="play-pause-btn">
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={nextTimeline} className="timeline-btn">
                  <FaChevronRight />
                </button>
              </div>

              <div className="timeline-indicators">
                {historyTimeline.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${currentTimelineIndex === index ? 'active' : ''}`}
                    onClick={() => goToTimeline(index)}
                  />
                ))}
              </div>

              <div className="timeline-container">
                <div className="timeline-main">
                  <div className="timeline-year-display">
                    {historyTimeline[currentTimelineIndex].year}
                  </div>
                  <div className="timeline-content">
                    <h3>{historyTimeline[currentTimelineIndex].title}</h3>
                    <p>{historyTimeline[currentTimelineIndex].description}</p>
                    
                    <div className="timeline-milestones">
                      <h4>Key Milestones:</h4>
                      {historyTimeline[currentTimelineIndex].milestones.map((milestone, mIndex) => (
                        <span key={mIndex} className="milestone">
                          {milestone}
                        </span>
                      ))}
                    </div>

                    <div className="timeline-achievements">
                      <h4>Achievements:</h4>
                      {historyTimeline[currentTimelineIndex].achievements.map((achievement, aIndex) => (
                        <div key={aIndex} className="achievement">
                          <FaAward />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="timeline-image">
                  <img 
                    src={historyTimeline[currentTimelineIndex].image} 
                    alt={historyTimeline[currentTimelineIndex].title}
                    onLoad={() => handleImageLoad(historyTimeline[currentTimelineIndex].image)}
                    className={loadedImages[historyTimeline[currentTimelineIndex].image] ? 'loaded' : 'loading'}
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Community Impact */}
            <div className="impact-section">
              <h3>Community Impact</h3>
              <div className="impact-grid">
                {communityImpact.map((impact, index) => (
                  <div key={index} className="impact-card">
                    <div className="impact-icon">
                      <impact.icon />
                    </div>
                    <div className="impact-content">
                      <h4>{impact.area}</h4>
                      <div className="impact-stat">{impact.impact}</div>
                      <div className="impact-growth">{impact.growth}</div>
                      <p>{impact.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* New Testimonials Section */}
        <section id="testimonials" className="about-section">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>Hear from our students, parents, and partners</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <FaQuoteLeft className="quote-icon" />
                  <p>"{testimonial.content}"</p>
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span className="author-role">{testimonial.role}</span>
                    <div className="author-achievement">
                      <FaStar />
                      {testimonial.achievement}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Opportunities Section */}
        <section id="opportunities" className="about-section">
          <div className="section-header">
            <h2>Student Opportunities</h2>
            <p>Unlock your potential with our diverse opportunities</p>
          </div>

          <div className="opportunities-grid">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="opportunity-card">
                <div className="opportunity-header">
                  <div className="opportunity-icon">
                    <opportunity.icon />
                  </div>
                  <div className="opportunity-meta">
                    <span className="category">{opportunity.category}</span>
                    <span className="spots">{opportunity.spots}</span>
                  </div>
                </div>
                
                <h3>{opportunity.title}</h3>
                <p>{opportunity.description}</p>
                
                <div className="opportunity-details">
                  <div className="detail-item">
                    <FaCalendarAlt />
                    <span>Apply by: {opportunity.deadline}</span>
                  </div>
                  <div className="detail-item">
                    <FaGraduationCap />
                    <span>Duration: {opportunity.duration}</span>
                  </div>
                </div>

                <div className="requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    {opportunity.requirements.map((req, reqIndex) => (
                      <li key={reqIndex}>
                        <FaCheck />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="opportunity-actions">
                  <button className="apply-btn">
                    Apply Now <FaArrowRight />
                  </button>
                  <button className="info-btn">
                    More Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Administration Section */}
        <section id="administration" className="about-section">
          <div className="section-header">
            <h2>Our Administration</h2>
            <p>Meet the dedicated team leading Apaer Institute</p>
          </div>

          <div className="administration-grid">
            {administration.map((admin, index) => (
              <div key={index} className="admin-card">
                <div className="admin-image">
                  <img src={admin.image} alt={admin.name} />
                  <div className="admin-overlay">
                    <div className="contact-links">
                      <a href={`mailto:${admin.email}`} aria-label={`Email ${admin.name}`}>
                        <FaEnvelope />
                      </a>
                      <a href={`tel:${admin.phone}`} aria-label={`Call ${admin.name}`}>
                        <FaPhone />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="admin-info">
                  <h3>{admin.name}</h3>
                  <p className="position">{admin.position}</p>
                  
                  <div className="admin-quote">
                    <FaQuoteLeft />
                    "{admin.quote}"
                  </div>

                  <div className="admin-details">
                    <div className="detail">
                      <strong>Education:</strong> {admin.education}
                    </div>
                    <div className="detail">
                      <strong>Experience:</strong> {admin.experience}
                    </div>
                  </div>

                  <div className="admin-achievements">
                    <h5>Key Achievements:</h5>
                    <ul>
                      {admin.achievements.map((achievement, aIndex) => (
                        <li key={aIndex}>
                          <FaAward />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="admin-contact">
                    <div className="contact-item">
                      <FaEnvelope />
                      <span>{admin.email}</span>
                    </div>
                    <div className="contact-item">
                      <FaPhone />
                      <span>{admin.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="cta-section">
          <div className="cta-background"></div>
          <div className="cta-content">
            <h2>Ready to Join Our Community?</h2>
            <p>Start your educational journey with Apaer Institute today and become part of our success story</p>
            <div className="cta-buttons">
              <Link to="/admissions" className="cta-btn primary">
                Apply Now <FaArrowRight />
              </Link>
              <Link to="/contact" className="cta-btn secondary">
                Schedule Visit
              </Link>
              <Link to="/programs" className="cta-btn outline">
                Explore Programs
              </Link>
            </div>
            <div className="cta-features">
              <div className="feature">
                <FaCheck />
                <span>No Application Fee</span>
              </div>
              <div className="feature">
                <FaCheck />
                <span>Flexible Payment Plans</span>
              </div>
              <div className="feature">
                <FaCheck />
                <span>Scholarship Support</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;