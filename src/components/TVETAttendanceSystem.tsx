// components/TVETAttendanceSystem.js
import React, { useState, useEffect, useMemo } from 'react';
import {
  FaCalendarAlt,
  FaUserCheck,
  FaUserTimes,
  FaClock,
  FaChartBar,
  FaDownload,
  FaFilter,
  FaSearch,
  FaSync,
  FaPrint,
  FaEnvelope,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
  FaGraduationCap,
  FaLaptopCode,
  FaNetworkWired,
  FaHotel,
  FaHardHat,
  FaCalculator,
  FaFilm,
  FaMicrochip,
  FaArrowRight,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSchool,
  FaChalkboardTeacher,
  FaAward,
  FaShieldAlt,
  FaUserTie,
  FaUserGraduate,
  FaSms,
  FaWhatsapp,
  FaBell,
  FaCog,
  FaUserShield,
  FaClipboardList,
  FaHistory,
  FaPaperPlane,
  FaFileExport,
  FaUserEdit,
  FaIdCard,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarDay,
  FaChartLine,
  FaDatabase,
  FaCogs,
  FaUserCog,
  FaTasks,
  FaRegCalendarCheck,
  FaRegChartBar,
  FaRegFileAlt,
  FaRegUser,
  FaRegClock,
  FaBuilding,
  FaUserFriends,
  FaBook,
  FaTools,
  FaBriefcase,
  FaIndustry
} from 'react-icons/fa';
import './TVETAttendanceSystem.css';

const TVETAttendanceSystem = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('daily');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showRoleManager, setShowRoleManager] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [whatsappIntegration, setWhatsappIntegration] = useState(true);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [dmReports, setDmReports] = useState([]);
  const [activeTab, setActiveTab] = useState('attendance');
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [bulkAction, setBulkAction] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Comprehensive TVET Programs with Levels L3 to L5
  const tvetPrograms = [
    {
      id: 1,
      name: "SOFTWARE DEVELOPMENT (SOD)",
      code: "SOD",
      tradeName: "Software Development Specialist",
      levels: ["L3", "L4", "L5"],
      totalStudents: 150,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2025",
      modules: [
        "Programming Fundamentals",
        "Web Development",
        "Database Systems",
        "Mobile App Development",
        "Software Engineering",
        "Cloud Computing",
        "Cybersecurity Fundamentals"
      ],
      icon: FaLaptopCode,
      color: "from-blue-500 to-cyan-500",
      bgColor: "#3B82F6",
      stats: { 
        employment: "95%", 
        projects: 120, 
        certifications: 8,
        completion: "92%",
        satisfaction: "94%"
      },
      department: "Information Technology",
      location: "Building A, Lab Complex",
      coordinator: "Dr. Michael Brown",
      classes: [
        {
          id: "SOD-L3",
          name: "SOD Level 3",
          level: "L3",
          classTeacher: "Sarah Johnson",
          classChief: "John Smith",
          classTeacherId: "CT001",
          classChiefId: "CC001",
          room: "Lab 101",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 50,
          currentAttendance: 45
        },
        {
          id: "SOD-L4",
          name: "SOD Level 4",
          level: "L4",
          classTeacher: "Robert Wilson",
          classChief: "Alice Johnson",
          classTeacherId: "CT002",
          classChiefId: "CC002",
          room: "Lab 102",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 50,
          currentAttendance: 48
        },
        {
          id: "SOD-L5",
          name: "SOD Level 5",
          level: "L5",
          classTeacher: "Emily Davis",
          classChief: "Mike Wilson",
          classTeacherId: "CT003",
          classChiefId: "CC003",
          room: "Lab 103",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 50,
          currentAttendance: 47
        }
      ]
    },
    {
      id: 2,
      name: "NETWORKING (NET)",
      code: "NET",
      tradeName: "Network Technician",
      levels: ["L3", "L4", "L5"],
      totalStudents: 135,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2027",
      modules: [
        "Network Fundamentals",
        "Routing & Switching",
        "Network Security",
        "Wireless Networks",
        "Cloud Computing",
        "Network Administration",
        "Troubleshooting"
      ],
      icon: FaNetworkWired,
      color: "from-green-500 to-emerald-500",
      bgColor: "#10B981",
      stats: { 
        employment: "92%", 
        projects: 85, 
        certifications: 6,
        completion: "89%",
        satisfaction: "91%"
      },
      department: "Information Technology",
      location: "Building A, Network Lab",
      coordinator: "Ms. Sarah Wilson",
      classes: [
        {
          id: "NET-L3",
          name: "NET Level 3",
          level: "L3",
          classTeacher: "David Miller",
          classChief: "James Brown",
          classTeacherId: "CT004",
          classChiefId: "CC004",
          room: "Lab 201",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 45,
          currentAttendance: 42
        },
        {
          id: "NET-L4",
          name: "NET Level 4",
          level: "L4",
          classTeacher: "Lisa Anderson",
          classChief: "Patricia White",
          classTeacherId: "CT005",
          classChiefId: "CC005",
          room: "Lab 202",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 45,
          currentAttendance: 43
        },
        {
          id: "NET-L5",
          name: "NET Level 5",
          level: "L5",
          classTeacher: "Thomas Clark",
          classChief: "Richard Moore",
          classTeacherId: "CT006",
          classChiefId: "CC006",
          room: "Lab 203",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 45,
          currentAttendance: 44
        }
      ]
    },
    {
      id: 3,
      name: "TOURISM (TUR)",
      code: "TUR",
      tradeName: "Tourism & Hospitality Specialist",
      levels: ["L3", "L4", "L5"],
      totalStudents: 120,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2027",
      modules: [
        "Tourism Operations",
        "Hospitality Management",
        "Customer Service",
        "Event Planning",
        "Cultural Tourism",
        "Travel Agency Operations",
        "Tour Guiding"
      ],
      icon: FaHotel,
      color: "from-purple-500 to-pink-500",
      bgColor: "#8B5CF6",
      stats: { 
        employment: "88%", 
        projects: 45, 
        certifications: 5,
        completion: "85%",
        satisfaction: "87%"
      },
      department: "Hospitality & Tourism",
      location: "Building B, Hospitality Center",
      coordinator: "Mr. Robert Taylor",
      classes: [
        {
          id: "TUR-L3",
          name: "TUR Level 3",
          level: "L3",
          classTeacher: "Jennifer Martinez",
          classChief: "Susan Wilson",
          classTeacherId: "CT007",
          classChiefId: "CC007",
          room: "Room 301",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 40,
          currentAttendance: 38
        },
        {
          id: "TUR-L4",
          name: "TUR Level 4",
          level: "L4",
          classTeacher: "Christopher Lee",
          classChief: "Nancy Davis",
          classTeacherId: "CT008",
          classChiefId: "CC008",
          room: "Room 302",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 40,
          currentAttendance: 37
        },
        {
          id: "TUR-L5",
          name: "TUR Level 5",
          level: "L5",
          classTeacher: "Amanda Garcia",
          classChief: "Karen Harris",
          classTeacherId: "CT009",
          classChiefId: "CC009",
          room: "Room 303",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 40,
          currentAttendance: 39
        }
      ]
    },
    {
      id: 4,
      name: "MASONRY (MAS)",
      code: "MAS",
      tradeName: "Construction Mason",
      levels: ["L3", "L4", "L5"],
      totalStudents: 90,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2027",
      modules: [
        "Brick Laying",
        "Concrete Work",
        "Construction Safety",
        "Blueprint Reading",
        "Building Maintenance",
        "Masonry Tools",
        "Site Management"
      ],
      icon: FaHardHat,
      color: "from-orange-500 to-red-500",
      bgColor: "#F59E0B",
      stats: { 
        employment: "90%", 
        projects: 60, 
        certifications: 4,
        completion: "88%",
        satisfaction: "89%"
      },
      department: "Construction",
      location: "Workshop C",
      coordinator: "Eng. Patrick Ndayisaba",
      classes: [
        {
          id: "MAS-L3",
          name: "MAS Level 3",
          level: "L3",
          classTeacher: "Daniel Thompson",
          classChief: "Mark Robinson",
          classTeacherId: "CT010",
          classChiefId: "CC010",
          room: "Workshop 101",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 30,
          currentAttendance: 28
        },
        {
          id: "MAS-L4",
          name: "MAS Level 4",
          level: "L4",
          classTeacher: "Paul Walker",
          classChief: "Steven Lewis",
          classTeacherId: "CT011",
          classChiefId: "CC011",
          room: "Workshop 102",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 30,
          currentAttendance: 29
        },
        {
          id: "MAS-L5",
          name: "MAS Level 5",
          level: "L5",
          classTeacher: "Kevin Scott",
          classChief: "Edward Young",
          classTeacherId: "CT012",
          classChiefId: "CC012",
          room: "Workshop 103",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 30,
          currentAttendance: 27
        }
      ]
    },
    {
      id: 5,
      name: "ACCOUNTING (ACC)",
      code: "ACC",
      tradeName: "Accounting Technician",
      levels: ["L3", "L4", "L5"],
      totalStudents: 135,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2027",
      modules: [
        "Financial Accounting",
        "Taxation",
        "Cost Accounting",
        "Accounting Software",
        "Business Finance",
        "Auditing",
        "Management Accounting"
      ],
      icon: FaCalculator,
      color: "from-teal-500 to-blue-500",
      bgColor: "#06B6D4",
      stats: { 
        employment: "94%", 
        projects: 95, 
        certifications: 7,
        completion: "91%",
        satisfaction: "93%"
      },
      department: "Business Studies",
      location: "Building D, Business Center",
      coordinator: "Mrs. Grace Uwimana",
      classes: [
        {
          id: "ACC-L3",
          name: "ACC Level 3",
          level: "L3",
          classTeacher: "Michelle King",
          classChief: "Sarah Adams",
          classTeacherId: "CT013",
          classChiefId: "CC013",
          room: "Room 401",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 45,
          currentAttendance: 43
        },
        {
          id: "ACC-L4",
          name: "ACC Level 4",
          level: "L4",
          classTeacher: "Laura Hall",
          classChief: "Jessica Baker",
          classTeacherId: "CT014",
          classChiefId: "CC014",
          room: "Room 402",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 45,
          currentAttendance: 44
        },
        {
          id: "ACC-L5",
          name: "ACC Level 5",
          level: "L5",
          classTeacher: "Ashley Nelson",
          classChief: "Amanda Carter",
          classTeacherId: "CT015",
          classChiefId: "CC015",
          room: "Room 403",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 45,
          currentAttendance: 42
        }
      ]
    },
    {
      id: 6,
      name: "MULTIMEDIA PRODUCTION (MMP)",
      code: "MMP",
      tradeName: "Multimedia Producer",
      levels: ["L3", "L4", "L5"],
      totalStudents: 105,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2027",
      modules: [
        "Graphic Design",
        "Video Production",
        "Animation",
        "Digital Marketing",
        "Audio Production",
        "Web Design",
        "3D Modeling"
      ],
      icon: FaFilm,
      color: "from-pink-500 to-rose-500",
      bgColor: "#EC4899",
      stats: { 
        employment: "89%", 
        projects: 75, 
        certifications: 6,
        completion: "86%",
        satisfaction: "88%"
      },
      department: "Creative Arts",
      location: "Media Lab, Building E",
      coordinator: "Mr. Thomas Clark",
      classes: [
        {
          id: "MMP-L3",
          name: "MMP Level 3",
          level: "L3",
          classTeacher: "Brian Taylor",
          classChief: "Matthew Evans",
          classTeacherId: "CT016",
          classChiefId: "CC016",
          room: "Media Lab 101",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 35,
          currentAttendance: 33
        },
        {
          id: "MMP-L4",
          name: "MMP Level 4",
          level: "L4",
          classTeacher: "Jason Allen",
          classChief: "Timothy Hill",
          classTeacherId: "CT017",
          classChiefId: "CC017",
          room: "Media Lab 102",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 35,
          currentAttendance: 34
        },
        {
          id: "MMP-L5",
          name: "MMP Level 5",
          level: "L5",
          classTeacher: "Jeffrey Wright",
          classChief: "Joshua Lopez",
          classTeacherId: "CT018",
          classChiefId: "CC018",
          room: "Media Lab 103",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 35,
          currentAttendance: 32
        }
      ]
    },
    {
      id: 7,
      name: "ELECTRONICS (ELC)",
      code: "ELC",
      tradeName: "Electronics Technician",
      levels: ["L3", "L4", "L5"],
      totalStudents: 120,
      levelDuration: "1 Year per Level",
      tradeDuration: "3 Years",
      academicYear: "2024-2027",
      modules: [
        "Circuit Design",
        "Digital Electronics",
        "Microcontrollers",
        "Electronic Maintenance",
        "Renewable Energy Systems",
        "Instrumentation",
        "PCB Design"
      ],
      icon: FaMicrochip,
      color: "from-indigo-500 to-purple-500",
      bgColor: "#6366F1",
      stats: { 
        employment: "91%", 
        projects: 55, 
        certifications: 5,
        completion: "87%",
        satisfaction: "90%"
      },
      department: "Engineering",
      location: "Electronics Lab, Building F",
      coordinator: "Eng. Richard Moore",
      classes: [
        {
          id: "ELC-L3",
          name: "ELC Level 3",
          level: "L3",
          classTeacher: "Ronald Green",
          classChief: "Kevin King",
          classTeacherId: "CT019",
          classChiefId: "CC019",
          room: "Electronics Lab 101",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 40,
          currentAttendance: 38
        },
        {
          id: "ELC-L4",
          name: "ELC Level 4",
          level: "L4",
          classTeacher: "Gary Adams",
          classChief: "Scott Scott",
          classTeacherId: "CT020",
          classChiefId: "CC020",
          room: "Electronics Lab 102",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 40,
          currentAttendance: 39
        },
        {
          id: "ELC-L5",
          name: "ELC Level 5",
          level: "L5",
          classTeacher: "Eric Baker",
          classChief: "Stephen Gonzalez",
          classTeacherId: "CT021",
          classChiefId: "CC021",
          room: "Electronics Lab 103",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 40,
          currentAttendance: 37
        }
      ]
    }
  ];

  // Get all classes flattened for easier access
  const allClasses = useMemo(() => {
    return tvetPrograms.flatMap(program => 
      program.classes.map(cls => ({
        ...cls,
        programName: program.name,
        programCode: program.code,
        programId: program.id
      }))
    );
  }, []);

  // Role definitions with comprehensive permissions
  const roles = {
    CLASS_CHIEF: {
      name: 'Class Chief',
      permissions: [
        'mark_attendance', 
        'view_class', 
        'export_reports', 
        'report_to_dm',
        'view_student_details',
        'add_remarks'
      ],
      programs: [1, 2],
      dashboard: '/class-chief'
    },
    CLASS_TEACHER: {
      name: 'Class Teacher',
      permissions: [
        'mark_attendance', 
        'view_class', 
        'export_reports', 
        'manage_remarks', 
        'verify_attendance', 
        'report_to_dm',
        'view_analytics',
        'manage_students',
        'bulk_actions'
      ],
      programs: [1, 2, 3, 4, 5, 6, 7],
      dashboard: '/class-teacher'
    },
    DOS: {
      name: 'DOS',
      permissions: [
        'view_all', 
        'export_reports', 
        'analytics', 
        'receive_reports',
        'system_reports',
        'performance_metrics'
      ],
      programs: 'all',
      dashboard: '/dos'
    },
    DM: {
      name: 'DM',
      permissions: [
        'view_all', 
        'export_reports', 
        'analytics', 
        'receive_reports', 
        'system_management', 
        'view_dm_reports',
        'user_management',
        'system_config'
      ],
      programs: 'all',
      dashboard: '/dm'
    },
    ADMIN: {
      name: 'Administrator',
      permissions: [
        'all_access'
      ],
      programs: 'all',
      dashboard: '/admin'
    }
  };

  // Initialize current user and load data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('apaer_current_user')) || {
      id: 1,
      name: 'Admin User',
      email: 'admin@apaer.ac.rw',
      role: 'DM',
      programAccess: 'all',
      fullName: 'Dr. James Mugisha',
      avatar: '👨‍💼',
      assignedClasses: allClasses.map(cls => cls.id) // DM sees all classes
    };
    setCurrentUser(user);
    loadDmReports();
    loadSystemStats();
  }, []);

  // System statistics
  const [systemStats, setSystemStats] = useState({
    totalStudents: 0,
    totalPrograms: 0,
    totalClasses: 0,
    todayAttendance: 0,
    overallAttendance: 0,
    dmReportsToday: 0,
    notificationsSent: 0
  });

  const loadSystemStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const allAttendance = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
    const todayRecords = allAttendance.filter(record => record.date === today);
    
    const totalStudents = students.length;
    const presentToday = todayRecords.filter(record => record.status === 'present').length;
    const attendanceRate = totalStudents > 0 ? (presentToday / totalStudents) * 100 : 0;

    setSystemStats({
      totalStudents,
      totalPrograms: tvetPrograms.length,
      totalClasses: allClasses.length,
      todayAttendance: presentToday,
      overallAttendance: Math.round(attendanceRate),
      dmReportsToday: dmReports.filter(report => report.date === today).length,
      notificationsSent: JSON.parse(localStorage.getItem('attendance_notifications') || '[]').length
    });
  };

  // Load DM reports from localStorage
  const loadDmReports = () => {
    const reports = JSON.parse(localStorage.getItem('dm_attendance_reports') || '[]');
    setDmReports(reports);
  };

  // Generate comprehensive sample students for all classes
  const generateStudents = () => {
    const students = [];
    let studentId = 1;
    
    allClasses.forEach(classInfo => {
      const program = tvetPrograms.find(p => p.id === classInfo.programId);
      
      for (let i = 0; i < classInfo.totalStudents; i++) {
        const parentPhone = `+25078${Math.floor(1000000 + Math.random() * 9000000)}`;
        const firstName = ['Alice', 'Bob', 'Claire', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Irene', 'Jack'][i % 10];
        const lastName = ['Uwase', 'Mugisha', 'Iradukunda', 'Nshuti', 'Uwimana', 'Mutabazi', 'Nyirahabimana', 'Ndayisaba', 'Uwimbabazi', 'Habimana'][i % 10];
        
        students.push({
          id: studentId++,
          name: `${firstName} ${lastName}`,
          studentId: `${classInfo.programCode}${classInfo.level}${String(i+1).padStart(3, '0')}`,
          program: program.name,
          programCode: program.code,
          programId: program.id,
          classId: classInfo.id,
          className: classInfo.name,
          level: classInfo.level,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@apaer.ac.rw`,
          phone: `+25078${Math.floor(1000000 + Math.random() * 9000000)}`,
          parentPhone: parentPhone,
          parentWhatsapp: parentPhone,
          joinDate: '2024-01-15',
          status: 'active',
          classChief: classInfo.classChief,
          classTeacher: classInfo.classTeacher,
          classChiefId: classInfo.classChiefId,
          classTeacherId: classInfo.classTeacherId,
          department: program.department,
          location: classInfo.room,
          coordinator: program.coordinator,
          avatar: '👨‍🎓',
          address: `KK 15 Ave, Kigali, Rwanda`,
          emergencyContact: `+25073${Math.floor(1000000 + Math.random() * 9000000)}`,
          enrollmentStatus: 'Active',
          scholarship: Math.random() > 0.7 ? 'Government Scholarship' : 'Self-Sponsored'
        });
      }
    });
    
    return students;
  };

  const students = useMemo(() => generateStudents(), []);

  const [stats, setStats] = useState({
    totalStudents: 0,
    present: 0,
    absent: 0,
    late: 0,
    attendanceRate: 0,
    programStats: {},
    classStats: {}
  });

  useEffect(() => {
    loadAttendanceData();
  }, [selectedDate, selectedProgram, selectedLevel, selectedClass, currentUser]);

  const loadAttendanceData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredStudents = students;
      
      // Apply role-based filtering
      if (currentUser && currentUser.role !== 'DOS' && currentUser.role !== 'DM' && currentUser.role !== 'ADMIN') {
        if (currentUser.assignedClasses && currentUser.assignedClasses !== 'all') {
          filteredStudents = filteredStudents.filter(student => 
            currentUser.assignedClasses.includes(student.classId)
          );
        }
      }
      
      const mockData = filteredStudents
        .filter(student => 
          (!selectedProgram || student.programId.toString() === selectedProgram) &&
          (!selectedLevel || student.level === selectedLevel) &&
          (!selectedClass || student.classId === selectedClass)
        )
        .map(student => {
          const status = Math.random() > 0.3 ? 'present' : Math.random() > 0.5 ? 'absent' : 'late';
          const practicalStatus = ['Completed', 'In Progress', 'Not Started', 'Excused'][Math.floor(Math.random() * 4)];
          return {
            ...student,
            date: selectedDate,
            status: status,
            checkInTime: status === 'present' ? (Math.random() > 0.2 ? '08:00' : '08:30') : '--:--',
            checkOutTime: status === 'present' ? '16:00' : '--:--',
            remarks: status === 'absent' ? 'No show' : status === 'late' ? 'Late arrival' : '',
            markedBy: currentUser?.name || 'System',
            timestamp: new Date().toISOString(),
            practicalSession: practicalStatus,
            verifiedBy: status === 'present' ? null : currentUser?.role === 'CLASS_TEACHER' ? currentUser.name : null,
            session: ['Morning', 'Afternoon'][Math.floor(Math.random() * 2)],
            module: student.programId === 1 ? 
              ['Programming', 'Web Dev', 'Database'][Math.floor(Math.random() * 3)] :
              student.programId === 2 ? 
              ['Networking', 'Security', 'Cloud'][Math.floor(Math.random() * 3)] :
              'General'
          };
        });

      setAttendanceData(mockData);
      setFilteredData(mockData);
      calculateStats(mockData);
      setIsLoading(false);
    }, 1000);
  };

  const calculateStats = (data) => {
    const total = data.length;
    const present = data.filter(item => item.status === 'present').length;
    const absent = data.filter(item => item.status === 'absent').length;
    const late = data.filter(item => item.status === 'late').length;
    const attendanceRate = total > 0 ? (present / total) * 100 : 0;

    const programStats = {};
    const classStats = {};
    
    tvetPrograms.forEach(program => {
      const programStudents = data.filter(item => item.programId === program.id);
      const programPresent = programStudents.filter(item => item.status === 'present').length;
      programStats[program.id] = {
        total: programStudents.length,
        present: programPresent,
        rate: programStudents.length > 0 ? (programPresent / programStudents.length) * 100 : 0,
        absent: programStudents.filter(item => item.status === 'absent').length,
        late: programStudents.filter(item => item.status === 'late').length
      };
    });

    allClasses.forEach(classInfo => {
      const classStudents = data.filter(item => item.classId === classInfo.id);
      const classPresent = classStudents.filter(item => item.status === 'present').length;
      classStats[classInfo.id] = {
        total: classStudents.length,
        present: classPresent,
        rate: classStudents.length > 0 ? (classPresent / classStudents.length) * 100 : 0,
        absent: classStudents.filter(item => item.status === 'absent').length,
        late: classStudents.filter(item => item.status === 'late').length
      };
    });

    setStats({
      totalStudents: total,
      present,
      absent,
      late,
      attendanceRate: Math.round(attendanceRate),
      programStats,
      classStats
    });
  };

  // Enhanced attendance update with comprehensive tracking
  const updateAttendanceStatus = async (studentId, status, remarks = '') => {
    const updatedData = attendanceData.map(item =>
      item.id === studentId ? { 
        ...item, 
        status, 
        timestamp: new Date().toISOString(),
        markedBy: currentUser?.name || 'System',
        checkInTime: status === 'present' ? new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : '--:--',
        remarks: remarks || (status === 'absent' ? 'Marked absent' : status === 'late' ? 'Late arrival' : ''),
        verifiedBy: currentUser?.role === 'CLASS_TEACHER' ? currentUser.name : null
      } : item
    );
    
    setAttendanceData(updatedData);
    setFilteredData(updatedData);
    calculateStats(updatedData);
    
    // Save to localStorage
    const existingRecords = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
    const newRecord = updatedData.find(item => item.id === studentId);
    const filteredRecords = existingRecords.filter(record => 
      !(record.id === studentId && record.date === selectedDate)
    );
    localStorage.setItem('tvet_attendance', JSON.stringify([...filteredRecords, newRecord]));

    // Report to DM for absent/late students
    if ((status === 'absent' || status === 'late') && hasPermission('report_to_dm')) {
      await reportToDM(newRecord);
    }

    // Send notifications for absent students
    if (status === 'absent' && (smsNotifications || whatsappIntegration)) {
      await sendAbsenceNotification(newRecord);
    }

    // Update system stats
    loadSystemStats();
  };

  // Bulk update attendance
  const updateBulkAttendance = async () => {
    if (!bulkAction || selectedStudents.length === 0) return;

    const updatedData = attendanceData.map(item =>
      selectedStudents.includes(item.id) ? { 
        ...item, 
        status: bulkAction, 
        timestamp: new Date().toISOString(),
        markedBy: currentUser?.name || 'System',
        checkInTime: bulkAction === 'present' ? new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : '--:--',
        remarks: bulkAction === 'absent' ? 'Bulk marked absent' : bulkAction === 'late' ? 'Bulk marked late' : '',
        verifiedBy: currentUser?.role === 'CLASS_TEACHER' ? currentUser.name : null
      } : item
    );
    
    setAttendanceData(updatedData);
    setFilteredData(updatedData);
    calculateStats(updatedData);

    // Save all updated records
    const existingRecords = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
    const updatedRecords = updatedData.filter(item => selectedStudents.includes(item.id));
    const otherRecords = existingRecords.filter(record => 
      !updatedRecords.some(updated => updated.id === record.id && updated.date === record.date)
    );
    localStorage.setItem('tvet_attendance', JSON.stringify([...otherRecords, ...updatedRecords]));

    // Report to DM for absent/late students
    const absentLateStudents = updatedRecords.filter(record => 
      record.status === 'absent' || record.status === 'late'
    );
    
    for (const record of absentLateStudents) {
      if (hasPermission('report_to_dm')) {
        await reportToDM(record);
      }
    }

    // Send notifications
    const absentStudents = updatedRecords.filter(record => record.status === 'absent');
    for (const record of absentStudents) {
      if (smsNotifications || whatsappIntegration) {
        await sendAbsenceNotification(record);
      }
    }

    // Reset bulk selection
    setSelectedStudents([]);
    setBulkAction('');
    alert(`Bulk action completed: ${updatedRecords.length} students updated`);
  };

  // Comprehensive DM reporting
  const reportToDM = async (studentRecord) => {
    const classInfo = allClasses.find(cls => cls.id === studentRecord.classId);
    const program = tvetPrograms.find(p => p.id === studentRecord.programId);

    const dmReport = {
      id: Date.now(),
      studentId: studentRecord.id,
      studentName: studentRecord.name,
      studentCode: studentRecord.studentId,
      program: studentRecord.program,
      programCode: studentRecord.programCode,
      className: studentRecord.className,
      classId: studentRecord.classId,
      level: studentRecord.level,
      status: studentRecord.status,
      date: studentRecord.date,
      time: studentRecord.checkInTime,
      remarks: studentRecord.remarks,
      reportedBy: currentUser?.name,
      reporterRole: currentUser?.role,
      classChief: studentRecord.classChief,
      classTeacher: studentRecord.classTeacher,
      timestamp: new Date().toISOString(),
      resolved: false,
      priority: studentRecord.status === 'absent' ? 'high' : 'medium',
      followUpRequired: true,
      department: studentRecord.department,
      location: studentRecord.location
    };

    // Save to DM reports
    const existingDmReports = JSON.parse(localStorage.getItem('dm_attendance_reports') || '[]');
    const updatedDmReports = [dmReport, ...existingDmReports];
    localStorage.setItem('dm_attendance_reports', JSON.stringify(updatedDmReports));
    setDmReports(updatedDmReports);

    // Send notification to DM
    await notifyDM(dmReport);

    // Log the report
    console.log(`DM Report Created: ${studentRecord.name} - ${studentRecord.status}`);
  };

  // Enhanced notification system
  const sendAbsenceNotification = async (studentRecord) => {
    const message = `ATTENDANCE ALERT: ${studentRecord.name} (${studentRecord.studentId}) was marked ${studentRecord.status.toUpperCase()} on ${studentRecord.date}. Please contact the institute for more information. - Apaer TVET Institute`;
    
    const notificationRecord = {
      studentId: studentRecord.id,
      studentName: studentRecord.name,
      parentPhone: studentRecord.parentPhone,
      status: studentRecord.status,
      date: studentRecord.date,
      message: message,
      sentVia: {
        sms: smsNotifications,
        whatsapp: whatsappIntegration
      },
      timestamp: new Date().toISOString(),
      delivered: true
    };

    if (smsNotifications) {
      console.log(`📱 SMS sent to ${studentRecord.parentPhone}: ${message}`);
      // Integrate with SMS API here
    }
    
    if (whatsappIntegration) {
      console.log(`💬 WhatsApp sent to ${studentRecord.parentWhatsapp}: ${message}`);
      // Integrate with WhatsApp API here
    }

    // Save notification record
    const notifications = JSON.parse(localStorage.getItem('attendance_notifications') || '[]');
    localStorage.setItem('attendance_notifications', JSON.stringify([notificationRecord, ...notifications]));
  };

  // Enhanced DM notification
  const notifyDM = async (dmReport) => {
    const dmMessage = `🚨 ATTENDANCE REPORT: ${dmReport.studentName} (${dmReport.studentCode}) - ${dmReport.programCode} ${dmReport.level} - ${dmReport.className} - STATUS: ${dmReport.status.toUpperCase()} - Reported by: ${dmReport.reportedBy} (${dmReport.reporterRole})`;
    
    console.log(`📨 DM Notification: ${dmMessage}`);
    
    // Save to DM notifications
    const dmNotifications = JSON.parse(localStorage.getItem('dm_notifications') || '[]');
    const newNotification = {
      id: Date.now(),
      type: 'attendance_report',
      message: dmMessage,
      report: dmReport,
      timestamp: new Date().toISOString(),
      read: false,
      priority: dmReport.priority
    };
    localStorage.setItem('dm_notifications', JSON.stringify([newNotification, ...dmNotifications]));
  };

  // Mark report as resolved
  const markReportResolved = (reportId) => {
    const updatedReports = dmReports.map(report =>
      report.id === reportId ? { ...report, resolved: true, resolvedAt: new Date().toISOString() } : report
    );
    setDmReports(updatedReports);
    localStorage.setItem('dm_attendance_reports', JSON.stringify(updatedReports));
    
    // Notify resolution
    const resolvedReport = dmReports.find(r => r.id === reportId);
    console.log(`✅ Report resolved: ${resolvedReport.studentName} - ${resolvedReport.status}`);
  };

  // Filter handling
  const handleFilter = () => {
    let filtered = attendanceData;
    
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.programCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.className.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
  };

  // Enhanced export functionality
  const exportToCSV = () => {
    const csvContent = [
      ['Student ID', 'Name', 'Program', 'Class', 'Level', 'Date', 'Status', 'Check-in Time', 'Check-out Time', 'Remarks', 'Practical Session', 'Marked By', 'Verified By', 'Session', 'Module'],
      ...filteredData.map(item => [
        item.studentId,
        item.name,
        item.program,
        item.className,
        item.level,
        item.date,
        item.status,
        item.checkInTime,
        item.checkOutTime,
        item.remarks,
        item.practicalSession,
        item.markedBy,
        item.verifiedBy || 'Not Verified',
        item.session,
        item.module
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `tvet-attendance-${selectedDate}-${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export DM reports
  const exportDmReports = () => {
    const csvContent = [
      ['Report ID', 'Student Name', 'Student ID', 'Program', 'Class', 'Level', 'Status', 'Date', 'Time', 'Remarks', 'Reported By', 'Role', 'Priority', 'Resolved'],
      ...dmReports.map(report => [
        report.id,
        report.studentName,
        report.studentCode,
        report.program,
        report.className,
        report.level,
        report.status,
        report.date,
        report.time,
        report.remarks,
        report.reportedBy,
        report.reporterRole,
        report.priority,
        report.resolved ? 'Yes' : 'No'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `dm-attendance-reports-${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Utility functions
  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <FaCheckCircle className="status-icon present" />;
      case 'absent': return <FaTimesCircle className="status-icon absent" />;
      case 'late': return <FaClock className="status-icon late" />;
      default: return <FaExclamationTriangle className="status-icon unknown" />;
    }
  };

  const getProgramIcon = (programId) => {
    const program = tvetPrograms.find(p => p.id === programId);
    const IconComponent = program?.icon || FaSchool;
    return <IconComponent />;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#10B981';
      case 'absent': return '#EF4444';
      case 'late': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const getAttendanceHistory = (studentId) => {
    const history = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
    return history.filter(record => record.id === studentId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
  };

  const getStudentPerformance = (studentId) => {
    const history = getAttendanceHistory(studentId);
    const total = history.length;
    const present = history.filter(record => record.status === 'present').length;
    return total > 0 ? Math.round((present / total) * 100) : 0;
  };

  // Permission checking
  const hasPermission = (permission) => {
    if (!currentUser) return false;
    if (currentUser.role === 'ADMIN') return true;
    const role = roles[currentUser.role];
    return role && role.permissions.includes(permission);
  };

  // Get user's assigned classes
  const getUserAssignedClasses = () => {
    if (!currentUser) return [];
    if (currentUser.role === 'DM' || currentUser.role === 'DOS' || currentUser.role === 'ADMIN') {
      return allClasses;
    }
    return allClasses.filter(cls => 
      currentUser.assignedClasses?.includes(cls.id) ||
      cls.classChiefId === currentUser.id ||
      cls.classTeacherId === currentUser.id
    );
  };

  // Class Overview Component
  const ClassOverview = () => (
    <div className="class-overview">
      <h3><FaBuilding /> Class Overview</h3>
      <div className="classes-grid">
        {getUserAssignedClasses().map(classInfo => (
          <div key={classInfo.id} className="class-card">
            <div className="class-header">
              <div className="class-icon">
                {getProgramIcon(classInfo.programId)}
              </div>
              <div className="class-info">
                <h4>{classInfo.name}</h4>
                <p>{classInfo.programName}</p>
                <span className="class-room">{classInfo.room}</span>
              </div>
            </div>
            <div className="class-stats">
              <div className="stat">
                <span className="stat-value">{classInfo.totalStudents}</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat">
                <span className="stat-value">{stats.classStats[classInfo.id]?.present || 0}</span>
                <span className="stat-label">Present</span>
              </div>
              <div className="stat">
                <span className="stat-value">{stats.classStats[classInfo.id]?.rate?.toFixed(1) || 0}%</span>
                <span className="stat-label">Rate</span>
              </div>
            </div>
            <div className="class-staff">
              <div className="staff-item">
                <FaChalkboardTeacher />
                <span>{classInfo.classTeacher}</span>
              </div>
              <div className="staff-item">
                <FaUserGraduate />
                <span>{classInfo.classChief}</span>
              </div>
            </div>
            <button 
              className="btn-outline btn-sm"
              onClick={() => {
                setSelectedClass(classInfo.id);
                setSelectedProgram(classInfo.programId.toString());
                setSelectedLevel(classInfo.level);
              }}
            >
              View Attendance
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Bulk Actions Component
  const BulkActions = () => (
    <div className="bulk-actions">
      <h4>Bulk Actions</h4>
      <div className="bulk-controls">
        <select 
          value={bulkAction} 
          onChange={(e) => setBulkAction(e.target.value)}
          className="filter-input"
        >
          <option value="">Select Action</option>
          <option value="present">Mark Present</option>
          <option value="absent">Mark Absent</option>
          <option value="late">Mark Late</option>
        </select>
        <button 
          onClick={updateBulkAttendance}
          disabled={!bulkAction || selectedStudents.length === 0}
          className="btn-primary btn-sm"
        >
          Apply to {selectedStudents.length} Students
        </button>
        <button 
          onClick={() => setSelectedStudents([])}
          className="btn-secondary btn-sm"
        >
          Clear Selection
        </button>
      </div>
      {selectedStudents.length > 0 && (
        <div className="selection-info">
          {selectedStudents.length} students selected for bulk action
        </div>
      )}
    </div>
  );

  // Student selection handler
  const handleStudentSelection = (studentId, isSelected) => {
    if (isSelected) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    }
  };

  // Select all students in current view
  const handleSelectAll = () => {
    if (selectedStudents.length === filteredData.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredData.map(student => student.id));
    }
  };

  // Main component render
  return (
    <div className="tvet-attendance-system">
      {/* System Header */}
      <div className="system-header">
        <div className="header-content">
          <div className="header-title">
            <div className="logo">
              <FaSchool className="logo-icon" />
              <div>
                <h1>TVET Attendance System</h1>
                <p>Apaer Institute - Professional Skills Development</p>
              </div>
            </div>
          </div>
          <div className="header-user">
            <div className="user-info">
              <div className="user-avatar">{currentUser?.avatar}</div>
              <div className="user-details">
                <span className="user-name">{currentUser?.name}</span>
                <span className="user-role">{currentUser?.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="navigation-tabs">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            <FaClipboardList />
            Attendance
          </button>
          <button 
            className={`tab-btn ${activeTab === 'classes' ? 'active' : ''}`}
            onClick={() => setActiveTab('classes')}
          >
            <FaBuilding />
            Classes
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FaChartBar />
            DM Reports
          </button>
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <FaChartLine />
            Analytics
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {activeTab === 'classes' && <ClassOverview />}

        {activeTab === 'attendance' && (
          <>
            {/* System Overview Stats */}
            <div className="system-overview">
              <div className="overview-stats">
                <div className="overview-stat">
                  <FaUsers className="stat-icon" />
                  <div className="stat-content">
                    <h3>{systemStats.totalStudents}</h3>
                    <p>Total Students</p>
                  </div>
                </div>
                <div className="overview-stat">
                  <FaBuilding className="stat-icon" />
                  <div className="stat-content">
                    <h3>{systemStats.totalClasses}</h3>
                    <p>Total Classes</p>
                  </div>
                </div>
                <div className="overview-stat">
                  <FaUserCheck className="stat-icon" />
                  <div className="stat-content">
                    <h3>{systemStats.todayAttendance}</h3>
                    <p>Present Today</p>
                  </div>
                </div>
                <div className="overview-stat">
                  <FaChartBar className="stat-icon" />
                  <div className="stat-content">
                    <h3>{systemStats.overallAttendance}%</h3>
                    <p>Overall Attendance</p>
                  </div>
                </div>
                <div className="overview-stat">
                  <FaClipboardList className="stat-icon" />
                  <div className="stat-content">
                    <h3>{systemStats.dmReportsToday}</h3>
                    <p>DM Reports Today</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Header */}
            <div className="action-header">
              <div className="header-left">
                <h2>Attendance Management</h2>
                <p>Manage and monitor student attendance across all TVET programs L3 to L5</p>
              </div>
              <div className="header-actions">
                {hasPermission('mark_attendance') && (
                  <button 
                    onClick={() => setShowAttendanceForm(true)} 
                    className="btn-primary"
                  >
                    <FaUserEdit />
                    <span>Mark Attendance</span>
                  </button>
                )}
                {hasPermission('view_dm_reports') && (
                  <button 
                    onClick={() => setShowRoleManager(true)} 
                    className="btn-secondary"
                  >
                    <FaUserShield />
                    <span>Role Manager</span>
                  </button>
                )}
                <button onClick={exportToCSV} className="btn-secondary" disabled={!hasPermission('export_reports')}>
                  <FaDownload />
                  <span>Export CSV</span>
                </button>
                <button onClick={loadAttendanceData} className="btn-primary" disabled={isLoading}>
                  <FaSync className={isLoading ? 'spinning' : ''} />
                  <span>{isLoading ? 'Loading...' : 'Refresh'}</span>
                </button>
              </div>
            </div>

            {/* Enhanced Filters Section */}
            <div className="filters-section">
              <div className="filter-grid">
                <div className="filter-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="filter-input"
                  />
                </div>
                
                <div className="filter-group">
                  <label>TVET Program</label>
                  <select
                    value={selectedProgram}
                    onChange={(e) => {
                      setSelectedProgram(e.target.value);
                      setSelectedClass('');
                    }}
                    className="filter-input"
                    disabled={!hasPermission('view_all') && currentUser?.assignedClasses !== 'all'}
                  >
                    <option value="">All Programs</option>
                    {tvetPrograms
                      .filter(program => 
                        hasPermission('view_all') || 
                        currentUser?.assignedClasses === 'all' ||
                        getUserAssignedClasses().some(cls => cls.programId === program.id)
                      )
                      .map(program => (
                        <option key={program.id} value={program.id}>
                          {program.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => {
                      setSelectedLevel(e.target.value);
                      setSelectedClass('');
                    }}
                    className="filter-input"
                  >
                    <option value="">All Levels</option>
                    <option value="L3">Level 3</option>
                    <option value="L4">Level 4</option>
                    <option value="L5">Level 5</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="filter-input"
                  >
                    <option value="">All Classes</option>
                    {getUserAssignedClasses()
                      .filter(cls => 
                        (!selectedProgram || cls.programId.toString() === selectedProgram) &&
                        (!selectedLevel || cls.level === selectedLevel)
                      )
                      .map(cls => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name} - {cls.classTeacher}
                        </option>
                      ))
                    }
                  </select>
                </div>
                
                <div className="filter-group search-group">
                  <label>Search Students</label>
                  <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search by name, student ID, program, or class..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                      className="search-input"
                    />
                  </div>
                </div>
                
                <div className="filter-group">
                  <label>&nbsp;</label>
                  <button onClick={handleFilter} className="btn-primary filter-btn">
                    <FaFilter />
                    <span>Apply Filters</span>
                  </button>
                </div>
              </div>

              {/* Bulk Actions for Teachers */}
              {hasPermission('bulk_actions') && <BulkActions />}

              <div className="view-controls">
                <div className="view-buttons">
                  <button 
                    className={`view-btn ${viewMode === 'daily' ? 'active' : ''}`}
                    onClick={() => setViewMode('daily')}
                  >
                    <FaRegCalendarCheck />
                    Daily View
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'weekly' ? 'active' : ''}`}
                    onClick={() => setViewMode('weekly')}
                  >
                    <FaRegChartBar />
                    Weekly View
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'monthly' ? 'active' : ''}`}
                    onClick={() => setViewMode('monthly')}
                  >
                    <FaRegFileAlt />
                    Monthly Report
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics Overview */}
            <div className="stats-overview">
              <div className="main-stats">
                <div className="stat-card primary">
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.totalStudents}</h3>
                    <p>Total Students</p>
                  </div>
                </div>
                <div className="stat-card success">
                  <div className="stat-icon">
                    <FaUserCheck />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.present}</h3>
                    <p>Present Today</p>
                  </div>
                </div>
                <div className="stat-card warning">
                  <div className="stat-icon">
                    <FaClock />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.late}</h3>
                    <p>Late Arrivals</p>
                  </div>
                </div>
                <div className="stat-card danger">
                  <div className="stat-icon">
                    <FaUserTimes />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.absent}</h3>
                    <p>Absent</p>
                  </div>
                </div>
                <div className="stat-card info">
                  <div className="stat-icon">
                    <FaChartBar />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.attendanceRate}%</h3>
                    <p>Attendance Rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Attendance Table */}
            <div className="attendance-table-container">
              <div className="table-header">
                <h3>Attendance Records</h3>
                <div className="header-info">
                  <span className="records-count">
                    {filteredData.length} records found • {selectedDate}
                    {selectedClass && ` • ${allClasses.find(c => c.id === selectedClass)?.name}`}
                  </span>
                  {hasPermission('mark_attendance') && (
                    <span className="marker-info">
                      Marked by: {currentUser?.name}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="table-wrapper">
                <table className="attendance-table">
                  <thead>
                    <tr>
                      {hasPermission('bulk_actions') && (
                        <th>
                          <input
                            type="checkbox"
                            checked={selectedStudents.length === filteredData.length && filteredData.length > 0}
                            onChange={handleSelectAll}
                            className="bulk-checkbox"
                          />
                        </th>
                      )}
                      <th>Student ID</th>
                      <th>Student Name</th>
                      <th>Program</th>
                      <th>Class</th>
                      <th>Level</th>
                      <th>Status</th>
                      <th>Check-in</th>
                      <th>Session</th>
                      <th>Module</th>
                      <th>Practical Session</th>
                      <th>Remarks</th>
                      <th>Marked By</th>
                      {hasPermission('mark_attendance') && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((student) => (
                      <tr key={student.id} className="table-row">
                        {hasPermission('bulk_actions') && (
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              onChange={(e) => handleStudentSelection(student.id, e.target.checked)}
                              className="student-checkbox"
                            />
                          </td>
                        )}
                        <td className="student-id">
                          <span>{student.studentId}</span>
                        </td>
                        <td className="student-name">
                          <button 
                            className="name-btn"
                            onClick={() => viewStudentDetails(student)}
                          >
                            <span className="student-avatar-small">{student.avatar}</span>
                            {student.name}
                          </button>
                        </td>
                        <td className="program-cell">
                          <div className="program-badge">
                            {getProgramIcon(student.programId)}
                            <span>{student.programCode}</span>
                          </div>
                        </td>
                        <td className="class-cell">
                          <span className="class-badge">{student.className}</span>
                        </td>
                        <td className="level-cell">
                          <span className="level-badge">{student.level}</span>
                        </td>
                        <td>
                          <span className={`status-badge ${student.status}`}>
                            {getStatusIcon(student.status)}
                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                          </span>
                        </td>
                        <td className="time-cell">{student.checkInTime}</td>
                        <td>
                          <span className="session-badge">{student.session}</span>
                        </td>
                        <td>
                          <span className="module-badge">{student.module}</span>
                        </td>
                        <td>
                          <span className={`practical-badge ${student.practicalSession === 'Completed' ? 'completed' : student.practicalSession === 'In Progress' ? 'in-progress' : 'pending'}`}>
                            {student.practicalSession}
                          </span>
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Add remarks..."
                            value={student.remarks}
                            onChange={(e) => {
                              const updatedData = attendanceData.map(item =>
                                item.id === student.id ? { ...item, remarks: e.target.value } : item
                              );
                              setAttendanceData(updatedData);
                            }}
                            className="remarks-input"
                            disabled={!hasPermission('manage_remarks')}
                          />
                        </td>
                        <td className="marked-by">
                          <span>{student.markedBy}</span>
                        </td>
                        {hasPermission('mark_attendance') && (
                          <td>
                            <div className="action-buttons">
                              <button
                                onClick={() => updateAttendanceStatus(student.id, 'present')}
                                className={`action-btn present ${student.status === 'present' ? 'active' : ''}`}
                                title="Mark Present"
                              >
                                <FaCheckCircle />
                              </button>
                              <button
                                onClick={() => updateAttendanceStatus(student.id, 'absent')}
                                className={`action-btn absent ${student.status === 'absent' ? 'active' : ''}`}
                                title="Mark Absent"
                              >
                                <FaUserTimes />
                              </button>
                              <button
                                onClick={() => updateAttendanceStatus(student.id, 'late')}
                                className={`action-btn late ${student.status === 'late' ? 'active' : ''}`}
                                title="Mark Late"
                              >
                                <FaClock />
                              </button>
                              <button
                                onClick={() => viewStudentDetails(student)}
                                className="action-btn view"
                                title="View Details"
                              >
                                <FaEye />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredData.length === 0 && (
                  <div className="empty-state">
                    <FaUserTimes className="empty-icon" />
                    <h3>No attendance records found</h3>
                    <p>Try adjusting your filters or select a different date</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="actions-grid">
                {hasPermission('export_reports') && (
                  <button className="action-card">
                    <FaPrint className="action-icon" />
                    <span>Print Report</span>
                  </button>
                )}
                {hasPermission('system_management') && (
                  <button className="action-card">
                    <FaEnvelope className="action-icon" />
                    <span>Notify Absent</span>
                  </button>
                )}
                {hasPermission('analytics') && (
                  <button className="action-card" onClick={() => setShowAnalytics(true)}>
                    <FaChartBar className="action-icon" />
                    <span>Generate Stats</span>
                  </button>
                )}
                <button className="action-card">
                  <FaHistory className="action-icon" />
                  <span>View History</span>
                </button>
                <button className="action-card">
                  <FaDatabase className="action-icon" />
                  <span>Backup Data</span>
                </button>
                <button className="action-card">
                  <FaCogs className="action-icon" />
                  <span>System Settings</span>
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'reports' && (
          <div className="dm-reports-section">
            <div className="section-header">
              <div className="header-left">
                <h3><FaClipboardList /> DM Attendance Reports</h3>
                <p>Monitor and manage attendance reports from class chiefs and teachers</p>
              </div>
              <div className="header-actions">
                <div className="report-stats">
                  <span className="stat-badge new">{dmReports.filter(r => !r.resolved).length} New</span>
                  <span className="stat-badge resolved">{dmReports.filter(r => r.resolved).length} Resolved</span>
                  <span className="stat-badge total">{dmReports.length} Total</span>
                </div>
                <button className="btn-secondary" onClick={exportDmReports}>
                  <FaDownload />
                  Export Reports
                </button>
              </div>
            </div>
            
            <div className="reports-list">
              {dmReports.slice(0, 15).map(report => (
                <div key={report.id} className={`report-item ${report.resolved ? 'resolved' : 'pending'} priority-${report.priority}`}>
                  <div className="report-header">
                    <div className="student-info">
                      <div className="student-avatar">{report.studentName.charAt(0)}</div>
                      <div>
                        <strong>{report.studentName}</strong>
                        <span>{report.studentCode} • {report.programCode} {report.level} • {report.className}</span>
                      </div>
                    </div>
                    <div className="report-meta">
                      <span className={`status-badge ${report.status}`}>
                        {getStatusIcon(report.status)}
                        {report.status.toUpperCase()}
                      </span>
                      <span className="priority-badge">{report.priority}</span>
                    </div>
                  </div>
                  
                  <div className="report-details">
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Reported By:</span>
                        <span className="detail-value">{report.reportedBy} ({report.reporterRole})</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Date & Time:</span>
                        <span className="detail-value">{report.date} at {report.time}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">{report.location}</span>
                      </div>
                      {report.remarks && (
                        <div className="detail-item full-width">
                          <span className="detail-label">Remarks:</span>
                          <span className="detail-value">{report.remarks}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="report-actions">
                    <div className="report-timestamp">
                      Reported: {new Date(report.timestamp).toLocaleString()}
                      {report.resolved && (
                        <span className="resolved-time">
                          • Resolved: {new Date(report.resolvedAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="action-buttons">
                      {!report.resolved && hasPermission('system_management') && (
                        <>
                          <button 
                            className="btn-success btn-sm"
                            onClick={() => markReportResolved(report.id)}
                          >
                            <FaCheckCircle />
                            Mark Resolved
                          </button>
                          <button className="btn-secondary btn-sm">
                            <FaEnvelope />
                            Contact
                          </button>
                        </>
                      )}
                      {report.resolved && (
                        <span className="resolved-badge">
                          <FaCheckCircle />
                          Resolved
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {dmReports.length === 0 && (
                <div className="empty-state">
                  <FaClipboardList className="empty-icon" />
                  <h4>No reports to DM yet</h4>
                  <p>Attendance reports will appear here when class chiefs/teachers mark students absent or late</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-dashboard">
            <div className="analytics-header">
              <h3><FaChartLine /> Attendance Analytics</h3>
              <p>Comprehensive overview of attendance patterns across all programs and classes</p>
            </div>
            
            <div className="analytics-grid">
              <div className="analytics-card large">
                <h4>Program Performance</h4>
                <div className="program-performance">
                  {tvetPrograms.map(program => (
                    <div key={program.id} className="performance-item">
                      <span className="program-name">{program.code}</span>
                      <div className="performance-bar">
                        <div 
                          className="performance-fill"
                          style={{ width: `${stats.programStats[program.id]?.rate || 0}%` }}
                        ></div>
                      </div>
                      <span className="performance-value">{stats.programStats[program.id]?.rate?.toFixed(1) || 0}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analytics-card">
                <h4>Level-wise Attendance</h4>
                <div className="level-stats">
                  {['L3', 'L4', 'L5'].map(level => {
                    const levelStudents = students.filter(s => s.level === level);
                    const levelAttendance = attendanceData.filter(a => a.level === level && a.status === 'present').length;
                    const rate = levelStudents.length > 0 ? (levelAttendance / levelStudents.length) * 100 : 0;
                    return (
                      <div key={level} className="level-stat">
                        <span className="level-name">Level {level.slice(1)}</span>
                        <span className="level-rate">{rate.toFixed(1)}%</span>
                        <span className="level-count">{levelAttendance}/{levelStudents.length}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="analytics-card">
                <h4>Quick Stats</h4>
                <div className="quick-stats">
                  <div className="quick-stat">
                    <span className="stat-figure">{stats.attendanceRate}%</span>
                    <span className="stat-label">Overall Attendance</span>
                  </div>
                  <div className="quick-stat">
                    <span className="stat-figure">{stats.present}</span>
                    <span className="stat-label">Present Today</span>
                  </div>
                  <div className="quick-stat">
                    <span className="stat-figure">{stats.absent}</span>
                    <span className="stat-label">Absent Today</span>
                  </div>
                  <div className="quick-stat">
                    <span className="stat-figure">{systemStats.dmReportsToday}</span>
                    <span className="stat-label">DM Reports</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sample User Setup for Testing */}
      <div className="user-setup">
        <h4>Test Users (For Demonstration)</h4>
        <div className="test-users">
          <button 
            className="btn-secondary btn-sm"
            onClick={() => {
              const user = {
                id: 1,
                name: 'John Smith',
                email: 'john.smith@apaer.ac.rw',
                role: 'CLASS_CHIEF',
                programAccess: [1],
                fullName: 'John Smith',
                avatar: '👨‍🎓',
                assignedClasses: ['SOD-L3']
              };
              localStorage.setItem('apaer_current_user', JSON.stringify(user));
              setCurrentUser(user);
              alert('Switched to Class Chief (SOD L3)');
            }}
          >
            Class Chief - SOD L3
          </button>
          <button 
            className="btn-secondary btn-sm"
            onClick={() => {
              const user = {
                id: 2,
                name: 'Sarah Johnson',
                email: 'sarah.johnson@apaer.ac.rw',
                role: 'CLASS_TEACHER',
                programAccess: [1, 2],
                fullName: 'Sarah Johnson',
                avatar: '👩‍🏫',
                assignedClasses: ['SOD-L3', 'SOD-L4', 'SOD-L5']
              };
              localStorage.setItem('apaer_current_user', JSON.stringify(user));
              setCurrentUser(user);
              alert('Switched to Class Teacher (SOD)');
            }}
          >
            Class Teacher - SOD
          </button>
          <button 
            className="btn-secondary btn-sm"
            onClick={() => {
              const user = {
                id: 3,
                name: 'Dr. James Mugisha',
                email: 'dm@apaer.ac.rw',
                role: 'DM',
                programAccess: 'all',
                fullName: 'Dr. James Mugisha',
                avatar: '👨‍💼',
                assignedClasses: 'all'
              };
              localStorage.setItem('apaer_current_user', JSON.stringify(user));
              setCurrentUser(user);
              alert('Switched to DM (All Access)');
            }}
          >
            Discipline Master
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVETAttendanceSystem;