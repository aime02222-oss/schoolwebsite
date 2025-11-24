import React, { useState, useEffect, useRef } from 'react';
import { 
  FaGraduationCap, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaFlask,
  FaCalendarAlt,
  FaBullhorn,
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaImages,
  FaTrophy,
  FaAward,
  FaRocket,
  FaHeart,
  FaShare,
  FaRegClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Home.css';

// Import images from assets
import principalImage from '../assets/image.jpg';
import scienceFairImage from '../assets/image2.jpg';
import culturalDayImage from '../assets/image3.jpg';
import graduationImage from '../assets/image4.jpg';
import careerWorkshopImage from '../assets/image5.jpg';
import computerLabImage from '../assets/image.jpg';
import awardsImage from '../assets/image2.jpg';
import partnershipImage from '../assets/image4.jpg';
import student1Image from '../assets/image2.jpg';
import student2Image from '../assets/image4.jpg';
import student3Image from '../assets/image5.jpg';
import sportsImage from '../assets/image3.jpg';
import clubsImage from '../assets/image3.jpg';
import culturalImage from '../assets/image4.jpg';
import academicImage from '../assets/image3.jpg';

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    students: 0,
    graduates: 0,
    teachers: 0,
    labs: 0
  });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const announcementsRef = useRef(null);

  // Enhanced mock data
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole === 'admin');

    // Animated statistics
    const animateStats = () => {
      const duration = 2000;
      const steps = 20;
      const incrementStudents = 500 / steps;
      const incrementGraduates = 1000 / steps;
      const incrementTeachers = 50 / steps;
      const incrementLabs = 10 / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setStats({
          students: Math.min(500, Math.round(incrementStudents * currentStep)),
          graduates: Math.min(1000, Math.round(incrementGraduates * currentStep)),
          teachers: Math.min(50, Math.round(incrementTeachers * currentStep)),
          labs: Math.min(10, Math.round(incrementLabs * currentStep))
        });

        if (currentStep === steps) clearInterval(timer);
      }, duration / steps);
    };

    setTimeout(animateStats, 1000);

    setAnnouncements([
      { 
        id: 1, 
        title: 'School Reopening Announcement', 
        content: 'We are pleased to announce that Apaer Institute will reopen on January 15th, 2024 for the new academic year.',
        date: '2024-01-10',
        type: 'important',
        icon: FaBullhorn
      },
      { 
        id: 2, 
        title: 'Parent-Teacher Meeting', 
        content: 'Quarterly PTA meeting scheduled for January 20th, 2024. All parents are cordially invited.',
        date: '2024-01-12',
        type: 'event',
        icon: FaCalendarAlt
      },
      { 
        id: 3, 
        title: 'Science Fair 2024', 
        content: 'Annual Science Fair competition open for all students. Registration deadline: January 30th.',
        date: '2024-01-15',
        type: 'competition',
        icon: FaFlask
      },
      { 
        id: 4, 
        title: 'Sports Day Celebration', 
        content: 'Join us for our annual Sports Day on January 25th featuring various athletic competitions.',
        date: '2024-01-20',
        type: 'sports',
        icon: FaTrophy
      }
    ]);

    setEvents([
      { 
        id: 1, 
        title: 'Science & Innovation Fair', 
        date: '2024-02-15', 
        time: '9:00 AM - 3:00 PM',
        location: 'School Main Hall',
        image: scienceFairImage,
        description: 'Showcasing student projects in science and technology',
        category: 'Academic'
      },
      { 
        id: 2, 
        title: 'Cultural Diversity Day', 
        date: '2024-03-10', 
        time: '10:00 AM - 4:00 PM',
        location: 'School Grounds',
        image: culturalDayImage,
        description: 'Celebrating cultural heritage through performances and exhibitions',
        category: 'Cultural'
      },
      { 
        id: 3, 
        title: 'Graduation Ceremony', 
        date: '2024-06-20', 
        time: '2:00 PM - 5:00 PM',
        location: 'Auditorium',
        image: graduationImage,
        description: 'Class of 2024 graduation ceremony and award presentation',
        category: 'Academic'
      },
      { 
        id: 4, 
        title: 'Career Guidance Workshop', 
        date: '2024-04-05', 
        time: '11:00 AM - 1:00 PM',
        location: 'Library Conference Room',
        image: careerWorkshopImage,
        description: 'Professional career counseling for senior students',
        category: 'Workshop'
      }
    ]);

    setNews([
      { 
        id: 1, 
        title: 'New State-of-the-Art Computer Lab', 
        content: 'Apaer Institute has established a new modern computer laboratory equipped with the latest technology to enhance digital learning experiences for our students.',
        excerpt: 'We have established a new modern computer lab with 50 high-performance computers...',
        date: '2024-01-08', 
        image: computerLabImage,
        author: 'Dr. Emmanuel Ndayisaba',
        category: 'Infrastructure',
        readTime: '3 min read'
      },
      { 
        id: 2, 
        title: 'Outstanding Academic Results 2023', 
        content: 'Our students achieved exceptional results in the national examinations, with 95% of our graduates qualifying for university admission.',
        excerpt: 'Our students achieved outstanding results with 95% university qualification rate...',
        date: '2024-01-05', 
        image: awardsImage,
        author: 'Academic Department',
        category: 'Achievements',
        readTime: '2 min read'
      },
      { 
        id: 3, 
        title: 'Partnership with Tech Industry Leaders', 
        content: 'We are proud to announce new partnerships with leading technology companies to provide internship opportunities for our TVET students.',
        excerpt: 'New industry partnerships created for student internship programs...',
        date: '2024-01-03', 
        image: partnershipImage,
        author: 'Career Office',
        category: 'Partnerships',
        readTime: '4 min read'
      }
    ]);

    setTestimonials([
      { 
        id: 1, 
        name: 'Alice Uwase', 
        program: 'O-Level Science', 
        year: '2023 Graduate',
        text: 'Apaer Institute provided me with not just education, but a foundation for life. The dedicated teachers and modern facilities helped me achieve my dream of studying medicine at university.',
        rating: 5, 
        image: student1Image,
        achievement: 'Now studying Medicine at University of Rwanda'
      },
      { 
        id: 2, 
        name: 'John Mugisha', 
        program: 'TVET - Information Technology', 
        year: '2022 Graduate',
        text: 'The practical skills I gained in the TVET program helped me secure a job immediately after graduation. The hands-on approach to learning made all the difference in my career.',
        rating: 5, 
        image: student2Image,
        achievement: 'Software Developer at Tech Solutions Rwanda'
      },
      { 
        id: 3, 
        name: 'Marie Iradukunda', 
        program: 'O-Level Arts', 
        year: '2023 Graduate',
        text: 'The supportive environment and extracurricular activities helped me discover my passion for leadership. I am now pursuing Law while serving as student representative.',
        rating: 5, 
        image: student3Image,
        achievement: 'Law Student & Youth Representative'
      }
    ]);
  }, []);

  // Auto testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Announcement scroll effect
  useEffect(() => {
    const scrollContainer = announcementsRef.current;
    if (scrollContainer) {
      const scroll = () => {
        setScrollPosition(prev => {
          const newPosition = prev + 1;
          if (newPosition >= scrollContainer.scrollHeight / 2) {
            return 0;
          }
          scrollContainer.scrollTop = newPosition;
          return newPosition;
        });
      };

      const interval = setInterval(scroll, 50);
      return () => clearInterval(interval);
    }
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Admin upload handlers
  const handleSlideUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate upload process
      console.log('Uploading slide image:', file.name);
      // API integration would go here
    }
  };

  const handleNewsUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Uploading news content:', file.name);
      // API integration would go here
    }
  };

  const handleTestimonialUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Uploading testimonial:', file.name);
      // API integration would go here
    }
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="home-page">
      {/* Enhanced Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div 
            className="stats-grid"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="stat-card" variants={fadeInUp}>
              <div className="stat-icon-wrapper">
                <FaUserGraduate className="stat-icon" />
              </div>
              <h3 className="stat-number">{stats.students}+</h3>
              <p>Current Students</p>
            </motion.div>
            
            <motion.div className="stat-card" variants={fadeInUp}>
              <div className="stat-icon-wrapper">
                <FaGraduationCap className="stat-icon" />
              </div>
              <h3 className="stat-number">{stats.graduates}+</h3>
              <p>Successful Graduates</p>
            </motion.div>
            
            <motion.div className="stat-card" variants={fadeInUp}>
              <div className="stat-icon-wrapper">
                <FaChalkboardTeacher className="stat-icon" />
              </div>
              <h3 className="stat-number">{stats.teachers}+</h3>
              <p>Expert Teachers</p>
            </motion.div>
            
            <motion.div className="stat-card" variants={fadeInUp}>
              <div className="stat-icon-wrapper">
                <FaFlask className="stat-icon" />
              </div>
              <h3 className="stat-number">{stats.labs}+</h3>
              <p>Modern Laboratories</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="section-title">Our Excellence in Numbers</h2>
            <p className="section-subtitle">Celebrating academic achievements and student success</p>
            
            <div className="achievements-grid">
              <div className="achievement-category">
                <h3>
                  <FaTrophy className="category-icon" />
                  Top Performing Students 2023
                </h3>
                <div className="achievement-list">
                  {[
                    { name: 'Alice Uwase', program: 'Science', score: '98%', award: 'Best Overall' },
                    { name: 'John Mugisha', program: 'TVET IT', score: '96%', award: 'Technology Excellence' },
                    { name: 'Marie Iradukunda', program: 'Arts', score: '95%', award: 'Creative Arts' }
                  ].map((student, index) => (
                    <div key={index} className="achievement-item">
                      <div className="student-info">
                        <span className="student-name">{student.name}</span>
                        <span className="student-program">{student.program}</span>
                      </div>
                      <div className="achievement-details">
                        <span className="score">{student.score}</span>
                        <div className="award-badge">{student.award}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="achievement-category">
                <h3>
                  <FaAward className="category-icon" />
                  Best Performing Classes
                </h3>
                <div className="achievement-list">
                  {[
                    { class: 'Senior 2', performance: '98%', trend: '+5%' },
                    { class: 'TVET IT Program', performance: '96%', trend: '+8%' },
                    { class: 'Senior 3 ', performance: '92%', trend: '+3%' }
                  ].map((cls, index) => (
                    <div key={index} className="achievement-item">
                      <div className="class-info">
                        <span className="class-name">{cls.class}</span>
                        <div className="performance">
                          <span className="percentage">{cls.performance}</span>
                          <span className="trend positive">{cls.trend}</span>
                        </div>
                      </div>
                      <div className="performance-bar">
                        <div 
                          className="performance-fill" 
                          style={{ width: cls.performance }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="achievement-category">
                <h3>
                  <FaRocket className="category-icon" />
                  Expert Faculty Members
                </h3>
                <div className="achievement-list">
                  {[
                    { name: 'Dr. James Smith', subject: 'Physics', experience: '15 years', specialization: 'Quantum Mechanics' },
                    { name: 'Prof. Sarah Johnson', subject: 'Chemistry', experience: '12 years', specialization: 'Organic Chemistry' },
                    { name: 'Mr. Robert Brown', subject: 'Mathematics', experience: '10 years', specialization: 'Advanced Calculus' }
                  ].map((teacher, index) => (
                    <div key={index} className="achievement-item">
                      <div className="teacher-info">
                        <span className="teacher-name">{teacher.name}</span>
                        <span className="teacher-subject">{teacher.subject}</span>
                      </div>
                      <div className="teacher-details">
                        <span className="experience">{teacher.experience}</span>
                        <span className="specialization">{teacher.specialization}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Principal's Message */}
      <section className="principal-message">
        <div className="container">
          <div className="message-content">
            <motion.div 
              className="message-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2>Leadership Message</h2>
              <div className="quote-container">
                <FaQuoteLeft className="quote-icon" />
                <p className="message-quote">
                  At Apaer Institute, we believe in nurturing not just academic excellence, but also 
                  character, leadership, and innovation. Our commitment to providing quality education 
                  through modern facilities and dedicated faculty ensures that every student discovers 
                  their potential and prepares for a successful future.
                </p>
              </div>
              <div className="principal-info">
                <div className="principal-details">
                  <strong>Bayiringire seth</strong>
                  <span>Principal, Apaer Institute</span>
                  <div className="principal-credentials">
                    <span>PhD in Educational Leadership</span>
                    <span>15+ Years of Experience</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="message-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="image-container">
                <img src={principalImage} alt="Principal Bayiringire Sept" />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h4>Leading with Vision</h4>
                    <p>Committed to educational excellence since 2015</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Events Section */}
      <section className="events-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-header">
              <h2 className="section-title">Upcoming Events & Activities</h2>
              <p className="section-subtitle">Join us in our educational and cultural activities</p>
            </div>
            
            <div className="events-grid">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="event-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="event-image">
                    <img src={event.image} alt={event.title} />
                    <div className="event-category">{event.category}</div>
                    <div className="event-date">
                      <FaCalendarAlt />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                  
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    
                    <div className="event-details">
                      <div className="detail-item">
                        <FaRegClock />
                        <span>{event.time}</span>
                      </div>
                      <div className="detail-item">
                        <FaMapMarkerAlt />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="event-actions">
                      <button className="event-btn primary">Register</button>
                      <button className="event-btn secondary">Add to Calendar</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Announcements with Scroll */}
      <section className="announcements-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-header">
              <h2 className="section-title">
                <FaBullhorn className="title-icon" />
                Latest Announcements
              </h2>
              <p className="section-subtitle">Stay updated with important school news</p>
            </div>
            
            <div className="announcements-container">
              <div 
                ref={announcementsRef}
                className="announcements-scroll"
              >
                {announcements.map((announcement) => (
                  <div key={announcement.id} className={`announcement-item ${announcement.type}`}>
                    <div className="announcement-icon">
                      <announcement.icon />
                    </div>
                    <div className="announcement-content">
                      <div className="announcement-header">
                        <h4>{announcement.title}</h4>
                        <span className="announcement-date">
                          {new Date(announcement.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p>{announcement.content}</p>
                    </div>
                    <div className="announcement-actions">
                      <button className="action-btn">
                        <FaShare />
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate for seamless scroll */}
                {announcements.map((announcement) => (
                  <div key={`dup-${announcement.id}`} className={`announcement-item ${announcement.type}`}>
                    <div className="announcement-icon">
                      <announcement.icon />
                    </div>
                    <div className="announcement-content">
                      <div className="announcement-header">
                        <h4>{announcement.title}</h4>
                        <span className="announcement-date">
                          {new Date(announcement.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p>{announcement.content}</p>
                    </div>
                    <div className="announcement-actions">
                      <button className="action-btn">
                        <FaShare />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced School Activities */}
      <section className="activities-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="section-title">Student Life & Activities</h2>
            <p className="section-subtitle">Explore our vibrant campus life beyond academics</p>
            
            <div className="activities-grid">
              {[
                { 
                  id: 1, 
                  title: 'Sports & Athletics', 
                  image: sportsImage, 
                  count: '15 Teams', 
                  description: 'Competitive and recreational sports programs',
                  activities: ['Football', 'Basketball', 'Athletics', 'Volleyball']
                },
                { 
                  id: 2, 
                  title: 'Clubs & Societies', 
                  image: clubsImage, 
                  count: '8 Active Clubs', 
                  description: 'Student-led interest groups and organizations',
                  activities: ['Debate Club', 'Science Club', 'Art Society', 'Tech Club']
                },
                { 
                  id: 3, 
                  title: 'Cultural Events', 
                  image: culturalImage, 
                  count: '12 Annual Events', 
                  description: 'Celebrating diversity and cultural heritage',
                  activities: ['Cultural Day', 'Music Fest', 'Dance Performances', 'Heritage Week']
                },
                { 
                  id: 4, 
                  title: 'Academic Competitions', 
                  image: academicImage, 
                  count: '20+ Competitions', 
                  description: 'Challenging academic tournaments and olympiads',
                  activities: ['Science Fair', 'Math Olympiad', 'Quiz Competition', 'Robotics Challenge']
                }
              ].map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="activity-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="activity-image">
                    <img src={activity.image} alt={activity.title} />
                    <div className="activity-overlay">
                      <div className="overlay-content">
                        <FaPlay className="play-icon" />
                        <h4>View Gallery</h4>
                      </div>
                    </div>
                    <div className="activity-count">{activity.count}</div>
                  </div>
                  
                  <div className="activity-content">
                    <h3>{activity.title}</h3>
                    <p className="activity-description">{activity.description}</p>
                    
                    <div className="activity-tags">
                      {activity.activities.map((tag, tagIndex) => (
                        <span key={tagIndex} className="activity-tag">{tag}</span>
                      ))}
                    </div>
                    
                    <button className="activity-btn">Explore More</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced News & Updates */}
      <section className="news-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-header">
              <div>
                <h2 className="section-title">School News & Updates</h2>
                <p className="section-subtitle">Latest developments and achievements</p>
              </div>
              
              {isAdmin && (
                <div className="admin-controls">
                  <label className="upload-btn primary">
                    <FaImages />
                    Upload News
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleNewsUpload}
                      className="upload-input"
                      id="news-upload"
                    />
                  </label>
                  <button className="upload-btn secondary">
                    Manage News
                  </button>
                </div>
              )}
            </div>
            
            <div className="news-grid">
              {news.map((item, index) => (
                <motion.article
                  key={item.id}
                  className="news-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="news-image">
                    <img src={item.image} alt={item.title} />
                    <div className="news-category">{item.category}</div>
                    <div className="news-meta">
                      <span className="read-time">{item.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="news-content">
                    <div className="news-header">
                      <div className="news-date">
                        {new Date(item.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="news-author">By {item.author}</div>
                    </div>
                    
                    <h3>{item.title}</h3>
                    <p className="news-excerpt">{item.excerpt}</p>
                    
                    <div className="news-actions">
                      <button className="read-more">Read Full Story</button>
                      <div className="social-actions">
                        <button className="social-btn">
                          <FaHeart />
                        </button>
                        <button className="social-btn">
                          <FaShare />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            
            <div className="news-cta">
              <button className="cta-button secondary">View All News</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Why Choose Us */}
      <section className="why-us-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="section-title">Why Choose Apaer Institute?</h2>
            <p className="section-subtitle">Discover what makes us the preferred choice for quality education</p>
            
            <div className="features-grid">
              {[
                { 
                  icon: FaGraduationCap, 
                  title: 'Academic Excellence', 
                  desc: 'Consistently achieving outstanding results in national examinations with 95% university qualification rate',
                  stats: '95% Success Rate'
                },
                { 
                  icon: FaUserGraduate, 
                  title: 'Graduate Success', 
                  desc: 'Our graduates excel in universities and careers worldwide, with strong alumni network support',
                  stats: '1000+ Graduates'
                },
                { 
                  icon: FaChalkboardTeacher, 
                  title: 'Expert Faculty', 
                  desc: 'Highly qualified teachers with advanced degrees and industry experience in their respective fields',
                  stats: '50+ Experts'
                },
                { 
                  icon: FaFlask, 
                  title: 'Modern Facilities', 
                  desc: 'State-of-the-art laboratories, libraries, and technology infrastructure for hands-on learning',
                  stats: '10+ Labs'
                },
                { 
                  icon: FaCalendarAlt, 
                  title: 'Holistic Development', 
                  desc: 'Comprehensive extracurricular programs focusing on sports, arts, leadership, and community service',
                  stats: '30+ Activities'
                },
                { 
                  icon: FaAward, 
                  title: 'Proven Track Record', 
                  desc: 'Over a decade of educational excellence with numerous awards and recognitions in academic achievements',
                  stats: '15+ Awards'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="feature-icon-wrapper">
                    <feature.icon className="feature-icon" />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                  <div className="feature-stats">{feature.stats}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Student Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-header">
              <div>
                <h2 className="section-title">Student Success Stories</h2>
                <p className="section-subtitle">Hear from our students and alumni about their experiences</p>
              </div>
              
              <div className="testimonial-controls">
                {!isAdmin && (
                  <button className="add-testimonial-btn">
                    Share Your Story
                  </button>
                )}
                
                <div className="navigation-buttons">
                  <button className="nav-btn" onClick={prevTestimonial}>
                    <FaChevronLeft />
                  </button>
                  <button className="nav-btn" onClick={nextTestimonial}>
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>

            <div className="testimonials-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  className="testimonial-active"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  {testimonials[activeTestimonial] && (
                    <div className="active-testimonial">
                      <div className="testimonial-content">
                        <FaQuoteLeft className="testimonial-quote-icon" />
                        <p className="testimonial-text">
                          "{testimonials[activeTestimonial].text}"
                        </p>
                        
                        <div className="testimonial-author">
                          <img 
                            src={testimonials[activeTestimonial].image} 
                            alt={testimonials[activeTestimonial].name} 
                          />
                          <div className="author-info">
                            <h4>{testimonials[activeTestimonial].name}</h4>
                            <span className="author-program">
                              {testimonials[activeTestimonial].program}
                            </span>
                            <span className="author-year">
                              {testimonials[activeTestimonial].year}
                            </span>
                            <div className="author-achievement">
                              {testimonials[activeTestimonial].achievement}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="testimonials-grid">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className={`testimonial-card ${index === activeTestimonial ? 'active' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveTestimonial(index)}
                  >
                    <div className="testimonial-header">
                      <img src={testimonial.image} alt={testimonial.name} />
                      <div className="student-info">
                        <h4>{testimonial.name}</h4>
                        <span>{testimonial.program}</span>
                      </div>
                      <div className="rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="star" />
                        ))}
                      </div>
                    </div>
                    <p>"{testimonial.text.substring(0, 120)}..."</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {isAdmin && (
              <motion.div
                className="admin-testimonial-controls"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h4>Manage Testimonials</h4>
                <div className="admin-actions">
                  <label className="upload-btn primary">
                    <FaImages />
                    Upload Testimonial
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleTestimonialUpload}
                      className="upload-input"
                      id="testimonial-upload"
                    />
                  </label>
                  <button className="upload-btn secondary">
                    Moderate Submissions
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2>Ready to Join Our Community?</h2>
            <p>Begin your educational journey at Apaer Institute and unlock your potential for success</p>
            <div className="cta-buttons">
              <button className="cta-button primary">Apply Now</button>
              <button className="cta-button secondary">Schedule a Visit</button>
              <button className="cta-button outline">Download Brochure</button>
            </div>
            <div className="cta-contacts">
              <div className="contact-item">
                <FaPhone />
                <span>+250 788 123 456</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <span>admissions@apaer.ac.rw</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;