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
  FaBuilding,
  FaUserFriends,
  FaIdCard,
  FaPhone,
  FaBook,
  FaMale,
  FaFemale,
  FaUser
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
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentClass, setCurrentClass] = useState(null);
  const [showAbsentReport, setShowAbsentReport] = useState(false);
  const [absentStudents, setAbsentStudents] = useState([]);

  // Enhanced TVET Programs with detailed class structure
  const tvetPrograms = [
    {
      id: 1,
      name: "SOFTWARE DEVELOPMENT (SOD)",
      tradeName: "Software Development Specialist",
      levels: ["L3", "L4", "L5"],
      totalStudents: 150,
      classes: [
        {
          id: "SOD-L3",
          name: "SOD Level 3",
          level: "L3",
          classTeacher: "Mr. John Smith",
          classChief: "Alice Johnson",
          room: "Lab 101",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 50
        },
        {
          id: "SOD-L4",
          name: "SOD Level 4",
          level: "L4",
          classTeacher: "Ms. Sarah Wilson",
          classChief: "Bob Mugisha",
          room: "Lab 102",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 50
        },
        {
          id: "SOD-L5",
          name: "SOD Level 5",
          level: "L5",
          classTeacher: "Dr. Michael Brown",
          classChief: "Claire Uwase",
          room: "Lab 103",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 50
        }
      ]
    },
    {
      id: 2,
      name: "NETWORKING (NET)",
      tradeName: "Network Technician",
      levels: ["L3", "L4", "L5"],
      totalStudents: 150,
      classes: [
        {
          id: "NET-L3",
          name: "NET Level 3",
          level: "L3",
          classTeacher: "Mr. Robert Johnson",
          classChief: "David Nshuti",
          room: "Lab 201",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 50
        },
        {
          id: "NET-L4",
          name: "NET Level 4",
          level: "L4",
          classTeacher: "Ms. Grace Uwimana",
          classChief: "Emma Iradukunda",
          room: "Lab 202",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 50
        },
        {
          id: "NET-L5",
          name: "NET Level 5",
          level: "L5",
          classTeacher: "Mr. Patrick Ndayisaba",
          classChief: "Frank Mutabazi",
          room: "Lab 203",
          schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
          totalStudents: 50
        }
      ]
    }
  ];

  // Initialize current user and set current class
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('apaer_current_user')) || {
      id: 1,
      name: 'Alice Johnson',
      email: 'chief.sod@apaer.ac.rw',
      role: 'CLASS_CHIEF',
      programAccess: [1],
      classId: 'SOD-L3'
    };
    setCurrentUser(user);
    
    // Set current class for class teachers and chiefs
    if (user.classId) {
      const userClass = getAllClasses().find(cls => cls.id === user.classId);
      setCurrentClass(userClass);
      if (userClass) {
        setSelectedProgram(userClass.programId.toString());
        setSelectedLevel(userClass.level);
        setSelectedClass(userClass.id);
      }
    }
  }, []);

  // Get all classes from all programs
  const getAllClasses = () => {
    return tvetPrograms.flatMap(program => 
      program.classes.map(cls => ({
        ...cls,
        programId: program.id,
        programName: program.name
      }))
    );
  };

  // Generate sample students with enhanced parent information
  const generateStudents = () => {
    const students = [];
    let studentId = 1;
    
    const firstNames = ['Alice', 'Bob', 'Claire', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Irene', 'James'];
    const lastNames = ['Uwase', 'Mugisha', 'Iradukunda', 'Nshuti', 'Uwimana', 'Mutabazi', 'Mugisha', 'Twahirwa', 'Niyomugabo', 'Nkurunziza'];
    const fatherNames = ['Jean', 'Pierre', 'Paul', 'Joseph', 'Samuel', 'Charles', 'David', 'Patrick', 'Robert', 'Michael'];
    const motherNames = ['Marie', 'Jeanne', 'Anne', 'Chantal', 'Grace', 'Sarah', 'Rose', 'Claire', 'Alice', 'Emma'];
    
    getAllClasses().forEach(classInfo => {
      for (let i = 1; i <= 50; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fatherName = fatherNames[Math.floor(Math.random() * fatherNames.length)];
        const motherName = motherNames[Math.floor(Math.random() * motherNames.length)];
        const parentPhone = `+25078${Math.floor(3000000 + Math.random() * 7000000)}`;
        
        students.push({
          id: studentId++,
          name: `${firstName} ${lastName}`,
          studentId: `${classInfo.id}-${String(i).padStart(3, '0')}`,
          program: classInfo.programName,
          programId: classInfo.programId,
          level: classInfo.level,
          classId: classInfo.id,
          className: classInfo.name,
          email: `student.${classInfo.id}.${String(i).padStart(2, '0')}@apaer.ac.rw`,
          phone: `+25078${Math.floor(1000000 + Math.random() * 9000000)}`,
          parentPhone: parentPhone,
          parentWhatsapp: parentPhone,
          fatherName: `${fatherName} ${lastName}`,
          motherName: `${motherName} ${lastName}`,
          joinDate: '2024-01-15',
          status: 'active',
          classChief: classInfo.classChief,
          classTeacher: classInfo.classTeacher,
          room: classInfo.room,
          schedule: classInfo.schedule
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
    attendanceRate: 0
  });

  useEffect(() => {
    loadAttendanceData();
  }, [selectedDate, selectedProgram, selectedLevel, selectedClass, currentUser]);

  const loadAttendanceData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredStudents = students;
      
      // Class chiefs can only see their own class
      if (currentUser && currentUser.classId) {
        filteredStudents = filteredStudents.filter(student => 
          student.classId === currentUser.classId
        );
      }
      
      // Apply filters
      if (selectedProgram) {
        filteredStudents = filteredStudents.filter(student => 
          student.programId.toString() === selectedProgram
        );
      }
      
      if (selectedLevel) {
        filteredStudents = filteredStudents.filter(student => 
          student.level === selectedLevel
        );
      }
      
      if (selectedClass) {
        filteredStudents = filteredStudents.filter(student => 
          student.classId === selectedClass
        );
      }
      
      // Load existing attendance records or create new ones
      const existingRecords = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
      const todayRecords = existingRecords.filter(record => record.date === selectedDate);
      
      const mockData = filteredStudents.map(student => {
        const existingRecord = todayRecords.find(record => record.studentId === student.studentId);
        
        if (existingRecord) {
          return {
            ...student,
            ...existingRecord
          };
        }
        
        // Default status for new records
        return {
          ...student,
          date: selectedDate,
          status: 'present', // Default to present
          checkInTime: '08:00',
          checkOutTime: '16:00',
          remarks: '',
          markedBy: currentUser?.name || 'System',
          timestamp: new Date().toISOString()
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

    setStats({
      totalStudents: total,
      present,
      absent,
      late,
      attendanceRate: Math.round(attendanceRate)
    });

    // Update absent students for reporting
    setAbsentStudents(data.filter(item => item.status === 'absent'));
  };

  // Update attendance status (marked by class chief)
  const updateAttendanceStatus = async (studentId, status) => {
    const updatedData = attendanceData.map(item =>
      item.id === studentId ? { 
        ...item, 
        status, 
        timestamp: new Date().toISOString(),
        markedBy: currentUser?.name || 'Class Chief', // Always show class chief name
        checkInTime: status === 'present' ? new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : '--:--',
        checkOutTime: status === 'present' ? '16:00' : '--:--',
        remarks: status === 'absent' ? 'Marked absent by class chief' : status === 'late' ? 'Late arrival' : ''
      } : item
    );
    
    setAttendanceData(updatedData);
    setFilteredData(updatedData);
    calculateStats(updatedData);
    
    // Save to localStorage
    const existingRecords = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
    const newRecord = updatedData.find(item => item.id === studentId);
    const filteredRecords = existingRecords.filter(record => 
      !(record.studentId === newRecord.studentId && record.date === selectedDate)
    );
    
    const updatedRecords = [...filteredRecords, {
      studentId: newRecord.studentId,
      studentName: newRecord.name,
      class: newRecord.className,
      date: newRecord.date,
      status: newRecord.status,
      checkInTime: newRecord.checkInTime,
      checkOutTime: newRecord.checkOutTime,
      remarks: newRecord.remarks,
      markedBy: newRecord.markedBy,
      timestamp: newRecord.timestamp,
      parentPhone: newRecord.parentPhone,
      fatherName: newRecord.fatherName,
      motherName: newRecord.motherName
    }];
    
    localStorage.setItem('tvet_attendance', JSON.stringify(updatedRecords));

    // Send report to DM Dashboard
    if (status === 'absent') {
      await sendReportToDM(newRecord);
    }
  };

  // Send report to Discipline Master Dashboard
  const sendReportToDM = async (studentRecord) => {
    const dmReport = {
      studentId: studentRecord.studentId,
      studentName: studentRecord.name,
      className: studentRecord.className,
      classChief: studentRecord.classChief,
      date: studentRecord.date,
      status: studentRecord.status,
      markedBy: studentRecord.markedBy,
      timestamp: studentRecord.timestamp,
      parentPhone: studentRecord.parentPhone,
      fatherName: studentRecord.fatherName,
      motherName: studentRecord.motherName,
      message: `Absence Report: ${studentRecord.name} from ${studentRecord.className} was marked absent by ${studentRecord.markedBy}`
    };

    // Save to DM reports
    const dmReports = JSON.parse(localStorage.getItem('dm_attendance_reports') || '[]');
    const existingReportIndex = dmReports.findIndex(report => 
      report.studentId === dmReport.studentId && report.date === dmReport.date
    );
    
    if (existingReportIndex !== -1) {
      dmReports[existingReportIndex] = dmReport;
    } else {
      dmReports.push(dmReport);
    }
    
    localStorage.setItem('dm_attendance_reports', JSON.stringify(dmReports));
    
    console.log(`Report sent to DM: ${studentRecord.name} - ${studentRecord.className} - Absent`);
  };

  const handleFilter = () => {
    let filtered = attendanceData;
    
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fatherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.motherName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Student ID', 'Student Name', 'Class', 'Father Name', 'Mother Name', 'Parent Phone', 'Date', 'Status', 'Check-in Time', 'Check-out Time', 'Remarks', 'Marked By'],
      ...filteredData.map(item => [
        item.studentId,
        item.name,
        item.className,
        item.fatherName,
        item.motherName,
        item.parentPhone,
        item.date,
        item.status,
        item.checkInTime,
        item.checkOutTime,
        item.remarks,
        item.markedBy
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${selectedDate}-${currentClass?.name || 'all'}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <FaUserCheck className="status-icon present" />;
      case 'absent': return <FaUserTimes className="status-icon absent" />;
      case 'late': return <FaClock className="status-icon late" />;
      default: return <FaExclamationTriangle className="status-icon unknown" />;
    }
  };

  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const getAttendanceHistory = (studentId) => {
    const history = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
    return history.filter(record => record.studentId === studentId).slice(-7);
  };

  // Show absent report
  const showAbsentStudentsReport = () => {
    setShowAbsentReport(true);
  };

  // Send WhatsApp messages to absent students' parents
  const sendWhatsAppMessages = () => {
    absentStudents.forEach(student => {
      const message = `Dear Parent, ${student.name} from ${student.className} was absent today (${selectedDate}). Please contact the school if this needs clarification. - Apaer Institute Discipline Master`;
      
      // Create WhatsApp link
      const whatsappUrl = `https://wa.me/${student.parentPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in new tab (in real implementation, this would be through an API)
      window.open(whatsappUrl, '_blank');
      
      // Log the message (for demo purposes)
      console.log(`WhatsApp to ${student.parentPhone} (${student.fatherName}/${student.motherName}): ${message}`);
    });

    alert(`WhatsApp messages prepared for ${absentStudents.length} absent students' parents.`);
  };

  return (
    <div className="tvet-attendance-system">
      {/* System Header */}
      <div className="system-header">
        <div className="header-content">
          <div className="header-title">
            <FaUserGraduate className="header-icon" />
            <div>
              <h1>Class Attendance System</h1>
              <p>
                Class Chief: {currentUser?.name} • {currentClass?.name}
              </p>
            </div>
          </div>
          <div className="header-actions">
            <button onClick={exportToCSV} className="btn-secondary">
              <FaDownload />
              <span>Export CSV</span>
            </button>
            <button onClick={loadAttendanceData} className="btn-primary" disabled={isLoading}>
              <FaSync className={isLoading ? 'spinning' : ''} />
              <span>{isLoading ? 'Loading...' : 'Refresh'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Current Class Info */}
      {currentClass && (
        <div className="current-class-info">
          <div className="class-card">
            <div className="class-header">
              <FaBuilding className="class-icon" />
              <h3>{currentClass.name} - Attendance</h3>
              <span className="class-room">{currentClass.room}</span>
            </div>
            <div className="class-details">
              <div className="class-staff">
                <div className="staff-item">
                  <FaChalkboardTeacher />
                  <span>Teacher: {currentClass.classTeacher}</span>
                </div>
                <div className="staff-item">
                  <FaUserGraduate />
                  <span>Class Chief: {currentClass.classChief}</span>
                </div>
              </div>
              <div className="class-schedule">
                <FaClock />
                <span>{currentClass.schedule}</span>
              </div>
              <div className="class-stats">
                <FaUsers />
                <span>50 Students • Marking for: {selectedDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <span className="stat-subtitle">in {currentClass?.name}</span>
            </div>
          </div>
          <div className="stat-card success">
            <div className="stat-icon">
              <FaUserCheck />
            </div>
            <div className="stat-content">
              <h3>{stats.present}</h3>
              <p>Present Today</p>
              <span className="stat-subtitle">
                {stats.totalStudents > 0 ? Math.round((stats.present / stats.totalStudents) * 100) : 0}%
              </span>
            </div>
          </div>
          <div className="stat-card danger">
            <div className="stat-icon">
              <FaUserTimes />
            </div>
            <div className="stat-content">
              <h3>{stats.absent}</h3>
              <p>Absent</p>
              <span className="stat-subtitle">
                {stats.totalStudents > 0 ? Math.round((stats.absent / stats.totalStudents) * 100) : 0}%
              </span>
            </div>
          </div>
          <div className="stat-card info">
            <div className="stat-icon">
              <FaChartBar />
            </div>
            <div className="stat-content">
              <h3>{stats.attendanceRate}%</h3>
              <p>Attendance Rate</p>
              <span className="stat-subtitle">Reported to DM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
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
          
          <div className="filter-group search-group">
            <label>Search Students/Parents</label>
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by student name, ID, or parent name..."
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
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="attendance-table-container">
        <div className="table-header">
          <h3>Class Attendance - {currentClass?.name}</h3>
          <div className="header-info">
            <span className="records-count">
              {filteredData.length} students • {selectedDate}
            </span>
            <span className="marker-info">
              Marked by: {currentUser?.name} (Class Chief)
            </span>
          </div>
        </div>
        
        <div className="table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Father Name</th>
                <th>Mother Name</th>
                <th>Parent Phone</th>
                <th>Class</th>
                <th>Status</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Remarks</th>
                <th>Marked By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student) => (
                <tr key={student.id} className="table-row">
                  <td className="student-id">
                    <span>{student.studentId}</span>
                  </td>
                  <td className="student-name">
                    <button 
                      className="name-btn"
                      onClick={() => viewStudentDetails(student)}
                    >
                      {student.name}
                    </button>
                  </td>
                  <td className="parent-name">
                    <FaMale className="parent-icon" />
                    <span>{student.fatherName}</span>
                  </td>
                  <td className="parent-name">
                    <FaFemale className="parent-icon" />
                    <span>{student.motherName}</span>
                  </td>
                  <td className="parent-phone">
                    <FaPhone className="phone-icon" />
                    <span>{student.parentPhone}</span>
                  </td>
                  <td className="class-cell">
                    <span className="class-name">{student.className}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${student.status}`}>
                      {getStatusIcon(student.status)}
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td className="time-cell">{student.checkInTime}</td>
                  <td className="time-cell">{student.checkOutTime}</td>
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
                    />
                  </td>
                  <td className="marked-by">
                    <FaUser className="marker-icon" />
                    <span>{student.markedBy}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => updateAttendanceStatus(student.id, 'present')}
                        className={`action-btn present ${student.status === 'present' ? 'active' : ''}`}
                        title="Mark Present"
                      >
                        <FaUserCheck />
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredData.length === 0 && (
            <div className="empty-state">
              <FaUserTimes className="empty-icon" />
              <h3>No students found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-card" onClick={showAbsentStudentsReport}>
            <FaClipboardList className="action-icon" />
            <span>View Absent Report</span>
          </button>
          <button className="action-card" onClick={exportToCSV}>
            <FaDownload className="action-icon" />
            <span>Export Report</span>
          </button>
          <button className="action-card">
            <FaHistory className="action-icon" />
            <span>Attendance History</span>
          </button>
        </div>
      </div>

      {/* Student Details Modal */}
      {showStudentModal && selectedStudent && (
        <div className="modal-overlay">
          <div className="student-modal">
            <div className="modal-header">
              <h3>Student Details</h3>
              <button 
                className="close-btn"
                onClick={() => setShowStudentModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-content">
              <div className="student-info">
                <div className="info-section">
                  <h4>Student Information</h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Student ID:</label>
                      <span>{selectedStudent.studentId}</span>
                    </div>
                    <div className="info-item">
                      <label>Full Name:</label>
                      <span>{selectedStudent.name}</span>
                    </div>
                    <div className="info-item">
                      <label>Class:</label>
                      <span>{selectedStudent.className}</span>
                    </div>
                    <div className="info-item">
                      <label>Level:</label>
                      <span>{selectedStudent.level}</span>
                    </div>
                  </div>
                </div>
                
                <div className="info-section">
                  <h4>Parent Information</h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Father's Name:</label>
                      <span>{selectedStudent.fatherName}</span>
                    </div>
                    <div className="info-item">
                      <label>Mother's Name:</label>
                      <span>{selectedStudent.motherName}</span>
                    </div>
                    <div className="info-item">
                      <label>Parent Phone:</label>
                      <span>{selectedStudent.parentPhone}</span>
                    </div>
                    <div className="info-item">
                      <label>WhatsApp:</label>
                      <span>{selectedStudent.parentWhatsapp}</span>
                    </div>
                  </div>
                </div>
                
                <div className="info-section">
                  <h4>Attendance History (Last 7 Days)</h4>
                  <div className="attendance-history">
                    {getAttendanceHistory(selectedStudent.studentId).map((record, index) => (
                      <div key={index} className="history-item">
                        <span className="history-date">{record.date}</span>
                        <span className={`history-status ${record.status}`}>
                          {record.status.toUpperCase()}
                        </span>
                        <span className="history-time">{record.checkInTime}</span>
                        <span className="history-marker">{record.markedBy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={() => setShowStudentModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Absent Students Report Modal */}
      {showAbsentReport && (
        <div className="modal-overlay">
          <div className="student-modal">
            <div className="modal-header">
              <h3>Absent Students Report - {selectedDate}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAbsentReport(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-content">
              <div className="report-info">
                <p><strong>Total Absent:</strong> {absentStudents.length} students</p>
                <p><strong>Class:</strong> {currentClass?.name}</p>
                <p><strong>Reported to DM:</strong> Yes</p>
              </div>
              
              <div className="absent-list">
                <h4>Absent Students</h4>
                <div className="table-wrapper">
                  <table className="attendance-table">
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Father Name</th>
                        <th>Mother Name</th>
                        <th>Parent Phone</th>
                        <th>Class</th>
                      </tr>
                    </thead>
                    <tbody>
                      {absentStudents.map((student) => (
                        <tr key={student.id}>
                          <td>{student.name}</td>
                          <td>{student.fatherName}</td>
                          <td>{student.motherName}</td>
                          <td>{student.parentPhone}</td>
                          <td>{student.className}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={() => setShowAbsentReport(false)}
              >
                Close
              </button>
              <button 
                className="btn-primary"
                onClick={sendWhatsAppMessages}
                disabled={absentStudents.length === 0}
              >
                <FaWhatsapp />
                Send WhatsApp to Parents
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TVETAttendanceSystem;