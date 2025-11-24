import React, { useRef, useState } from 'react';
import { 
  FaCalendarAlt, 
  FaClipboardCheck, 
  FaChurch, 
  FaBook, 
  FaChalkboardTeacher, 
  FaLaptopCode, 
  FaNetworkWired, 
  FaHotel, 
  FaHardHat, 
  FaCalculator, 
  FaFilm, 
  FaMicrochip, 
  FaWhatsapp,
  FaTwitter,
  FaArrowRight,
  FaClock,
  FaUsers,
  FaGraduationCap,
  FaStar,
  FaAward,
  FaLightbulb,
  FaRocket,
  FaChartLine,
  FaShieldAlt,
  FaHandsHelping
} from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { MdSportsVolleyball } from 'react-icons/md';
import './Academic.css';

const Academic = () => {
  const [activeSection, setActiveSection] = useState('timetable');
  
  const timetableRef = useRef(null);
  const assessmentRef = useRef(null);
  const churchRef = useRef(null);
  const homeworkRef = useRef(null);
  const olevelRef = useRef(null);
  const teachersRef = useRef(null);
  const tvetRef = useRef(null);

  const scrollTo = (ref, section) => {
    setActiveSection(section);
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tvetPrograms = [
    {
      id: 1,
      name: "SOFTWARE DEVELOPMENT (SOD)",
      tradeName: "Software Development Specialist",
      levels: "Level 3 to Level 5",
      totalStudents: 85,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2025",
      modules: [
        "Programming Fundamentals",
        "Web Development",
        "Database Systems",
        "Mobile App Development",
        "Software Engineering"
      ],
      icon: FaLaptopCode,
      color: "from-blue-500 to-cyan-500",
      stats: { employment: "95%", projects: 120, certifications: 8 }
    },
    {
      id: 2,
      name: "NETWORKING (NET)",
      tradeName: "Network Technician",
      levels: "Level 3 to Level 5",
      totalStudents: 72,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2027",
      modules: [
        "Network Fundamentals",
        "Routing & Switching",
        "Network Security",
        "Wireless Networks",
        "Cloud Computing"
      ],
      icon: FaNetworkWired,
      color: "from-green-500 to-emerald-500",
      stats: { employment: "92%", projects: 85, certifications: 6 }
    },
    {
      id: 3,
      name: "TOURISM (TUR)",
      tradeName: "Tourism & Hospitality Specialist",
      levels: "Level 3 to Level 5",
      totalStudents: 68,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2027",
      modules: [
        "Tourism Operations",
        "Hospitality Management",
        "Customer Service",
        "Event Planning",
        "Cultural Tourism"
      ],
      icon: FaHotel,
      color: "from-purple-500 to-pink-500",
      stats: { employment: "88%", projects: 45, certifications: 5 }
    },
    {
      id: 4,
      name: "MASONRY (MAS)",
      tradeName: "Construction Mason",
      levels: "Level 3 to Level 5",
      totalStudents: 45,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2027",
      modules: [
        "Brick Laying",
        "Concrete Work",
        "Construction Safety",
        "Blueprint Reading",
        "Building Maintenance"
      ],
      icon: FaHardHat,
      color: "from-orange-500 to-red-500",
      stats: { employment: "90%", projects: 60, certifications: 4 }
    },
    {
      id: 5,
      name: "ACCOUNTING (ACC)",
      tradeName: "Accounting Technician",
      levels: "Level 3 to Level 5",
      totalStudents: 78,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2027",
      modules: [
        "Financial Accounting",
        "Taxation",
        "Cost Accounting",
        "Accounting Software",
        "Business Finance"
      ],
      icon: FaCalculator,
      color: "from-teal-500 to-blue-500",
      stats: { employment: "94%", projects: 95, certifications: 7 }
    },
    {
      id: 6,
      name: "MULTIMEDIA PRODUCTION (MMP)",
      tradeName: "Multimedia Producer",
      levels: "Level 3 to Level 5",
      totalStudents: 52,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2027",
      modules: [
        "Graphic Design",
        "Video Production",
        "Animation",
        "Digital Marketing",
        "Audio Production"
      ],
      icon: FaFilm,
      color: "from-pink-500 to-rose-500",
      stats: { employment: "89%", projects: 75, certifications: 6 }
    },
    {
      id: 7,
      name: "ELECTRONICS (ELC)",
      tradeName: "Electronics Technician",
      levels: "Level 3 to Level 5",
      totalStudents: 60,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2027",
      modules: [
        "Circuit Design",
        "Digital Electronics",
        "Microcontrollers",
        "Electronic Maintenance",
        "Renewable Energy Systems"
      ],
      icon: FaMicrochip,
      color: "from-indigo-500 to-purple-500",
      stats: { employment: "91%", projects: 55, certifications: 5 }
    }
  ];

  const teachers = [
    {
      id: 1,
      name: "Dr. Alice M.",
      role: "Head of Sciences",
      qualification: "PhD in Physics",
      department: "Sciences",
      image: "/images/teachers/science1.jpg",
      social: {
        whatsapp: "https://wa.me/250788123456",
        twitter: "https://twitter.com/dralice_m"
      },
      expertise: ["Quantum Mechanics", "Research Methodology", "Advanced Physics"],
      achievements: ["Published 15 research papers", "National Science Award 2022"]
    },
    {
      id: 2,
      name: "Mr. John D.",
      role: "Mathematics",
      qualification: "MSc in Applied Mathematics",
      department: "Sciences",
      image: "/images/teachers/science2.jpg",
      social: {
        whatsapp: "https://wa.me/250788123457",
        twitter: "https://twitter.com/johnd_math"
      },
      expertise: ["Calculus", "Statistics", "Mathematical Modeling"],
      achievements: ["Math Olympiad Coach", "Curriculum Developer"]
    },
    {
      id: 3,
      name: "Mr Enock.",
      role: "Physics",
      qualification: "MSc in Physics",
      department: "Sciences",
      image: "/images/teachers/science3.jpg",
      social: {
        whatsapp: "https://wa.me/250788123458",
        twitter: "https://twitter.com/gracek_physics"
      },
      expertise: ["Classical Mechanics", "Electromagnetism", "Laboratory Techniques"],
      achievements: ["Science Fair Coordinator", "Industry Partnership Lead"]
    },
    {
      id: 4,
      name: "Mr. Eric T.",
      role: "Head of Humanities",
      qualification: "MA in Education",
      department: "Humanities",
      image: "/images/teachers/humanities1.jpg",
      social: {
        whatsapp: "https://wa.me/250788123459",
        twitter: "https://twitter.com/erict_humanities"
      },
      expertise: ["Educational Psychology", "Curriculum Design", "Leadership"],
      achievements: ["15+ years teaching experience", "Educational Consultant"]
    },
    {
      id: 5,
      name: "Ms. Sarah L.",
      role: "History",
      qualification: "MA in African History",
      department: "Humanities",
      image: "/images/teachers/humanities2.jpg",
      social: {
        whatsapp: "https://wa.me/250788123460",
        twitter: "https://twitter.com/sarahl_history"
      },
      expertise: ["African History", "Cultural Studies", "Research Methods"],
      achievements: ["Published Historian", "Cultural Preservation Advocate"]
    },
    {
      id: 6,
      name: "Eng. Patrick S.",
      role: "Head of TVET",
      qualification: "BEng in Electrical Engineering",
      department: "TVET",
      image: "/images/teachers/tvet1.jpg",
      social: {
        whatsapp: "https://wa.me/250788123461",
        twitter: "https://twitter.com/patrick_engineer"
      },
      expertise: ["Electrical Systems", "Project Management", "Industry Standards"],
      achievements: ["10+ years industry experience", "TVET Program Developer"]
    },
    {
      id: 7,
      name: "Ms. Rachel P.",
      role: "Software Development",
      qualification: "BSc in Computer Science",
      department: "TVET",
      image: "/images/teachers/tvet2.jpg",
      social: {
        whatsapp: "https://wa.me/250788123462",
        twitter: "https://twitter.com/rachelp_tech"
      },
      expertise: ["Full-Stack Development", "Agile Methodology", "Database Design"],
      achievements: ["Tech Startup Founder", "Open Source Contributor"]
    }
  ];

  return (
    <div className="modern-academic-page">
      {/* Hero Section */}
      <section className="academic-hero">
        <div className="hero-background">
          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <FaGraduationCap className="badge-icon" />
            <span>Academic Excellence</span>
          </div>
          <h1 className="hero-title">
            Transformative <span className="gradient-text">Education</span> Experience
          </h1>
          <p className="hero-description">
            Discover our comprehensive academic programs, experienced faculty, 
            and innovative learning approaches designed to shape future leaders.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">7+</div>
              <div className="stat-label">TVET Programs</div>
            </div>
            <div className="stat">
              <div className="stat-number">25+</div>
              <div className="stat-label">Qualified Teachers</div>
            </div>
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <div className="academic-layout">
        {/* Modern Navigation Sidebar */}
        <nav className="modern-academic-nav">
          <div className="nav-header">
            <div className="nav-logo">
              <FaGraduationCap />
              <span>Academic Portal</span>
            </div>
          </div>
          
          <div className="nav-sections">
            <div className="nav-group">
              <div className="group-label">Academic Schedule</div>
              <button 
                className={`nav-item ${activeSection === 'timetable' ? 'active' : ''}`}
                onClick={() => scrollTo(timetableRef, 'timetable')}
              >
                <div className="nav-icon">
                  <FaCalendarAlt />
                </div>
                <span>School Timetable</span>
                <FaArrowRight className="nav-arrow" />
              </button>
              
              <button 
                className={`nav-item ${activeSection === 'assessment' ? 'active' : ''}`}
                onClick={() => scrollTo(assessmentRef, 'assessment')}
              >
                <div className="nav-icon">
                  <FaClipboardCheck />
                </div>
                <span>Assessment Schedule</span>
                <FaArrowRight className="nav-arrow" />
              </button>
            </div>

            <div className="nav-group">
              <div className="group-label">Student Life</div>
              <button 
                className={`nav-item ${activeSection === 'church' ? 'active' : ''}`}
                onClick={() => scrollTo(churchRef, 'church')}
              >
                <div className="nav-icon">
                  <FaChurch />
                </div>
                <span>Spiritual Program</span>
                <FaArrowRight className="nav-arrow" />
              </button>
              
              <button 
                className={`nav-item ${activeSection === 'homework' ? 'active' : ''}`}
                onClick={() => scrollTo(homeworkRef, 'homework')}
              >
                <div className="nav-icon">
                  <FaBook />
                </div>
                <span>Homework Policy</span>
                <FaArrowRight className="nav-arrow" />
              </button>
            </div>

            <div className="nav-group">
              <div className="group-label">Academic Programs</div>
              <button 
                className={`nav-item ${activeSection === 'olevel' ? 'active' : ''}`}
                onClick={() => scrollTo(olevelRef, 'olevel')}
              >
                <div className="nav-icon">
                  <GiTeacher />
                </div>
                <span>O-Level Program</span>
                <FaArrowRight className="nav-arrow" />
              </button>
              
              <button 
                className={`nav-item ${activeSection === 'tvet' ? 'active' : ''}`}
                onClick={() => scrollTo(tvetRef, 'tvet')}
              >
                <div className="nav-icon">
                  <FaLaptopCode />
                </div>
                <span>TVET Programs</span>
                <FaArrowRight className="nav-arrow" />
              </button>
            </div>

            <div className="nav-group">
              <div className="group-label">Faculty</div>
              <button 
                className={`nav-item ${activeSection === 'teachers' ? 'active' : ''}`}
                onClick={() => scrollTo(teachersRef, 'teachers')}
              >
                <div className="nav-icon">
                  <FaChalkboardTeacher />
                </div>
                <span>Teaching Staff</span>
                <FaArrowRight className="nav-arrow" />
              </button>
            </div>
          </div>

          <div className="nav-footer">
            <div className="academic-support">
              <FaLightbulb className="support-icon" />
              <div>
                <p>Need Academic Support?</p>
                <span>Contact our academic office</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="modern-academic-content">
          {/* School Timetable Section */}
          <section ref={timetableRef} className="academic-section modern-section">
            <div className="section-header modern-header">
              <div className="header-content">
                <div className="icon-wrapper gradient-bg">
                  <FaCalendarAlt />
                </div>
                <div>
                  <h2>School Timetable</h2>
                  <p>Structured learning schedule for optimal academic performance</p>
                </div>
              </div>
              <div className="header-badge">
                <FaClock />
                <span>Updated Weekly</span>
              </div>
            </div>

            <div className="modern-card">
              <div className="card-intro">
                <h3>Academic Schedule Overview</h3>
                <p>
                  Our carefully crafted timetable balances academic rigor with essential breaks, 
                  ensuring students remain engaged and productive throughout the day.
                </p>
              </div>

              <div className="timetable-modern">
                <div className="timetable-grid modern-grid">
                  <div className="time-header">Time</div>
                  <div className="day-header">Monday</div>
                  <div className="day-header">Tuesday</div>
                  <div className="day-header">Wednesday</div>
                  <div className="day-header">Thursday</div>
                  <div className="day-header">Friday</div>

                  {/* Morning Session */}
                  <div className="time-slot primary">7:30 - 8:30</div>
                  <div className="subject assembly">Assembly</div>
                  <div className="subject assembly">Assembly</div>
                  <div className="subject assembly">Assembly</div>
                  <div className="subject assembly">Assembly</div>
                  <div className="subject assembly">Assembly</div>

                  <div className="time-slot">8:30 - 9:30</div>
                  <div className="subject math">Mathematics</div>
                  <div className="subject english">English</div>
                  <div className="subject science">Physics</div>
                  <div className="subject science">Chemistry</div>
                  <div className="subject science">Biology</div>

                  <div className="time-slot">9:30 - 10:30</div>
                  <div className="subject english">English</div>
                  <div className="subject math">Mathematics</div>
                  <div className="subject science">Chemistry</div>
                  <div className="subject science">Biology</div>
                  <div className="subject science">Physics</div>

                  {/* Break */}
                  <div className="time-slot break-slot">10:30 - 11:00</div>
                  <div className="break-cell" colSpan="5">
                    <div className="break-content">
                      <span>Morning Break</span>
                    </div>
                  </div>

                  {/* Mid-day Session */}
                  <div className="time-slot">11:00 - 12:00</div>
                  <div className="subject humanities">History</div>
                  <div className="subject humanities">Geography</div>
                  <div className="subject language">Kinyarwanda</div>
                  <div className="subject business">Entrepreneurship</div>
                  <div className="subject ict">ICT</div>

                  <div className="time-slot">12:00 - 13:00</div>
                  <div className="subject humanities">Geography</div>
                  <div className="subject humanities">History</div>
                  <div className="subject business">Entrepreneurship</div>
                  <div className="subject ict">ICT</div>
                  <div className="subject language">Kinyarwanda</div>

                  {/* Lunch Break */}
                  <div className="time-slot break-slot">13:00 - 14:00</div>
                  <div className="break-cell" colSpan="5">
                    <div className="break-content">
                      <span>Lunch Break</span>
                    </div>
                  </div>

                  {/* Afternoon Session */}
                  <div className="time-slot">14:00 - 15:00</div>
                  <div className="subject practical">Practical Session</div>
                  <div className="subject library">Library</div>
                  <div className="subject sports">Sports</div>
                  <div className="subject clubs">Clubs</div>
                  <div className="subject guidance">Guidance</div>
                </div>
              </div>

              <div className="card-notes">
                <div className="notes-header">
                  <FaShieldAlt />
                  <h4>Important Notes</h4>
                </div>
                <ul className="modern-list">
                  <li>TVET students have specialized practical sessions in the afternoon</li>
                  <li>Wednesday afternoons are dedicated to sports and physical education</li>
                  <li>Friday includes career guidance and counseling sessions</li>
                  <li>All students must maintain 75% minimum attendance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Assessment Timetable Section */}
          <section ref={assessmentRef} className="academic-section modern-section">
            <div className="section-header modern-header">
              <div className="header-content">
                <div className="icon-wrapper gradient-bg">
                  <FaClipboardCheck />
                </div>
                <div>
                  <h2>Assessment Schedule</h2>
                  <p>Comprehensive evaluation framework for student progress</p>
                </div>
              </div>
              <div className="header-badge">
                <FaChartLine />
                <span>Progress Tracking</span>
              </div>
            </div>

            <div className="modern-card">
              <div className="card-intro">
                <h3>Academic Evaluation Framework</h3>
                <p>
                  Our assessment strategy combines continuous evaluation with formal examinations 
                  to provide a holistic view of student development and readiness.
                </p>
              </div>

              <div className="assessment-modern">
                <div className="assessment-grid modern-grid">
                  <div className="assess-header">Term</div>
                  <div className="assess-header">Assessment Type</div>
                  <div className="assess-header">Dates</div>
                  <div className="assess-header">Weight</div>
                  <div className="assess-header">Focus Areas</div>

                  <div className="assess-term">1</div>
                  <div className="assess-type opening">Opening Tests</div>
                  <div className="assess-dates">Week 2-3</div>
                  <div className="assess-weight">
                    <div className="weight-bar" style={{width: '10%'}}>10%</div>
                  </div>
                  <div className="assess-focus">Foundation Knowledge Review</div>

                  <div className="assess-term">1</div>
                  <div className="assess-type midterm">Mid-Term Exams</div>
                  <div className="assess-dates">Week 6-7</div>
                  <div className="assess-weight">
                    <div className="weight-bar" style={{width: '20%'}}>20%</div>
                  </div>
                  <div className="assess-focus">First Half Curriculum</div>

                  <div className="assess-term">1</div>
                  <div className="assess-type final">End of Term Exams</div>
                  <div className="assess-dates">Week 12-13</div>
                  <div className="assess-weight">
                    <div className="weight-bar" style={{width: '30%'}}>30%</div>
                  </div>
                  <div className="assess-focus">Comprehensive Term Coverage</div>

                  <div className="assess-term">2</div>
                  <div className="assess-type opening">Opening Tests</div>
                  <div className="assess-dates">Week 2-3</div>
                  <div className="assess-weight">
                    <div className="weight-bar" style={{width: '10%'}}>10%</div>
                  </div>
                  <div className="assess-focus">Term 1 Review & New Concepts</div>

                  <div className="assess-term">2</div>
                  <div className="assess-type midterm">Mid-Term Exams</div>
                  <div className="assess-dates">Week 6-7</div>
                  <div className="assess-weight">
                    <div className="weight-bar" style={{width: '20%'}}>20%</div>
                  </div>
                  <div className="assess-focus">Progressive Learning Check</div>

                  <div className="assess-term">2</div>
                  <div className="assess-type mock">Mock Exams</div>
                  <div className="assess-dates">Week 10-11</div>
                  <div className="assess-weight">
                    <div className="weight-bar" style={{width: '30%'}}>30%</div>
                  </div>
                  <div className="assess-focus">National Exam Preparation</div>

                  <div className="assess-term">3</div>
                  <div className="assess-type national">National Exams Prep</div>
                  <div className="assess-dates">Ongoing</div>
                  <div className="assess-weight">
                    <div className="weight-bar" style={{width: '40%'}}>40%</div>
                  </div>
                  <div className="assess-focus">Final Examination Readiness</div>
                </div>
              </div>

              <div className="policy-highlights">
                <div className="policy-grid">
                  <div className="policy-card">
                    <div className="policy-icon">
                      <FaAward />
                    </div>
                    <h4>Continuous Assessment</h4>
                    <p>60% of final grade from ongoing evaluations and class participation</p>
                  </div>
                  <div className="policy-card">
                    <div className="policy-icon">
                      <FaGraduationCap />
                    </div>
                    <h4>National Exams</h4>
                    <p>40% weight from national examinations for certification</p>
                  </div>
                  <div className="policy-card">
                    <div className="policy-icon">
                      <FaHandsHelping />
                    </div>
                    <h4>Practical Assessment</h4>
                    <p>TVET programs include 50% practical skills evaluation</p>
                  </div>
                  <div className="policy-card">
                    <div className="policy-icon">
                      <FaShieldAlt />
                    </div>
                    <h4>Attendance Policy</h4>
                    <p>75% minimum attendance required for examination eligibility</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Church Program Section */}
          <section ref={churchRef} className="academic-section modern-section">
            <div className="section-header modern-header">
              <div className="header-content">
                <div className="icon-wrapper gradient-bg">
                  <FaChurch />
                </div>
                <div>
                  <h2>Spiritual Development Program</h2>
                  <p>Nurturing moral and ethical growth alongside academic excellence</p>
                </div>
              </div>
              <div className="header-badge">
                <FaUsers />
                <span>Inclusive Community</span>
              </div>
            </div>

            <div className="modern-card">
              <div className="card-intro">
                <h3>Holistic Student Development</h3>
                <p>
                  Our spiritual program complements academic learning by fostering moral values, 
                  ethical reasoning, and community engagement for well-rounded personal development.
                </p>
              </div>

              <div className="program-schedule">
                <div className="schedule-grid">
                  <div className="schedule-card">
                    <div className="card-header weekly">
                      <FaClock />
                      <h4>Weekly Services</h4>
                    </div>
                    <ul className="modern-list">
                      <li>
                        <strong>Monday:</strong> 
                        <span>Morning Prayer & Reflection (7:00-7:20)</span>
                      </li>
                      <li>
                        <strong>Wednesday:</strong> 
                        <span>Bible Study & Discussion (13:00-14:00)</span>
                      </li>
                      <li>
                        <strong>Friday:</strong> 
                        <span>Fellowship Service & Music (14:00-15:00)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="schedule-card">
                    <div className="card-header monthly">
                      <FaCalendarAlt />
                      <h4>Monthly Activities</h4>
                    </div>
                    <ul className="modern-list">
                      <li>First Sunday: School Community Mass</li>
                      <li>Second Wednesday: Interfaith Dialogue Session</li>
                      <li>Third Week: Community Outreach Program</li>
                      <li>Last Friday: Leadership & Ethics Workshop</li>
                    </ul>
                  </div>

                  <div className="schedule-card">
                    <div className="card-header special">
                      <FaStar />
                      <h4>Special Events</h4>
                    </div>
                    <ul className="modern-list">
                      <li>Easter Celebration & Cultural Performances</li>
                      <li>Christmas Carol Service & Gift Drive</li>
                      <li>Graduation Thanksgiving Ceremony</li>
                      <li>Annual Inter-school Faith Conference</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="inclusion-policy">
                <div className="inclusion-header">
                  <FaLightbulb />
                  <h4>Inclusion & Respect Policy</h4>
                </div>
                <div className="policy-points">
                  <div className="policy-point">
                    <div className="point-icon">✓</div>
                    <div>
                      <strong>Voluntary Participation:</strong> All religious activities are optional
                    </div>
                  </div>
                  <div className="policy-point">
                    <div className="point-icon">✓</div>
                    <div>
                      <strong>Multi-faith Respect:</strong> We honor all religious traditions
                    </div>
                  </div>
                  <div className="policy-point">
                    <div className="point-icon">✓</div>
                    <div>
                      <strong>Interfaith Dialogue:</strong> Promoting understanding across beliefs
                    </div>
                  </div>
                  <div className="policy-point">
                    <div className="point-icon">✓</div>
                    <div>
                      <strong>Ethical Education:</strong> Alternative ethics classes available
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Continue with other sections in similar modern structure... */}
          {/* Homework Section */}
          <section ref={homeworkRef} className="academic-section modern-section">
            <div className="section-header modern-header">
              <div className="header-content">
                <div className="icon-wrapper gradient-bg">
                  <FaBook />
                </div>
                <div>
                  <h2>Homework & Assignments</h2>
                  <p>Reinforcing classroom learning through structured practice</p>
                </div>
              </div>
              <div className="header-badge">
                <FaRocket />
                <span>Learning Reinforcement</span>
              </div>
            </div>

            <div className="modern-card">
              <div className="card-intro">
                <h3>Academic Reinforcement Strategy</h3>
                <p>
                  Our homework policy is designed to strengthen classroom learning while 
                  teaching students time management and independent study skills.
                </p>
              </div>

              <div className="homework-structure">
                <div className="structure-grid">
                  <div className="structure-card">
                    <div className="structure-icon frequency">
                      <FaClock />
                    </div>
                    <h4>Frequency & Distribution</h4>
                    <ul>
                      <li>Daily assignments in core academic subjects</li>
                      <li>Weekly projects for practical and creative subjects</li>
                      <li>Term research papers for senior students</li>
                      <li>Weekend revision packages for exam classes</li>
                    </ul>
                  </div>

                  <div className="structure-card">
                    <div className="structure-icon time">
                      <FaChartLine />
                    </div>
                    <h4>Time Allocation Guidelines</h4>
                    <ul>
                      <li><strong>Junior Students (S1-S2):</strong> 1-2 hours daily</li>
                      <li><strong>Senior Students (S3-S4):</strong> 2-3 hours daily</li>
                      <li><strong>TVET Students:</strong> Variable based on practical work</li>
                      <li><strong>Exam Classes:</strong> Additional weekend preparation</li>
                    </ul>
                  </div>

                  <div className="structure-card">
                    <div className="structure-icon submission">
                      <FaClipboardCheck />
                    </div>
                    <h4>Submission & Evaluation</h4>
                    <ul>
                      <li>Digital submission via school learning portal</li>
                      <li>Physical submission for practical assignments</li>
                      <li>Strict adherence to submission deadlines</li>
                      <li>Comprehensive feedback within 3 working days</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="support-system">
                <div className="support-header">
                  <FaHandsHelping />
                  <h4>Academic Support System</h4>
                </div>
                <div className="support-grid">
                  <div className="support-item">
                    <h5>After-School Homework Club</h5>
                    <p>Monday - Thursday (15:30 - 17:00)</p>
                    <span>Supervised study environment with tutor support</span>
                  </div>
                  <div className="support-item">
                    <h5>Teacher Consultation Hours</h5>
                    <p>Posted weekly in classrooms</p>
                    <span>Individualized academic guidance and support</span>
                  </div>
                  <div className="support-item">
                    <h5>Digital Learning Resources</h5>
                    <p>24/7 online access</p>
                    <span>Comprehensive library of learning materials</span>
                  </div>
                  <div className="support-item">
                    <h5>Peer Tutoring Program</h5>
                    <p>Structured mentoring</p>
                    <span>Senior students supporting junior learners</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teachers Section - Modern Version */}
          <section ref={teachersRef} className="academic-section modern-section">
            <div className="section-header modern-header">
              <div className="header-content">
                <div className="icon-wrapper gradient-bg">
                  <FaChalkboardTeacher />
                </div>
                <div>
                  <h2>Our Distinguished Faculty</h2>
                  <p>Meet our team of dedicated and highly qualified educators</p>
                </div>
              </div>
              <div className="header-badge">
                <FaStar />
                <span>Expert Educators</span>
              </div>
            </div>

            <div className="modern-card">
              <div className="card-intro">
                <h3>Committed to Educational Excellence</h3>
                <p>
                  Our teaching staff combines academic expertise with practical experience 
                  to provide students with a comprehensive and engaging learning experience.
                </p>
              </div>

              <div className="faculty-display">
                {teachers.map(teacher => (
                  <div key={teacher.id} className="faculty-card">
                    <div className="faculty-header">
                      <div className="faculty-image">
                        <img src={teacher.image} alt={teacher.name} />
                        <div className="faculty-social">
                          <a href={teacher.social.whatsapp} className="social-link whatsapp">
                            <FaWhatsapp />
                          </a>
                          <a href={teacher.social.twitter} className="social-link twitter">
                            <FaTwitter />
                          </a>
                        </div>
                      </div>
                      <div className="faculty-info">
                        <h4>{teacher.name}</h4>
                        <p className="faculty-role">{teacher.role}</p>
                        <p className="faculty-qualification">{teacher.qualification}</p>
                        <div className="faculty-department">
                          <span>{teacher.department} Department</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="faculty-details">
                      <div className="expertise-area">
                        <h5>Areas of Expertise</h5>
                        <div className="expertise-tags">
                          {teacher.expertise.map((skill, index) => (
                            <span key={index} className="expertise-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="achievements">
                        <h5>Notable Achievements</h5>
                        <ul>
                          {teacher.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="faculty-stats">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">Qualified Educators</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">70%</div>
                    <div className="stat-label">Hold Master's Degrees</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">15+</div>
                    <div className="stat-label">Years Average Experience</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">Annual</div>
                    <div className="stat-label">Professional Development</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TVET Programs Section */}
          <section ref={tvetRef} className="academic-section modern-section">
            <div className="section-header modern-header">
              <div className="header-content">
                <div className="icon-wrapper gradient-bg">
                  <FaLaptopCode />
                </div>
                <div>
                  <h2>TVET Programs</h2>
                  <p>Practical skills training for career readiness and entrepreneurship</p>
                </div>
              </div>
              <div className="header-badge">
                <FaRocket />
                <span>Career Focused</span>
              </div>
            </div>

            <div className="modern-card">
              <div className="card-intro">
                <h3>Technical and Vocational Education</h3>
                <p>
                  Our TVET programs are designed to equip students with market-relevant skills 
                  through hands-on training and industry partnerships.
                </p>
              </div>

              <div className="program-highlights">
                <div className="highlight-banner">
                  <div className="highlight-item">
                    <FaUsers />
                    <div>
                      <span>500+</span>
                      <small>TVET Students</small>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <FaAward />
                    <div>
                      <span>92%</span>
                      <small>Employment Rate</small>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <FaHandsHelping />
                    <div>
                      <span>25+</span>
                      <small>Industry Partners</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tvet-programs-grid">
                {tvetPrograms.map(program => {
                  const ProgramIcon = program.icon;
                  return (
                    <div key={program.id} className={`tvet-program-card ${program.color}`}>
                      <div className="program-header">
                        <div className="program-icon">
                          <ProgramIcon />
                        </div>
                        <h4>{program.name}</h4>
                        <span className="program-trade">{program.tradeName}</span>
                      </div>
                      
                      <div className="program-details">
                        <div className="detail-row">
                          <span>Levels:</span>
                          <strong>{program.levels}</strong>
                        </div>
                        <div className="detail-row">
                          <span>Duration:</span>
                          <strong>{program.tradeDuration}</strong>
                        </div>
                        <div className="detail-row">
                          <span>Students:</span>
                          <strong>{program.totalStudents}</strong>
                        </div>
                      </div>

                      <div className="program-stats">
                        <div className="stat">
                          <span>Employment</span>
                          <strong>{program.stats.employment}</strong>
                        </div>
                        <div className="stat">
                          <span>Projects</span>
                          <strong>{program.stats.projects}</strong>
                        </div>
                        <div className="stat">
                          <span>Certifications</span>
                          <strong>{program.stats.certifications}</strong>
                        </div>
                      </div>

                      <div className="program-modules">
                        <h5>Key Modules:</h5>
                        <div className="modules-list">
                          {program.modules.map((module, index) => (
                            <span key={index} className="module-tag">{module}</span>
                          ))}
                        </div>
                      </div>

                      <button className="program-cta">
                        Learn More
                        <FaArrowRight />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* O-Level Section and other sections would continue in similar modern structure... */}

        </main>
      </div>
    </div>
  );
};

export default Academic;