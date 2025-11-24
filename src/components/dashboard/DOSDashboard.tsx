// src/components/dashboard/DOSDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaChartLine, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaBook, 
  FaCalendarAlt,
  FaClipboardList,
  FaBell,
  FaSearch
} from 'react-icons/fa';
import './Dashboard.css';
const DOSDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('apaer_current_user'));
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = () => {
    setStats({
      totalStudents: 1247,
      totalTeachers: 85,
      totalClasses: 45,
      attendanceRate: 94.2
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Director of Studies Dashboard</h1>
          <p>Welcome back, {user.fullName}</p>
        </div>
        <div className="header-right">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search students, teachers, classes..." />
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">
            <FaChalkboardTeacher />
          </div>
          <div className="stat-info">
            <h3>{stats.totalTeachers}</h3>
            <p>Teaching Staff</p>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <FaBook />
          </div>
          <div className="stat-info">
            <h3>{stats.totalClasses}</h3>
            <p>Active Classes</p>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">
            <FaClipboardList />
          </div>
          <div className="stat-info">
            <h3>{stats.attendanceRate}%</h3>
            <p>Attendance Rate</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-left">
          <div className="card">
            <h3>Academic Overview</h3>
            <p>Director of Studies content goes here...</p>
          </div>
        </div>
        <div className="content-right">
          <div className="card">
            <h3>Quick Actions</h3>
            <div className="action-grid">
              <button className="action-btn">
                <FaCalendarAlt />
                <span>Academic Calendar</span>
              </button>
              <button className="action-btn">
                <FaChartLine />
                <span>Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DOSDashboard;