// src/components/dashboard/ClassChiefDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaClipboardCheck, 
  FaBullhorn, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendar,
  FaChartLine,
  FaUserCheck,
  FaUserTimes,
  FaClock,
  FaSchool,
  FaChalkboardTeacher,
  FaAward,
  FaPaperPlane,
  FaFileExport
} from 'react-icons/fa';
import './ClassChiefDashboard.css';
const ClassChiefDashboard = () => {
  const [user, setUser] = useState(null);
  const [classData, setClassData] = useState({});
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [dmReports, setDmReports] = useState([]);
  const [todayStats, setTodayStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('apaer_current_user'));
    if (!currentUser || currentUser.role !== 'CLASS_CHIEF') {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    loadClassChiefData();
    loadTodayAttendance();
    loadDmReports();
  }, [navigate]);

  const loadClassChiefData = () => {
    const userClass = getUserClass();
    
    setClassData({
      className: userClass?.name || 'Class Not Assigned',
      totalStudents: userClass?.totalStudents || 50,
      classTeacher: userClass?.classTeacher || 'Not Assigned',
      classChief: user?.fullName || 'You',
      room: userClass?.room || 'Not Assigned',
      schedule: userClass?.schedule || 'Mon-Fri, 8:00 AM - 4:00 PM',
      program: userClass?.program || 'Not Specified'
    });

    // Load recent attendance records
    const allRecords = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
    const classRecords = allRecords.filter(record => 
      record.markedBy === user?.fullName
    ).slice(0, 5);

    setAttendanceRecords(classRecords);
  };

  const loadTodayAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    const allRecords = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
    const todayClassRecords = allRecords.filter(record => 
      record.date === today && record.markedBy === user?.fullName
    );

    const present = todayClassRecords.filter(record => record.status === 'present').length;
    const absent = todayClassRecords.filter(record => record.status === 'absent').length;
    const late = todayClassRecords.filter(record => record.status === 'late').length;
    const total = todayClassRecords.length;
    const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;

    setTodayStats({
      present,
      absent,
      late,
      total,
      attendanceRate,
      reportedToDM: absent + late
    });
  };

  const loadDmReports = () => {
    const reports = JSON.parse(localStorage.getItem('dm_attendance_reports') || '[]');
    const myReports = reports.filter(report => 
      report.reportedBy === user?.fullName
    ).slice(0, 5);
    setDmReports(myReports);
  };

  const getUserClass = () => {
    const classes = [
      {
        id: "SOD-L3",
        name: "SOD Level 3",
        program: "Software Development",
        level: "L3",
        classTeacher: "Mr. John Smith",
        classChief: user?.fullName || "Alice Johnson",
        room: "Lab 101",
        schedule: "Mon-Fri, 8:00 AM - 4:00 PM",
        totalStudents: 50
      }
      // ... other classes
    ];

    return classes.find(cls => cls.classChief === user?.fullName) || classes[0];
  };

  const handleMarkAttendance = () => {
    navigate('/attendance');
  };

  const handleSendDMReport = () => {
    const today = new Date().toISOString().split('T')[0];
    const allRecords = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
    const todayRecords = allRecords.filter(record => 
      record.date === today && 
      record.markedBy === user?.fullName &&
      (record.status === 'absent' || record.status === 'late') &&
      !record.reportedToDM
    );

    if (todayRecords.length === 0) {
      alert('No new absent/late students to report to DM');
      return;
    }

    // Mark as reported to DM
    todayRecords.forEach(record => {
      const updatedRecord = {
        ...record,
        reportedToDM: true,
        dmReportTime: new Date().toISOString()
      };
      
      const allRecords = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
      const filteredRecords = allRecords.filter(r => 
        !(r.id === record.id && r.date === record.date)
      );
      localStorage.setItem('tvet_attendance', JSON.stringify([...filteredRecords, updatedRecord]));
    });

    alert(`Reported ${todayRecords.length} students to DM`);
    loadTodayAttendance();
    loadDmReports();
  };

  const handleExportClassReport = () => {
    const today = new Date().toISOString().split('T')[0];
    const allRecords = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
    const classRecords = allRecords.filter(record => 
      record.date === today && record.markedBy === user?.fullName
    );

    const csvContent = [
      ['Student ID', 'Name', 'Status', 'Check-in Time', 'Remarks'],
      ...classRecords.map(record => [
        record.studentId,
        record.name,
        record.status,
        record.checkInTime,
        record.remarks
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `class-attendance-${today}.csv`;
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

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Class Chief Dashboard</h1>
          <p>Class: {classData.className} • Chief: {user.fullName}</p>
          <div className="class-details">
            <span className="class-program">{classData.program}</span>
            <span className="class-room">{classData.room}</span>
            <span className="class-schedule">{classData.schedule}</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleMarkAttendance}>
            <FaClipboardCheck />
            Mark Today's Attendance
          </button>
          <button className="btn-warning" onClick={handleSendDMReport}>
            <FaPaperPlane />
            Report to DM
          </button>
          <button className="btn-secondary" onClick={handleExportClassReport}>
            <FaFileExport />
            Export Report
          </button>
        </div>
      </div>

      {/* Today's Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>{classData.totalStudents}</h3>
            <p>Total Students</p>
            <span className="stat-subtitle">In Class</span>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">
            <FaUserCheck />
          </div>
          <div className="stat-info">
            <h3>{todayStats.present || 0}</h3>
            <p>Present Today</p>
            <span className="stat-subtitle">
              {todayStats.total > 0 ? Math.round((todayStats.present / todayStats.total) * 100) : 0}%
            </span>
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-icon">
            <FaUserTimes />
          </div>
          <div className="stat-info">
            <h3>{todayStats.absent || 0}</h3>
            <p>Absent Today</p>
            <span className="stat-subtitle">{todayStats.reportedToDM || 0} reported</span>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <FaPaperPlane />
          </div>
          <div className="stat-info">
            <h3>{dmReports.length}</h3>
            <p>DM Reports</p>
            <span className="stat-subtitle">Today</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-left">
          {/* Today's Attendance Summary */}
          <div className="card">
            <div className="card-header">
              <h3>Today's Attendance Summary</h3>
              <span className="date-badge">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="attendance-summary">
              <div className="summary-item">
                <span className="summary-label">Marked Students:</span>
                <span className="summary-value">{todayStats.total || 0}/{classData.totalStudents}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Pending:</span>
                <span className="summary-value">{classData.totalStudents - (todayStats.total || 0)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Reports to DM:</span>
                <span className="summary-value">{todayStats.reportedToDM || 0}</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="btn-outline" onClick={handleMarkAttendance}>
                Continue Marking
              </button>
              <button className="btn-warning" onClick={handleSendDMReport}>
                Send DM Report
              </button>
            </div>
          </div>

          {/* Recent DM Reports */}
          <div className="card">
            <div className="card-header">
              <h3>Recent DM Reports</h3>
              <button className="view-all" onClick={() => {/* View all reports */}}>
                View All
              </button>
            </div>
            <div className="reports-list">
              {dmReports.map(report => (
                <div key={report.id} className="report-item">
                  <div className="report-student">
                    <strong>{report.studentName}</strong>
                    <span className="student-id">{report.studentCode}</span>
                  </div>
                  <div className={`report-status ${report.status}`}>
                    {getStatusIcon(report.status)}
                    <span>{report.status.charAt(0).toUpperCase() + report.status.slice(1)}</span>
                  </div>
                  <div className="report-time">
                    {new Date(report.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {dmReports.length === 0 && (
                <div className="empty-records">
                  <FaPaperPlane className="empty-icon" />
                  <p>No reports sent to DM today</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="content-right">
          {/* Class Information */}
          <div className="card class-info-card">
            <div className="card-header">
              <h3>Class Information</h3>
              <FaSchool className="header-icon" />
            </div>
            <div className="class-details-list">
              <div className="detail-item">
                <FaChalkboardTeacher className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Class Teacher</span>
                  <span className="detail-value">{classData.classTeacher}</span>
                </div>
              </div>
              <div className="detail-item">
                <FaUsers className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Total Students</span>
                  <span className="detail-value">{classData.totalStudents}</span>
                </div>
              </div>
              <div className="detail-item">
                <FaAward className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Your Role</span>
                  <span className="detail-value">Class Chief</span>
                </div>
              </div>
              <div className="detail-item">
                <FaPaperPlane className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">DM Reporting</span>
                  <span className="detail-value">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3>Chief Responsibilities</h3>
            <div className="action-grid">
              <button className="action-btn" onClick={handleMarkAttendance}>
                <FaClipboardCheck />
                <span>Daily Attendance</span>
                <small>Mark class presence</small>
              </button>
              <button className="action-btn" onClick={handleSendDMReport}>
                <FaPaperPlane />
                <span>Report to DM</span>
                <small>Absent/late students</small>
              </button>
              <button className="action-btn">
                <FaBullhorn />
                <span>Class Announcements</span>
                <small>Share updates</small>
              </button>
              <button className="action-btn" onClick={handleExportClassReport}>
                <FaFileExport />
                <span>Export Reports</span>
                <small>Download records</small>
              </button>
            </div>
          </div>

          {/* DM Reporting Status */}
          <div className="card reporting-status">
            <div className="card-header">
              <h3>DM Reporting Status</h3>
              <div className={`status-indicator ${todayStats.reportedToDM > 0 ? 'active' : 'inactive'}`}>
                {todayStats.reportedToDM > 0 ? 'Reports Pending' : 'All Clear'}
              </div>
            </div>
            <div className="reporting-info">
              <p>
                <strong>Absent/Late Students:</strong> {todayStats.reportedToDM || 0}
              </p>
              <p>
                <strong>Last Report:</strong> {
                  dmReports.length > 0 
                    ? new Date(dmReports[0]?.timestamp).toLocaleTimeString()
                    : 'No reports yet'
                }
              </p>
              <div className="reporting-note">
                <FaExclamationTriangle />
                <span>Report all absent/late students to DM daily</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassChiefDashboard;