// components/dashboard/DMDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaCog, 
  FaTools, 
  FaBoxes, 
  FaMoneyBillWave, 
  FaClipboardCheck,
  FaTruck,
  FaWarehouse,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaUserTimes,
  FaWhatsapp,
  FaEnvelope,
  FaChartBar,
  FaDownload,
  FaFilter,
  FaSchool,
  FaUserGraduate,
  FaPhone,
  FaMale,
  FaFemale
} from 'react-icons/fa';
import './Dashboard.css';

const DMDashboard = () => {
  const [user, setUser] = useState(null);
  const [attendanceReports, setAttendanceReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('apaer_current_user'));
    if (!currentUser || currentUser.role !== 'dm') {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    loadAttendanceReports();
  }, [navigate, selectedDate, selectedClass]);

  const loadAttendanceReports = () => {
    const reports = JSON.parse(localStorage.getItem('dm_attendance_reports') || '[]');
    const todayReports = reports.filter(report => report.date === selectedDate);
    
    if (selectedClass) {
      setFilteredReports(todayReports.filter(report => report.className === selectedClass));
    } else {
      setFilteredReports(todayReports);
    }
    
    calculateStats(todayReports);
  };

  const calculateStats = (reports) => {
    const totalAbsent = reports.filter(report => report.status === 'absent').length;
    const classes = [...new Set(reports.map(report => report.className))];
    const classChiefs = [...new Set(reports.map(report => report.classChief))];
    
    setStats({
      totalAbsent,
      totalClasses: classes.length,
      totalReports: reports.length,
      classChiefs: classChiefs.length,
      classes: classes
    });
  };

  const sendBulkWhatsAppMessages = () => {
    const absentReports = filteredReports.filter(report => report.status === 'absent');
    
    absentReports.forEach(report => {
      const message = `Dear Parent, ${report.studentName} from ${report.className} was absent today (${report.date}). Please contact the school if this needs clarification. - Apaer Institute Discipline Master`;
      
      // Create WhatsApp link
      const whatsappUrl = `https://wa.me/${report.parentPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      // Log the message
      console.log(`WhatsApp to ${report.parentPhone} (${report.fatherName}/${report.motherName}): ${message}`);
    });

    alert(`WhatsApp messages prepared for ${absentReports.length} absent students' parents.`);
  };

  const exportAbsentReport = () => {
    const absentReports = filteredReports.filter(report => report.status === 'absent');
    const csvContent = [
      ['Student Name', 'Class', 'Father Name', 'Mother Name', 'Parent Phone', 'Date', 'Marked By', 'Class Chief'],
      ...absentReports.map(report => [
        report.studentName,
        report.className,
        report.fatherName,
        report.motherName,
        report.parentPhone,
        report.date,
        report.markedBy,
        report.classChief
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `absent-students-${selectedDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getUniqueClasses = () => {
    return [...new Set(attendanceReports.map(report => report.className))];
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Discipline Master Dashboard</h1>
          <p>Attendance Monitoring & Parent Communication</p>
        </div>
        <div className="header-actions">
          <button onClick={exportAbsentReport} className="btn-secondary">
            <FaDownload />
            <span>Export Report</span>
          </button>
          <button onClick={sendBulkWhatsAppMessages} className="btn-primary">
            <FaWhatsapp />
            <span>Send WhatsApp to Parents</span>
          </button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <FaUserTimes />
          </div>
          <div className="stat-info">
            <h3>{stats.totalAbsent || 0}</h3>
            <p>Total Absent Today</p>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">
            <FaSchool />
          </div>
          <div className="stat-info">
            <h3>{stats.totalClasses || 0}</h3>
            <p>Classes Reported</p>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <FaUserGraduate />
          </div>
          <div className="stat-info">
            <h3>{stats.classChiefs || 0}</h3>
            <p>Class Chiefs Active</p>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">
            <FaClipboardCheck />
          </div>
          <div className="stat-info">
            <h3>{stats.totalReports || 0}</h3>
            <p>Total Reports</p>
          </div>
        </div>
      </div>

      {/* Filters */}
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
            <label>Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="filter-input"
            >
              <option value="">All Classes</option>
              {getUniqueClasses().map(className => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Reports Table */}
      <div className="attendance-table-container">
        <div className="table-header">
          <h3>Attendance Reports from Class Chiefs</h3>
          <div className="header-info">
            <span className="records-count">
              {filteredReports.length} reports for {selectedDate}
            </span>
          </div>
        </div>
        
        <div className="table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Father Name</th>
                <th>Mother Name</th>
                <th>Parent Phone</th>
                <th>Status</th>
                <th>Marked By</th>
                <th>Class Chief</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, index) => (
                <tr key={index} className="table-row">
                  <td className="student-name">
                    <strong>{report.studentName}</strong>
                  </td>
                  <td className="class-cell">
                    <span className="class-name">{report.className}</span>
                  </td>
                  <td className="parent-name">
                    <FaMale className="parent-icon" />
                    <span>{report.fatherName}</span>
                  </td>
                  <td className="parent-name">
                    <FaFemale className="parent-icon" />
                    <span>{report.motherName}</span>
                  </td>
                  <td className="parent-phone">
                    <FaPhone className="phone-icon" />
                    <span>{report.parentPhone}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${report.status}`}>
                      {report.status === 'absent' ? <FaUserTimes /> : <FaUserCheck />}
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td className="marked-by">
                    <span>{report.markedBy}</span>
                  </td>
                  <td className="chief-name">
                    <span>{report.classChief}</span>
                  </td>
                  <td className="time-cell">
                    {new Date(report.timestamp).toLocaleTimeString()}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn whatsapp"
                        onClick={() => {
                          const message = `Dear Parent, ${report.studentName} from ${report.className} was absent today (${report.date}). Please contact the school if this needs clarification. - Apaer Institute Discipline Master`;
                          const whatsappUrl = `https://wa.me/${report.parentPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                        title="Send WhatsApp"
                      >
                        <FaWhatsapp />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredReports.length === 0 && (
            <div className="empty-state">
              <FaClipboardCheck className="empty-icon" />
              <h3>No attendance reports for selected date</h3>
              <p>Reports will appear here when class chiefs mark attendance</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Discipline Management</h3>
        <div className="actions-grid">
          <button className="action-card" onClick={sendBulkWhatsAppMessages}>
            <FaWhatsapp className="action-icon" />
            <span>Bulk WhatsApp</span>
            <small>Send to all absent</small>
          </button>
          <button className="action-card">
            <FaEnvelope className="action-icon" />
            <span>Email Reports</span>
            <small>Send to administration</small>
          </button>
          <button className="action-card">
            <FaChartBar className="action-icon" />
            <span>Analytics</span>
            <small>View trends</small>
          </button>
          <button className="action-card">
            <FaUsers className="action-icon" />
            <span>Class Chiefs</span>
            <small>Manage chiefs</small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DMDashboard;