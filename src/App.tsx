// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SchoolLife from './pages/SchoolLife';
import Academic from './pages/Academic';
import Payment from './pages/Payment';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import TimetableGenerator from './pages/TimetableGenerator';
import TimetableManager from './pages/TimetableManager';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import DOSDashboard from './components/dashboard/DOSDashboard';
import DMDashboard from './components/dashboard/DMDashboard';
import ClassTeacherDashboard from './components/dashboard/ClassTeacherDashboard';
import ClassChiefDashboard from './components/dashboard/ClassChiefDashboard';
import TVETAttendanceSystem from './components/TVETAttendanceSystem';
import Unauthorized from './components/Unauthorized';
import Navbar from './components/Navbar';
import './App.css';

// Enhanced initialization with error handling and progress tracking
const initializeDefaultUsers = () => {
  try {
    console.log('🔧 Initializing default users...');
    const existingUsers = JSON.parse(localStorage.getItem('apaer_users') || '[]');
    
    const defaultUsers = [
      {
        id: 1,
        email: 'admin@apaer.ac.rw',
        password: 'admin123',
        fullName: 'System Administrator',
        role: 'admin',
        avatar: '/images/avatars/admin.png',
        createdAt: new Date().toISOString(),
        isActive: true,
        lastLogin: new Date().toISOString(),
        permissions: ['all'],
        department: 'Administration',
        phone: '+250788123456',
        profile: {
          joinDate: '2024-01-01',
          position: 'System Administrator',
          bio: 'Responsible for overall system management and configuration'
        },
        settings: {
          theme: 'light',
          notifications: true,
          language: 'en'
        }
      },
      {
        id: 2,
        email: 'dos@apaer.ac.rw',
        password: 'dos123',
        fullName: 'Director of Studies',
        role: 'dos',
        avatar: '/images/avatars/dos.png',
        createdAt: new Date().toISOString(),
        isActive: true,
        lastLogin: new Date().toISOString(),
        permissions: ['view_all', 'export_reports', 'analytics', 'receive_reports', 'system_management', 'user_management'],
        department: 'Academic Administration',
        phone: '+250788123457',
        profile: {
          joinDate: '2024-01-01',
          position: 'Director of Studies',
          bio: 'Oversees academic programs and student performance'
        },
        settings: {
          theme: 'light',
          notifications: true,
          language: 'en'
        }
      },
      {
        id: 3,
        email: 'dm@apaer.ac.rw',
        password: 'dm123',
        fullName: 'Department Manager',
        role: 'dm',
        avatar: '/images/avatars/dm.png',
        createdAt: new Date().toISOString(),
        isActive: true,
        lastLogin: new Date().toISOString(),
        permissions: ['view_all', 'export_reports', 'analytics', 'receive_reports', 'system_management', 'config_management'],
        department: 'Management',
        phone: '+250788123458',
        profile: {
          joinDate: '2024-01-01',
          position: 'Department Manager',
          bio: 'Manages departmental operations and resources'
        },
        settings: {
          theme: 'light',
          notifications: true,
          language: 'en'
        }
      },
      {
        id: 4,
        email: 'teacher.sod@apaer.ac.rw',
        password: 'teacher123',
        fullName: 'John Smith - SOD Teacher',
        role: 'class_teacher',
        avatar: '/images/avatars/teacher.png',
        createdAt: new Date().toISOString(),
        isActive: true,
        lastLogin: new Date().toISOString(),
        permissions: ['mark_attendance', 'view_class', 'export_reports', 'manage_remarks'],
        department: 'Software Development',
        phone: '+250788123459',
        programAccess: [1],
        profile: {
          joinDate: '2024-01-15',
          position: 'Class Teacher - Software Development',
          bio: 'Software development instructor with 5+ years experience'
        },
        settings: {
          theme: 'light',
          notifications: true,
          language: 'en'
        }
      },
      {
        id: 5,
        email: 'chief.sod@apaer.ac.rw',
        password: 'chief123',
        fullName: 'Alice Johnson - Class Chief',
        role: 'class_chief',
        avatar: '/images/avatars/chief.png',
        createdAt: new Date().toISOString(),
        isActive: true,
        lastLogin: new Date().toISOString(),
        permissions: ['mark_attendance', 'view_class', 'export_reports'],
        department: 'Software Development',
        phone: '+250788123460',
        programAccess: [1],
        profile: {
          joinDate: '2024-01-15',
          position: 'Class Chief - Software Development',
          bio: 'Student leader assisting with class management'
        },
        settings: {
          theme: 'light',
          notifications: true,
          language: 'en'
        }
      },
      {
        id: 6,
        email: 'user@example.com',
        password: 'user123',
        fullName: 'John Doe',
        role: 'user',
        avatar: '/images/avatars/user.png',
        createdAt: new Date().toISOString(),
        isActive: true,
        lastLogin: new Date().toISOString(),
        permissions: ['view_class'],
        department: 'General',
        phone: '+250788123461',
        profile: {
          joinDate: '2024-02-01',
          position: 'Student',
          bio: 'Software Development student'
        },
        settings: {
          theme: 'light',
          notifications: true,
          language: 'en'
        }
      }
    ];

    // Enhanced user initialization with conflict resolution
    let usersAdded = 0;
    defaultUsers.forEach(defaultUser => {
      const exists = existingUsers.find(user => user.email === defaultUser.email);
      if (!exists) {
        existingUsers.push(defaultUser);
        usersAdded++;
      }
    });

    localStorage.setItem('apaer_users', JSON.stringify(existingUsers));
    console.log(`✅ Default users initialized: ${usersAdded} new users added`);
    
    // Initialize system settings if not exists
    if (!localStorage.getItem('apaer_system_settings')) {
      const systemSettings = {
        schoolName: 'Apaer Institute',
        schoolYear: '2024',
        semester: '1',
        maintenanceMode: false,
        allowRegistrations: true,
        maxFileSize: 10, // MB
        supportedFormats: ['pdf', 'doc', 'docx', 'jpg', 'png'],
        backupSchedule: 'daily',
        lastBackup: null
      };
      localStorage.setItem('apaer_system_settings', JSON.stringify(systemSettings));
    }
    
    return existingUsers;
  } catch (error) {
    console.error('❌ Error initializing default users:', error);
    return [];
  }
};

// Enhanced timetable data initialization
const initializeTimetableData = () => {
  try {
    console.log('🔧 Initializing timetable data...');
    const existingData = JSON.parse(localStorage.getItem('apaer_timetable_data') || 'null');
    
    if (!existingData) {
      const sampleData = {
        oLevelSubjects: [
          { id: 1, name: 'Mathematics', code: 'MATH', duration: 1, teachers: [1, 2], color: '#FF6B6B' },
          { id: 2, name: 'English', code: 'ENG', duration: 1, teachers: [3, 4], color: '#4ECDC4' },
          { id: 3, name: 'Physics', code: 'PHY', duration: 2, teachers: [5], color: '#45B7D1' },
          { id: 4, name: 'Chemistry', code: 'CHEM', duration: 2, teachers: [6], color: '#96CEB4' },
          { id: 5, name: 'Biology', code: 'BIO', duration: 2, teachers: [7], color: '#FFEAA7' },
          { id: 6, name: 'History', code: 'HIST', duration: 1, teachers: [8], color: '#DDA0DD' },
          { id: 7, name: 'Geography', code: 'GEO', duration: 1, teachers: [9], color: '#98D8C8' },
          { id: 8, name: 'Kinyarwanda', code: 'KIN', duration: 1, teachers: [10], color: '#F7DC6F' },
          { id: 9, name: 'French', code: 'FR', duration: 1, teachers: [11], color: '#BB8FCE' },
          { id: 10, name: 'Computer Science', code: 'COMP', duration: 2, teachers: [12], color: '#85C1E9' }
        ],
        tvetModules: [
          { id: 11, name: 'Software Development', code: 'SD', duration: 3, teachers: [13], labRequired: true, color: '#E74C3C' },
          { id: 12, name: 'Tourism & Hospitality', code: 'TH', duration: 2, teachers: [14], practicalRequired: true, color: '#3498DB' },
          { id: 13, name: 'Masonry', code: 'MAS', duration: 4, teachers: [15], workshopRequired: true, color: '#2ECC71' },
          { id: 14, name: 'Carpentry', code: 'CARP', duration: 4, teachers: [16], workshopRequired: true, color: '#F39C12' },
          { id: 15, name: 'Electrical Installation', code: 'EI', duration: 3, teachers: [17], labRequired: true, color: '#9B59B6' },
          { id: 16, name: 'Plumbing', code: 'PLUM', duration: 3, teachers: [18], workshopRequired: true, color: '#1ABC9C' }
        ],
        teachers: [
          { id: 1, name: 'Mr. John Smith', subjects: [1], type: 'o-level', availability: 'full-time' },
          { id: 2, name: 'Mrs. Alice Brown', subjects: [1], type: 'o-level', availability: 'full-time' },
          { id: 3, name: 'Mr. Robert Johnson', subjects: [2], type: 'o-level', availability: 'full-time' },
          { id: 4, name: 'Ms. Sarah Wilson', subjects: [2], type: 'o-level', availability: 'full-time' },
          { id: 5, name: 'Dr. James Miller', subjects: [3], type: 'o-level', availability: 'full-time' },
          { id: 6, name: 'Prof. Maria Garcia', subjects: [4], type: 'o-level', availability: 'full-time' },
          { id: 7, name: 'Dr. David Lee', subjects: [5], type: 'o-level', availability: 'full-time' },
          { id: 8, name: 'Mr. Paul Ndayisaba', subjects: [6], type: 'o-level', availability: 'full-time' },
          { id: 9, name: 'Mrs. Grace Uwase', subjects: [7], type: 'o-level', availability: 'full-time' },
          { id: 10, name: 'Ms. Anne Mugisha', subjects: [8], type: 'o-level', availability: 'full-time' },
          { id: 11, name: 'Mr. Pierre Ntawukuriryayo', subjects: [9], type: 'o-level', availability: 'full-time' },
          { id: 12, name: 'Mr. Eric Habimana', subjects: [10], type: 'o-level', availability: 'full-time' },
          { id: 13, name: 'Eng. Patrick Nshuti', subjects: [11], type: 'tvet', availability: 'full-time' },
          { id: 14, name: 'Mrs. Chantal Uwimana', subjects: [12], type: 'tvet', availability: 'full-time' },
          { id: 15, name: 'Mr. Joseph Twahirwa', subjects: [13], type: 'tvet', availability: 'full-time' },
          { id: 16, name: 'Mr. Samuel Kayumba', subjects: [14], type: 'tvet', availability: 'full-time' },
          { id: 17, name: 'Eng. Peter Rutayisire', subjects: [15], type: 'tvet', availability: 'full-time' },
          { id: 18, name: 'Mr. Charles Munyaneza', subjects: [16], type: 'tvet', availability: 'full-time' }
        ],
        rooms: [
          { id: 1, name: 'Room 101', type: 'classroom', capacity: 40, available: true },
          { id: 2, name: 'Room 102', type: 'classroom', capacity: 40, available: true },
          { id: 3, name: 'Room 103', type: 'classroom', capacity: 40, available: true },
          { id: 4, name: 'Science Lab A', type: 'lab', capacity: 30, available: true },
          { id: 5, name: 'Science Lab B', type: 'lab', capacity: 30, available: true },
          { id: 6, name: 'Computer Lab', type: 'lab', capacity: 25, available: true },
          { id: 7, name: 'Workshop A', type: 'workshop', capacity: 20, available: true },
          { id: 8, name: 'Workshop B', type: 'workshop', capacity: 20, available: true },
          { id: 9, name: 'Tourism Lab', type: 'lab', capacity: 25, available: true }
        ],
        classGroups: [
          { id: 1, name: 'S1A', level: 'S1', stream: 'A', type: 'o-level', subjects: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
          { id: 2, name: 'S1B', level: 'S1', stream: 'B', type: 'o-level', subjects: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
          { id: 3, name: 'S2A', level: 'S2', stream: 'A', type: 'o-level', subjects: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
          { id: 4, name: 'S2B', level: 'S2', stream: 'B', type: 'o-level', subjects: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
          { id: 5, name: 'S3A', level: 'S3', stream: 'A', type: 'o-level', subjects: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
          { id: 6, name: 'S3B', level: 'S3', stream: 'B', type: 'o-level', subjects: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
          { id: 7, name: 'S4A', level: 'S4', stream: 'A', type: 'o-level', subjects: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
          { id: 8, name: 'S4B', level: 'S4', stream: 'B', type: 'o-level', subjects: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
          { id: 9, name: 'TVET-SD-1', level: 'Year 1', program: 'Software Development', type: 'tvet', modules: [11] },
          { id: 10, name: 'TVET-TH-1', level: 'Year 1', program: 'Tourism & Hospitality', type: 'tvet', modules: [12] },
          { id: 11, name: 'TVET-MAS-1', level: 'Year 1', program: 'Masonry', type: 'tvet', modules: [13] },
          { id: 12, name: 'TVET-CARP-1', level: 'Year 1', program: 'Carpentry', type: 'tvet', modules: [14] }
        ],
        timeSlots: [
          { id: 1, start: '07:30', end: '08:15', period: 1 },
          { id: 2, start: '08:15', end: '09:00', period: 2 },
          { id: 3, start: '09:00', end: '09:45', period: 3 },
          { id: 4, start: '09:45', end: '10:00', period: 'Break' },
          { id: 5, start: '10:00', end: '10:45', period: 4 },
          { id: 6, start: '10:45', end: '11:30', period: 5 },
          { id: 7, start: '11:30', end: '12:15', period: 6 },
          { id: 8, start: '12:15', end: '13:30', period: 'Lunch' },
          { id: 9, start: '13:30', end: '14:15', period: 7 },
          { id: 10, start: '14:15', end: '15:00', period: 8 }
        ],
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem('apaer_timetable_data', JSON.stringify(sampleData));
      console.log('✅ Timetable data initialized successfully');
    } else {
      console.log('✅ Timetable data already exists');
    }
  } catch (error) {
    console.error('❌ Error initializing timetable data:', error);
  }
};

// Enhanced TVET students initialization
const initializeTVETStudents = () => {
  try {
    console.log('🔧 Initializing TVET students...');
    const existingStudents = JSON.parse(localStorage.getItem('tvet_students') || 'null');
    
    if (!existingStudents) {
      const sampleStudents = [
        {
          id: 1,
          name: 'Student 1',
          studentId: 'SOD301001',
          program: 'SOFTWARE DEVELOPMENT (SOD)',
          programId: 1,
          level: 'Level 3',
          email: 'student1@apaer.ac.rw',
          phone: '+250788100001',
          parentPhone: '+250788200001',
          parentWhatsapp: '+250788200001',
          joinDate: '2024-01-15',
          status: 'active',
          classChief: 'Alice Johnson',
          classTeacher: 'John Smith',
          attendance: [],
          performance: {
            average: 85,
            lastAssessment: '2024-01-10',
            progress: 'excellent'
          }
        },
        {
          id: 2,
          name: 'Student 2',
          studentId: 'SOD301002',
          program: 'SOFTWARE DEVELOPMENT (SOD)',
          programId: 1,
          level: 'Level 3',
          email: 'student2@apaer.ac.rw',
          phone: '+250788100002',
          parentPhone: '+250788200002',
          parentWhatsapp: '+250788200002',
          joinDate: '2024-01-15',
          status: 'active',
          classChief: 'Alice Johnson',
          classTeacher: 'John Smith',
          attendance: [],
          performance: {
            average: 76,
            lastAssessment: '2024-01-10',
            progress: 'good'
          }
        },
        {
          id: 3,
          name: 'Student 3',
          studentId: 'SOD401001',
          program: 'SOFTWARE DEVELOPMENT (SOD)',
          programId: 1,
          level: 'Level 4',
          email: 'student3@apaer.ac.rw',
          phone: '+250788100003',
          parentPhone: '+250788200003',
          parentWhatsapp: '+250788200003',
          joinDate: '2024-01-15',
          status: 'active',
          classChief: 'Mike Wilson',
          classTeacher: 'Sarah Johnson',
          attendance: [],
          performance: {
            average: 92,
            lastAssessment: '2024-01-10',
            progress: 'excellent'
          }
        }
      ];

      localStorage.setItem('tvet_students', JSON.stringify(sampleStudents));
      console.log('✅ TVET students initialized successfully');
    } else {
      console.log('✅ TVET students already exist');
    }
  } catch (error) {
    console.error('❌ Error initializing TVET students:', error);
  }
};

// Enhanced User Dashboard Component
const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('apaer_current_user') || '{}');
    setUser(currentUser);
    loadRecentActivity();
  }, []);

  const loadRecentActivity = () => {
    const activities = [
      { id: 1, type: 'welcome', message: 'Welcome to Apaer Institute dashboard', time: 'Just now', icon: '👋' },
      { id: 2, type: 'resources', message: 'Your academic resources are ready', time: 'Today', icon: '📚' },
      { id: 3, type: 'schedule', message: 'Class schedule updated for next week', time: '2 days ago', icon: '📅' },
      { id: 4, type: 'assignment', message: 'New assignment posted in Computer Science', time: '3 days ago', icon: '📝' }
    ];
    setRecentActivity(activities);
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      'dos': 'Director of Studies',
      'dm': 'Department Manager',
      'class_teacher': 'Class Teacher',
      'class_chief': 'Class Chief',
      'admin': 'System Administrator',
      'user': 'Student/Parent'
    };
    return roleNames[role] || role;
  };

  const handleQuickAction = (action) => {
    // Handle quick actions based on user role
    switch (action) {
      case 'attendance':
        window.location.href = '/attendance';
        break;
      case 'profile':
        window.location.href = '/profile';
        break;
      case 'settings':
        window.location.href = '/settings';
        break;
      case 'logout':
        localStorage.removeItem('apaer_current_user');
        localStorage.removeItem('apaer_token');
        window.location.href = '/';
        break;
      default:
        break;
    }
  };

  if (!user) {
    return <div className="loading-container">Loading your dashboard...</div>;
  }

  return (
    <div className="dashboard-container enhanced">
      <div className="dashboard-header">
        <div className="user-welcome">
          <h1>Welcome back, {user.fullName || user.name}! 👋</h1>
          <p className="user-role-badge">{getRoleDisplayName(user.role)}</p>
          <div className="welcome-message">
            <p>We're glad to have you here. Here's what's happening today.</p>
          </div>
        </div>
        <div className="dashboard-stats">
          <div className="stat-card enhanced">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Academic Progress</h3>
              <span>View your performance metrics</span>
              <div className="stat-trend up">+5.2%</div>
            </div>
          </div>
          <div className="stat-card enhanced">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>Schedule</h3>
              <span>Check your timetable</span>
              <div className="stat-trend neutral">2 classes today</div>
            </div>
          </div>
          <div className="stat-card enhanced">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h3>Goals</h3>
              <span>Track your objectives</span>
              <div className="stat-trend up">3 completed</div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content enhanced">
        <div className="quick-actions enhanced">
          <h2>Quick Actions</h2>
          <div className="action-grid enhanced">
            <div className="action-card enhanced" onClick={() => handleQuickAction('attendance')}>
              <div className="action-icon">✅</div>
              <div className="action-info">
                <h3>Attendance</h3>
                <p>Mark or view attendance records</p>
              </div>
              <div className="action-badge">New</div>
            </div>
            <div className="action-card enhanced" onClick={() => handleQuickAction('profile')}>
              <div className="action-icon">👤</div>
              <div className="action-info">
                <h3>Profile</h3>
                <p>Update your personal information</p>
              </div>
            </div>
            <div className="action-card enhanced" onClick={() => handleQuickAction('settings')}>
              <div className="action-icon">⚙️</div>
              <div className="action-info">
                <h3>Settings</h3>
                <p>Configure your preferences</p>
              </div>
            </div>
            <div className="action-card enhanced logout" onClick={() => handleQuickAction('logout')}>
              <div className="action-icon">🚪</div>
              <div className="action-info">
                <h3>Logout</h3>
                <p>Sign out of your account</p>
              </div>
            </div>
          </div>
        </div>

        <div className="recent-activity enhanced">
          <h2>Recent Activity</h2>
          <div className="activity-list enhanced">
            {recentActivity.map(activity => (
              <div key={activity.id} className="activity-item enhanced">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <p>{activity.message}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role-specific widgets */}
        {(user.role === 'class_teacher' || user.role === 'class_chief') && (
          <div className="role-widgets">
            <div className="widget-card">
              <h3>Class Overview</h3>
              <div className="widget-content">
                <div className="widget-stat">
                  <span className="number">42</span>
                  <span className="label">Students</span>
                </div>
                <div className="widget-stat">
                  <span className="number">94%</span>
                  <span className="label">Attendance</span>
                </div>
                <div className="widget-stat">
                  <span className="number">3</span>
                  <span className="label">Subjects</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Profile Component
const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('apaer_current_user') || '{}');
    setUser(currentUser);
  }, []);

  if (!user) {
    return <div className="loading-container">Loading profile...</div>;
  }

  return (
    <div className="profile-container enhanced">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your personal information and account settings</p>
      </div>

      <div className="profile-content enhanced">
        <div className="profile-sidebar enhanced">
          <div className="profile-avatar enhanced">
            <div className="avatar-large">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <h2>{user.fullName || 'User'}</h2>
            <p className="user-email">{user.email}</p>
            <p className="user-department">{user.department}</p>
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="stat-value">Active</span>
                <span className="stat-label">Status</span>
              </div>
              <div className="profile-stat">
                <span className="stat-value">{new Date(user.lastLogin).toLocaleDateString()}</span>
                <span className="stat-label">Last Login</span>
              </div>
            </div>
          </div>
          
          <nav className="profile-nav enhanced">
            <button 
              className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              Personal Info
            </button>
            <button 
              className={`nav-item ${activeTab === 'academic' ? 'active' : ''}`}
              onClick={() => setActiveTab('academic')}
            >
              Academic
            </button>
            <button 
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
            <button 
              className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </button>
          </nav>
        </div>

        <div className="profile-main enhanced">
          {activeTab === 'personal' && (
            <div className="profile-section enhanced">
              <h3>Personal Information</h3>
              <div className="info-grid enhanced">
                <div className="info-item enhanced">
                  <label>Full Name</label>
                  <p>{user.fullName || 'Not provided'}</p>
                </div>
                <div className="info-item enhanced">
                  <label>Email Address</label>
                  <p>{user.email}</p>
                </div>
                <div className="info-item enhanced">
                  <label>Phone Number</label>
                  <p>{user.phone || 'Not provided'}</p>
                </div>
                <div className="info-item enhanced">
                  <label>Role</label>
                  <p className="role-badge">{user.role}</p>
                </div>
                <div className="info-item enhanced">
                  <label>Department</label>
                  <p>{user.department || 'Not assigned'}</p>
                </div>
                <div className="info-item enhanced">
                  <label>Last Login</label>
                  <p>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'academic' && user.profile && (
            <div className="profile-section enhanced">
              <h3>Academic Information</h3>
              <div className="info-grid enhanced">
                <div className="info-item enhanced">
                  <label>Position</label>
                  <p>{user.profile.position || 'Not specified'}</p>
                </div>
                <div className="info-item enhanced">
                  <label>Join Date</label>
                  <p>{user.profile.joinDate || 'Not specified'}</p>
                </div>
                <div className="info-item enhanced full-width">
                  <label>Bio</label>
                  <p>{user.profile.bio || 'No bio provided'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="profile-section enhanced">
              <h3>Security Settings</h3>
              <div className="security-actions">
                <button className="btn-primary">Change Password</button>
                <button className="btn-secondary">Two-Factor Authentication</button>
                <button className="btn-secondary">Login History</button>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="profile-section enhanced">
              <h3>Preferences</h3>
              <div className="preferences-grid">
                <div className="preference-item">
                  <label>Theme</label>
                  <select defaultValue="light">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div className="preference-item">
                  <label>Language</label>
                  <select defaultValue="en">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="rw">Kinyarwanda</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Settings Component
const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    language: 'en',
    timezone: 'Africa/Kigali',
    autoSave: true,
    compactView: false
  });

  const handleSettingChange = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    setSettings(newSettings);
    
    // Save to localStorage
    const user = JSON.parse(localStorage.getItem('apaer_current_user') || '{}');
    if (user.id) {
      const users = JSON.parse(localStorage.getItem('apaer_users') || '[]');
      const updatedUsers = users.map(u => 
        u.id === user.id 
          ? { ...u, settings: newSettings }
          : u
      );
      localStorage.setItem('apaer_users', JSON.stringify(updatedUsers));
    }
  };

  return (
    <div className="settings-container enhanced">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Customize your experience and preferences</p>
      </div>

      <div className="settings-content enhanced">
        <div className="settings-section enhanced">
          <h3>Notification Preferences</h3>
          <div className="settings-grid enhanced">
            <div className="setting-item enhanced">
              <div className="setting-info">
                <h4>Push Notifications</h4>
                <p>Receive instant notifications for important updates</p>
              </div>
              <label className="toggle-switch enhanced">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="setting-item enhanced">
              <div className="setting-info">
                <h4>Email Updates</h4>
                <p>Get weekly digest emails with your progress</p>
              </div>
              <label className="toggle-switch enhanced">
                <input
                  type="checkbox"
                  checked={settings.emailUpdates}
                  onChange={(e) => handleSettingChange('emailUpdates', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section enhanced">
          <h3>Appearance</h3>
          <div className="settings-grid enhanced">
            <div className="setting-item enhanced">
              <div className="setting-info">
                <h4>Dark Mode</h4>
                <p>Switch to dark theme for better night viewing</p>
              </div>
              <label className="toggle-switch enhanced">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="setting-item enhanced">
              <div className="setting-info">
                <h4>Compact View</h4>
                <p>Use compact layout for better space utilization</p>
              </div>
              <label className="toggle-switch enhanced">
                <input
                  type="checkbox"
                  checked={settings.compactView}
                  onChange={(e) => handleSettingChange('compactView', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item enhanced">
              <div className="setting-info">
                <h4>Language</h4>
                <p>Choose your preferred language</p>
              </div>
              <select 
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="language-select enhanced"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="rw">Kinyarwanda</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-section enhanced">
          <h3>Account Management</h3>
          <div className="action-buttons enhanced">
            <button className="btn-secondary">Change Password</button>
            <button className="btn-secondary">Privacy Settings</button>
            <button className="btn-secondary">Export Data</button>
            <button className="btn-danger">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Admissions Component
const Admissions = () => {
  const [activeTab, setActiveTab] = useState('process');
  const [applicationStats, setApplicationStats] = useState({
    totalApplications: 1247,
    pendingReview: 89,
    accepted: 856,
    rejected: 302
  });

  return (
    <div className="admissions-container enhanced">
      <div className="admissions-hero enhanced">
        <h1>Admissions 2024 🎓</h1>
        <p>Join Apaer Institute - Excellence in Technical Education</p>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="number">{applicationStats.totalApplications}+</span>
            <span className="label">Applications</span>
          </div>
          <div className="hero-stat">
            <span className="number">{applicationStats.accepted}</span>
            <span className="label">Accepted</span>
          </div>
          <div className="hero-stat">
            <span className="number">98%</span>
            <span className="label">Success Rate</span>
          </div>
        </div>
        <button className="btn-primary large">Start Your Application</button>
      </div>

      <div className="admissions-content enhanced">
        <div className="admissions-tabs enhanced">
          <button 
            className={`tab-button ${activeTab === 'process' ? 'active' : ''}`}
            onClick={() => setActiveTab('process')}
          >
            📋 Application Process
          </button>
          <button 
            className={`tab-button ${activeTab === 'requirements' ? 'active' : ''}`}
            onClick={() => setActiveTab('requirements')}
          >
            📄 Requirements
          </button>
          <button 
            className={`tab-button ${activeTab === 'programs' ? 'active' : ''}`}
            onClick={() => setActiveTab('programs')}
          >
            🎯 Programs
          </button>
          <button 
            className={`tab-button ${activeTab === 'dates' ? 'active' : ''}`}
            onClick={() => setActiveTab('dates')}
          >
            📅 Important Dates
          </button>
          <button 
            className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            ❓ FAQ
          </button>
        </div>

        <div className="tab-content enhanced">
          {activeTab === 'process' && (
            <div className="process-steps enhanced">
              <div className="step enhanced">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Online Application</h3>
                  <p>Complete the digital application form with your personal and academic information</p>
                  <span className="step-duration">~15 minutes</span>
                </div>
              </div>
              <div className="step enhanced">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Document Submission</h3>
                  <p>Upload all required documents including transcripts and identification</p>
                  <span className="step-duration">~10 minutes</span>
                </div>
              </div>
              <div className="step enhanced">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Entrance Examination</h3>
                  <p>Take the mandatory entrance test at our campus or designated center</p>
                  <span className="step-duration">2 hours</span>
                </div>
              </div>
              <div className="step enhanced">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Interview</h3>
                  <p>Participate in a personal interview with our admissions committee</p>
                  <span className="step-duration">30 minutes</span>
                </div>
              </div>
              <div className="step enhanced">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Admission Decision</h3>
                  <p>Receive your admission result within 2 weeks of interview</p>
                  <span className="step-duration">14 days</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="requirements-grid enhanced">
              <div className="requirement-category enhanced">
                <h3>📚 Academic Documents</h3>
                <ul>
                  <li>Birth certificate or passport</li>
                  <li>Previous school transcripts</li>
                  <li>National examination results</li>
                  <li>Transfer certificate (if applicable)</li>
                </ul>
              </div>
              <div className="requirement-category enhanced">
                <h3>👤 Personal Documents</h3>
                <ul>
                  <li>Passport photos (4 recent)</li>
                  <li>Medical fitness certificate</li>
                  <li>Health insurance proof</li>
                  <li>Parent/guardian ID copy</li>
                </ul>
              </div>
              <div className="requirement-category enhanced">
                <h3>📝 Recommendations</h3>
                <ul>
                  <li>Two recommendation letters</li>
                  <li>Character certificate</li>
                  <li>Extracurricular activity records</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'programs' && (
            <div className="programs-grid enhanced">
              <div className="program-card enhanced">
                <div className="program-icon">🏫</div>
                <h3>O-Level Program</h3>
                <p>Comprehensive secondary education following national curriculum with modern teaching methods</p>
                <div className="program-details enhanced">
                  <span>⏱️ Duration: 4 years</span>
                  <span>👥 Ages: 13-17</span>
                  <span>🎓 Certificate: National Diploma</span>
                </div>
                <button className="btn-outline">Learn More</button>
              </div>
              <div className="program-card enhanced">
                <div className="program-icon">🔧</div>
                <h3>TVET Programs</h3>
                <p>Technical and Vocational Education with hands-on training and industry partnerships</p>
                <div className="program-details enhanced">
                  <span>⏱️ Duration: 2-3 years</span>
                  <span>🎯 Various specializations</span>
                  <span>💼 Internship: Included</span>
                </div>
                <button className="btn-outline">Learn More</button>
              </div>
              <div className="program-card enhanced">
                <div className="program-icon">🚀</div>
                <h3>Short Courses</h3>
                <p>Professional development and skill-building courses for career advancement</p>
                <div className="program-details enhanced">
                  <span>⏱️ Duration: 3-6 months</span>
                  <span>🕒 Flexible schedules</span>
                  <span>📜 Professional Certificate</span>
                </div>
                <button className="btn-outline">Learn More</button>
              </div>
            </div>
          )}

          {activeTab === 'dates' && (
            <div className="dates-timeline enhanced">
              <div className="timeline-item enhanced">
                <div className="timeline-date">Jan 15, 2024</div>
                <div className="timeline-content">
                  <h3>Applications Open</h3>
                  <p>Online application portal becomes available for all programs</p>
                </div>
              </div>
              <div className="timeline-item enhanced">
                <div className="timeline-date">Mar 31, 2024</div>
                <div className="timeline-content">
                  <h3>Early Application Deadline</h3>
                  <p>Submit applications for early decision consideration with priority review</p>
                </div>
              </div>
              <div className="timeline-item enhanced">
                <div className="timeline-date">May 15, 2024</div>
                <div className="timeline-content">
                  <h3>Final Application Deadline</h3>
                  <p>Last date to submit all application materials for regular decision</p>
                </div>
              </div>
              <div className="timeline-item enhanced">
                <div className="timeline-date">Jun 1, 2024</div>
                <div className="timeline-content">
                  <h3>Entrance Exams</h3>
                  <p>Scheduled entrance examinations for all applicants at designated centers</p>
                </div>
              </div>
              <div className="timeline-item enhanced">
                <div className="timeline-date">Jun 30, 2024</div>
                <div className="timeline-content">
                  <h3>Admission Decisions</h3>
                  <p>All applicants notified of admission status via email and portal</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="faq-section enhanced">
              <div className="faq-item enhanced">
                <h3>What are the entry requirements?</h3>
                <p>Entry requirements vary by program. Generally, we require completion of previous educational level with good academic standing. Specific requirements are listed in the program details.</p>
              </div>
              <div className="faq-item enhanced">
                <h3>Is financial aid available?</h3>
                <p>Yes, we offer various scholarship programs and financial aid options for eligible students. Contact our financial aid office for more information.</p>
              </div>
              <div className="faq-item enhanced">
                <h3>Can international students apply?</h3>
                <p>Absolutely! We welcome international students and provide support for visa processing and accommodation.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced 404 Component
const NotFound = () => (
  <div className="not-found-container enhanced">
    <div className="not-found-content enhanced">
      <div className="not-found-animation enhanced">
        <div className="error-code">404</div>
        <div className="error-icon">🔍</div>
      </div>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <div className="not-found-actions enhanced">
        <a href="/" className="btn-primary">🏠 Go Home</a>
        <button 
          onClick={() => window.history.back()} 
          className="btn-secondary"
        >
          ↩️ Go Back
        </button>
        <a href="/contact" className="btn-outline">📞 Get Help</a>
      </div>
      <div className="not-found-suggestions">
        <p>Popular pages you might be looking for:</p>
        <div className="suggestion-links">
          <a href="/">Home</a>
          <a href="/admissions">Admissions</a>
          <a href="/academic">Academic Programs</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </div>
  </div>
);

// Enhanced Providers (placeholder components)
const SystemMonitor = ({ children }) => children;
const NotificationProvider = ({ children }) => children;
const AuthProvider = ({ children }) => children;

function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('🚀 Starting Apaer Institute App Initialization...');
        
        // Initialize all data with error handling
        await Promise.all([
          initializeDefaultUsers(),
          initializeTimetableData(),
          initializeTVETStudents()
        ]);
        
        setInitialized(true);
        console.log('✅ App initialization completed successfully');
        
        // Track app start
        const appStats = JSON.parse(localStorage.getItem('apaer_app_stats') || '{}');
        localStorage.setItem('apaer_app_stats', JSON.stringify({
          ...appStats,
          lastStart: new Date().toISOString(),
          startCount: (appStats.startCount || 0) + 1
        }));
        
      } catch (error) {
        console.error('❌ App initialization failed:', error);
        setInitialized(true); // Still set initialized to true to show the app
      }
    };

    initializeApp();
  }, []);

  if (!initialized) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <h2>Apaer Institute</h2>
        <p>Initializing application...</p>
      </div>
    );
  }

  return (
    <AuthProvider>
      <NotificationProvider>
        <SystemMonitor>
          <Router>
            <Navbar />
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/schoollife/*" element={<SchoolLife />} />
                <Route path="/academic" element={<Academic />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Protected Routes */}
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute role="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/admin/dos" 
                  element={
                    <ProtectedRoute roles={['dos', 'admin']}>
                      <DOSDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/admin/dm" 
                  element={
                    <ProtectedRoute roles={['dm', 'admin']}>
                      <DMDashboard />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/teacher/dashboard" 
                  element={
                    <ProtectedRoute role="class_teacher">
                      <ClassTeacherDashboard />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/chief/dashboard" 
                  element={
                    <ProtectedRoute role="class_chief">
                      <ClassChiefDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/attendance" 
                  element={
                    <ProtectedRoute roles={['class_teacher', 'class_chief', 'dos', 'dm', 'admin']}>
                      <TVETAttendanceSystem />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/admin/timetable/generate" 
                  element={
                    <ProtectedRoute roles={['admin', 'dos']}>
                      <TimetableGenerator />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/admin/timetable/manage" 
                  element={
                    <ProtectedRoute roles={['admin', 'dos']}>
                      <TimetableManager />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />

                {/* Catch all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </SystemMonitor>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;