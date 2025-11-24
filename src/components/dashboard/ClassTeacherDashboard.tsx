// src/components/dashboard/ClassTeacherDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaChalkboard, 
  FaUserGraduate, 
  FaClipboardList, 
  FaBook,
  FaChartBar,
  FaComments,
  FaCalendar,
  FaUpload,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUserCheck,
  FaUserTimes,
  FaClock
} from 'react-icons/fa';
import './teacher.css';

const ClassTeacherDashboard = () => {
  const [user, setUser] = useState(null);
  const [classInfo, setClassInfo] = useState({});
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [dmReports, setDmReports] = useState([]);
  const [pendingVerification, setPendingVerification] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('apaer_current_user'));
    if (!currentUser || currentUser.role !== 'CLASS_TEACHER') {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    loadClassData();
    loadDmReports();
  }, [navigate]);

  const loadClassData = () => {
    // Get teacher's assigned classes
    const teacherClasses = JSON.parse(localStorage.getItem('teacher_assignments') || '[]')
      .filter(assignment => assignment.teacherId === user?.id);
    
    setClassInfo({
      className: teacherClasses.map(c => c.className).join(', ') || 'Multiple Classes',
      totalStudents: 150,
      assignedClasses: teacherClasses,
      presentToday: 142,
      classSchedule: 'Mon-Fri, 8:00 AM - 3:00 PM'
    });

    // Load today's attendance that needs verification
    const today = new Date().toISOString().split('T')[0];
    const allAttendance = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
    const todayClassAttendance = allAttendance.filter(record => 
      record.date === today && 
      teacherClasses.some(cls => cls.classId === record.programId) &&
      !record.verifiedBy
    );

    setPendingVerification(todayClassAttendance.length);
    setTodayAttendance(todayClassAttendance.slice(0, 5));
  };

  const loadDmReports = () => {
    const reports = JSON.parse(localStorage.getItem('dm_attendance_reports') || '[]');
    const myClassReports = reports.filter(report => 
      report.classTeacherId === user?.id
    ).slice(0, 5);
    setDmReports(myClassReports);
  };

  const handleTakeAttendance = () => {
    navigate('/attendance');
  };

  const handleVerifyAttendance = () => {
    navigate('/attendance?verify=true');
  };

  const handleSendDMReport = () => {
    // Send consolidated report to DM
    const today = new Date().toISOString().split('T')[0];
    const allAttendance = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
    const todayReports = allAttendance.filter(record => 
      record.date === today && 
      (record.status === 'absent' || record.status === 'late') &&
      !record.verifiedBy
    );

    if (todayReports.length === 0) {
      alert('No pending reports to send to DM');
      return;
    }

    // Mark as verified and send to DM
    todayReports.forEach(record => {
      const updatedRecord = {
        ...record,
        verifiedBy: user.name,
        verificationTime: new Date().toISOString()
      };
      
      // Update localStorage
      const allRecords = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
      const filteredRecords = allRecords.filter(r => 
        !(r.id === record.id && r.date === record.date)
      );
      localStorage.setItem('tvet_attendance', JSON.stringify([...filteredRecords, updatedRecord]));
    });

    alert(`Sent ${todayReports.length} verified reports to DM`);
    loadClassData();
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
          <h1>Class Teacher Dashboard</h1>
          <p>{classInfo.className} • {user.fullName}</p>
          <div className="teacher-role-badge">
            <FaChalkboard />
            <span>Class Teacher - Attendance Verifier</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleTakeAttendance}>
            <FaClipboardList />
            Mark Attendance
          </button>
          <button className="btn-success" onClick={handleVerifyAttendance}>
            <FaCheckCircle />
            Verify Attendance
          </button>
          <button className="btn-warning" onClick={handleSendDMReport}>
            <FaPaperPlane />
            Send DM Report
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <FaUserGraduate />
          </div>
          <div className="stat-info">
            <h3>{classInfo.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">
            <FaClipboardList />
          </div>
          <div className="stat-info">
            <h3>{classInfo.presentToday}</h3>
            <p>Present Today</p>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <h3>{pendingVerification}</h3>
            <p>Pending Verification</p>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">
            <FaPaperPlane />
          </div>
          <div className="stat-info">
            <h3>{dmReports.length}</h3>
            <p>DM Reports Today</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-left">
          {/* Pending Verification */}
          <div className="card">
            <div className="card-header">
              <h3>Attendance Pending Verification</h3>
              <span className="badge warning">{pendingVerification} pending</span>
            </div>
            <div className="attendance-list">
              {todayAttendance.map(record => (
                <div key={record.id} className="attendance-item">
                  <div className="student-info">
                    <span className="student-name">{record.name}</span>
                    <span className="student-id">{record.studentId}</span>
                  </div>
                  <div className={`attendance-status ${record.status}`}>
                    {getStatusIcon(record.status)}
                    <span>{record.status.charAt(0).toUpperCase() + record.status.slice(1)}</span>
                  </div>
                  <span className="check-in-time">{record.checkInTime}</span>
                  <button 
                    className="btn-success btn-sm"
                    onClick={() => {/* Verify individual record */}}
                  >
                    Verify
                  </button>
                </div>
              ))}
            </div>
            <button className="view-all-btn" onClick={handleVerifyAttendance}>
              Verify All Attendance
            </button>
          </div>

          {/* Recent DM Reports */}
          <div className="card">
            <div className="card-header">
              <h3>Recent DM Reports</h3>
            </div>
            <div className="reports-list">
              {dmReports.map(report => (
                <div key={report.id} className="report-item">
                  <div className="report-header">
                    <strong>{report.studentName}</strong>
                    <span className={`status-badge ${report.status}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="report-details">
                    <span>Reported by: {report.reportedBy}</span>
                    <span>Date: {report.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="content-right">
          {/* Quick Actions */}
          <div className="card">
            <h3>Attendance Management</h3>
            <div className="action-grid">
              <button className="action-btn primary" onClick={handleTakeAttendance}>
                <FaClipboardList />
                <span>Mark Attendance</span>
                <small>Record daily attendance</small>
              </button>
              <button className="action-btn success" onClick={handleVerifyAttendance}>
                <FaCheckCircle />
                <span>Verify Records</span>
                <small>Check class chief entries</small>
              </button>
              <button className="action-btn warning" onClick={handleSendDMReport}>
                <FaPaperPlane />
                <span>Report to DM</span>
                <small>Send verified reports</small>
              </button>
              <button className="action-btn info">
                <FaChartBar />
                <span>View Analytics</span>
                <small>Attendance trends</small>
              </button>
            </div>
          </div>

          {/* Class Information */}
          <div className="card">
            <div className="card-header">
              <h3>Assigned Classes</h3>
              <FaChalkboard />
            </div>
            <div className="classes-list">
              {classInfo.assignedClasses?.map(cls => (
                <div key={cls.classId} className="class-item">
                  <div className="class-name">{cls.className}</div>
                  <div className="class-details">
                    <span>Students: {cls.totalStudents}</span>
                    <span>Level: {cls.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DM Reporting Status */}
          <div className="card">
            <div className="card-header">
              <h3>DM Reporting Status</h3>
              <div className={`status-indicator ${pendingVerification > 0 ? 'active' : 'inactive'}`}>
                {pendingVerification > 0 ? 'Pending' : 'Up to Date'}
              </div>
            </div>
            <div className="reporting-info">
              <p>
                <strong>Unverified Records:</strong> {pendingVerification}
              </p>
              <p>
                <strong>Last DM Report:</strong> {
                  dmReports.length > 0 
                    ? new Date(dmReports[0]?.timestamp).toLocaleTimeString()
                    : 'No reports today'
                }
              </p>
              <div className="reporting-note">
                <FaExclamationTriangle />
                <span>Verify all attendance before sending final report to DM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassTeacherDashboard;