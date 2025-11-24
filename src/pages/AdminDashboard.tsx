import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  FaComments, 
  FaUserGraduate, 
  FaUserTie, 
  FaUserFriends,
  FaChartLine,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaSchool,
  FaTrophy,
  FaCalendarAlt,
  FaHistory,
  FaMoneyBillWave,
  FaDatabase,
  FaShieldAlt, // Use FaShieldAlt instead of FaShield
  FaEnvelope,
  FaUsers,
  FaChartBar,
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSync,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaCloud,
  FaLock,
  FaPalette,
  FaGlobe,
  FaMobile,
  FaRocket,
  FaThermometerHalf,
  FaServer,
  FaCrown,
  FaStar,
  FaAward,
  FaGraduationCap,
  FaBook,
  FaChalkboardTeacher,
  FaUserCheck,
  FaUserPlus,
  FaMoneyCheck,
  FaReceipt,
  FaChartPie,
  FaMapMarkerAlt,
  FaPhone,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaQuestionCircle,
  FaKey,
  FaChevronDown,
  FaChevronRight,
  FaUserShield,
  FaUserCog
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Import Components
import MessagesCenter from './MessagesCenter';
import RegistrationsManager from './RegistrationsManager';
import TeacherSubmissions from './TeacherSubmissions';
import StudentSubmissions from './StudentSubmissions';
import ParentSubmissions from './ParentSubmissions';
import DashboardOverview from './DashboardOverview';
import SchoolLifeManager from './SchoolLifeManager';
import PaymentManagement from './PaymentManagement';
import SystemAnalytics from './SystemAnalytics';
import StudentMessages from './StudentMessages';
import QuickActionsPanel from './QuickActionsPanel';
import NotificationCenter from './NotificationCenter';
import SystemHealth from './SystemHealth';
import SystemSettings from './SystemSettings';
import UserManagement from './UserManagement';
import BackupRestore from './BackupRestore';
import AuditLog from './AuditLog';
import APIKeys from './APIKeys';
import Customization from './Customization';
import TVETAttendanceSystem from './TVETAttendanceSystem';

import './AdminDashboard.css';

// Types
interface SystemStats {
  messages: { total: number; pending: number; replied: number; urgent: number };
  payments: { total: number; pending: number; revenue: number; verified: number; failed: number };
  timetable: { total: number; published: number; draft: number; conflicts: number };
  schoolLife: { total: number; gallery: number; news: number; events: number };
  registrations: { total: number; pending: number; approved: number; rejected: number };
  students: { total: number; active: number; new: number; graduating: number };
  teachers: { total: number; active: number; available: number; onLeave: number };
  parents: { total: number; active: number; pending: number };
  courses: { total: number; active: number; upcoming: number };
  attendance: { today: number; week: number; month: number };
  tvet: { classes: number; students: number; attendance: number; pending: number };
}

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical';
  performance: number;
  storage: number;
  uptime: string;
  responseTime: string;
  activeUsers: number;
  serverLoad: number;
  memoryUsage: number;
  networkLatency: number;
}

interface UserProfile {
  name: string;
  role: string;
  avatar: string | null;
  lastLogin: string;
  department: string;
  permissions: string[];
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType;
  badge?: number;
  color: string;
  category: string;
  priority: number;
  description: string;
  tags: string[];
}

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['dashboard', 'communications']));
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'System Administrator',
    role: 'Super Admin',
    avatar: null,
    lastLogin: new Date().toISOString(),
    department: 'Administration',
    permissions: ['all']
  });
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    status: 'healthy',
    performance: 95,
    storage: 65,
    uptime: '99.9%',
    responseTime: '120ms',
    activeUsers: 47,
    serverLoad: 32,
    memoryUsage: 58,
    networkLatency: 45
  });
  const [systemStats, setSystemStats] = useState<SystemStats>({
    messages: { total: 0, pending: 0, replied: 0, urgent: 0 },
    payments: { total: 0, pending: 0, revenue: 0, verified: 0, failed: 0 },
    timetable: { total: 0, published: 0, draft: 0, conflicts: 0 },
    schoolLife: { total: 0, gallery: 0, news: 0, events: 0 },
    registrations: { total: 0, pending: 0, approved: 0, rejected: 0 },
    students: { total: 1247, active: 1189, new: 23, graduating: 45 },
    teachers: { total: 89, active: 87, available: 45, onLeave: 2 },
    parents: { total: 956, active: 892, pending: 12 },
    courses: { total: 45, active: 42, upcoming: 3 },
    attendance: { today: 94.2, week: 92.8, month: 93.5 },
    tvet: { classes: 8, students: 156, attendance: 91.2, pending: 3 }
  });

  const navigate = useNavigate();

  // Enhanced helper functions
  const getStudentMessagesCount = useCallback((): number => {
    try {
      const studentMessages = JSON.parse(localStorage.getItem('apaer_student_messages') || '[]');
      return studentMessages.filter((msg: any) => msg.status === 'pending').length;
    } catch (error) {
      console.error('Error loading student messages:', error);
      return 0;
    }
  }, []);

  const getTotalPendingItems = useCallback((): number => {
    return (
      systemStats.messages.pending +
      systemStats.payments.pending +
      systemStats.registrations.pending +
      getStudentMessagesCount() +
      systemStats.tvet.pending
    );
  }, [systemStats, getStudentMessagesCount]);

  // Enhanced categories with icons and descriptions
  const categories = useMemo(() => [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: FaChartLine,
      description: 'Overview and analytics'
    },
    { 
      id: 'communications', 
      label: 'Communications', 
      icon: FaComments,
      description: 'Messages and notifications'
    },
    { 
      id: 'students', 
      label: 'Student Management', 
      icon: FaUserGraduate,
      description: 'Student data and records'
    },
    { 
      id: 'academic', 
      label: 'Academic', 
      icon: FaBook,
      description: 'Courses and curriculum'
    },
    { 
      id: 'financial', 
      label: 'Financial', 
      icon: FaMoneyBillWave,
      description: 'Payments and billing'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: FaChartBar,
      description: 'Reports and insights'
    },
    { 
      id: 'system', 
      label: 'System', 
      icon: FaCog,
      description: 'Settings and configuration'
    }
  ], []);

  // Enhanced navigation items with badges, priorities, and metadata
  const navigationItems = useMemo((): NavigationItem[] => [
    // Dashboard & Overview
    { 
      id: 'overview', 
      label: 'Dashboard Overview', 
      icon: FaChartLine, 
      badge: getTotalPendingItems(), 
      color: '#3498db',
      category: 'dashboard',
      priority: 1,
      description: 'Comprehensive system overview',
      tags: ['core', 'analytics']
    },
    
    // Communications
    { 
      id: 'messages', 
      label: 'Messages Center', 
      icon: FaComments, 
      badge: systemStats.messages.pending, 
      color: '#e74c3c',
      category: 'communications',
      priority: 1,
      description: 'Manage all communications',
      tags: ['urgent', 'communication']
    },
    { 
      id: 'student-messages', 
      label: 'Student Messages', 
      icon: FaEnvelope, 
      badge: getStudentMessagesCount(), 
      color: '#9b59b6',
      category: 'communications',
      priority: 2,
      description: 'Student inquiries and messages',
      tags: ['students', 'support']
    },
    { 
      id: 'teachers', 
      label: 'Teacher Submissions', 
      icon: FaUserTie, 
      color: '#e67e22',
      category: 'communications',
      priority: 3,
      description: 'Teacher communications',
      tags: ['faculty', 'submissions']
    },
    { 
      id: 'students', 
      label: 'Student Inquiries', 
      icon: FaUserGraduate, 
      color: '#1abc9c',
      category: 'communications',
      priority: 3,
      description: 'Student inquiries',
      tags: ['students', 'support']
    },
    { 
      id: 'parents', 
      label: 'Parent Communications', 
      icon: FaUserFriends, 
      color: '#34495e',
      category: 'communications',
      priority: 3,
      description: 'Parent communications',
      tags: ['parents', 'support']
    },
    
    // Student Management
    { 
      id: 'registrations', 
      label: 'Student Registrations', 
      icon: FaUserPlus, 
      badge: systemStats.registrations.pending, 
      color: '#2ecc71',
      category: 'students',
      priority: 1,
      description: 'Manage student applications',
      tags: ['admissions', 'registration']
    },
    { 
      id: 'user-management', 
      label: 'User Management', 
      icon: FaUserCheck, 
      color: '#16a085',
      category: 'students',
      priority: 2,
      description: 'Manage system users',
      tags: ['users', 'administration']
    },
    
    // Academic - Enhanced with TVET
    { 
      id: 'schoollife', 
      label: 'School Life Manager', 
      icon: FaSchool, 
      badge: systemStats.schoolLife.total, 
      color: '#8e44ad',
      category: 'academic',
      priority: 2,
      description: 'Manage school activities and events',
      tags: ['events', 'activities']
    },
    { 
      id: 'tvet-attendance', 
      label: 'TVET Attendance', 
      icon: FaUserCheck, 
      badge: systemStats.tvet.pending, 
      color: '#16a085',
      category: 'academic',
      priority: 1,
      description: 'Technical class attendance system',
      tags: ['tvet', 'attendance', 'technical']
    },
    { 
      id: 'timetable-generate', 
      label: 'Generate Timetable', 
      icon: FaCalendarAlt, 
      color: '#d35400',
      category: 'academic',
      priority: 3,
      description: 'Create class schedules',
      tags: ['scheduling', 'timetable']
    },
    { 
      id: 'timetable-manage', 
      label: 'Manage Timetables', 
      icon: FaHistory, 
      badge: systemStats.timetable.total, 
      color: '#c0392b',
      category: 'academic',
      priority: 3,
      description: 'Manage existing timetables',
      tags: ['scheduling', 'management']
    },
    
    // Financial
    { 
      id: 'payments', 
      label: 'Payment Management', 
      icon: FaMoneyCheck, 
      badge: systemStats.payments.pending, 
      color: '#27ae60',
      category: 'financial',
      priority: 1,
      description: 'Manage payments and transactions',
      tags: ['finance', 'payments']
    },
    { 
      id: 'billing', 
      label: 'Billing & Invoices', 
      icon: FaReceipt, 
      color: '#2980b9',
      category: 'financial',
      priority: 2,
      description: 'Billing and invoice management',
      tags: ['billing', 'invoices']
    },
    
    // Analytics & Reports
    { 
      id: 'analytics', 
      label: 'System Analytics', 
      icon: FaChartBar, 
      color: '#e74c3c',
      category: 'analytics',
      priority: 1,
      description: 'Advanced analytics and reporting',
      tags: ['reports', 'insights']
    },
    { 
      id: 'reports', 
      label: 'Custom Reports', 
      icon: FaChartPie, 
      color: '#9b59b6',
      category: 'analytics',
      priority: 2,
      description: 'Custom report generation',
      tags: ['reports', 'custom']
    },
    
    // System
    { 
      id: 'system-health', 
      label: 'System Health', 
      icon: FaThermometerHalf, 
      color: '#e67e22',
      category: 'system',
      priority: 2,
      description: 'Monitor system performance',
      tags: ['monitoring', 'performance']
    },
    { 
      id: 'system-settings', 
      label: 'System Settings', 
      icon: FaCog, 
      color: '#7f8c8d',
      category: 'system',
      priority: 3,
      description: 'System configuration',
      tags: ['configuration', 'settings']
    },
    { 
      id: 'backup-restore', 
      label: 'Backup & Restore', 
      icon: FaCloud, 
      color: '#3498db',
      category: 'system',
      priority: 3,
      description: 'Data backup and restoration',
      tags: ['backup', 'recovery']
    },
    { 
      id: 'audit-log', 
      label: 'Audit Log', 
      icon: FaShieldAlt, // Changed from FaShield to FaShieldAlt
      color: '#2c3e50',
      category: 'system',
      priority: 3,
      description: 'System activity logs',
      tags: ['security', 'logs']
    },
    { 
      id: 'api-keys', 
      label: 'API Management', 
      icon: FaKey, 
      color: '#f39c12',
      category: 'system',
      priority: 3,
      description: 'API key management',
      tags: ['api', 'integration']
    },
    { 
      id: 'customization', 
      label: 'Customization', 
      icon: FaPalette, 
      color: '#e91e63',
      category: 'system',
      priority: 3,
      description: 'System customization',
      tags: ['customization', 'ui']
    }
  ], [systemStats, getTotalPendingItems, getStudentMessagesCount]);

  // Enhanced system stats loading
  useEffect(() => {
    const loadSystemStats = () => {
      try {
        // Enhanced messages stats
        const teacherSubmissions = JSON.parse(localStorage.getItem('apaer_teacher_submissions') || '[]');
        const studentSubmissions = JSON.parse(localStorage.getItem('apaer_student_submissions') || '[]');
        const parentSubmissions = JSON.parse(localStorage.getItem('apaer_parent_submissions') || '[]');
        const registrationSubmissions = JSON.parse(localStorage.getItem('apaer_registrations_submissions') || '[]');
        const studentMessages = JSON.parse(localStorage.getItem('apaer_student_messages') || '[]');
        
        const allMessages = [
          ...teacherSubmissions,
          ...studentSubmissions,
          ...parentSubmissions,
          ...registrationSubmissions,
          ...studentMessages
        ];
        
        const pendingMessages = allMessages.filter((msg: any) => msg.status === 'pending').length;
        const repliedMessages = allMessages.filter((msg: any) => msg.status === 'replied').length;
        const urgentMessages = allMessages.filter((msg: any) => msg.priority === 'high').length;

        // Enhanced payment stats
        const payments = JSON.parse(localStorage.getItem('apaer_payments') || '[]');
        const pendingPayments = payments.filter((p: any) => p.status === 'pending').length;
        const verifiedPayments = payments.filter((p: any) => p.status === 'verified').length;
        const failedPayments = payments.filter((p: any) => p.status === 'failed').length;
        const totalRevenue = payments
          .filter((p: any) => p.status === 'verified')
          .reduce((sum: number, payment: any) => sum + parseFloat(payment.amount || 0), 0);

        // Enhanced timetable stats
        const timetables = JSON.parse(localStorage.getItem('apaer_timetables') || '[]');
        const publishedTimetables = timetables.filter((t: any) => t.status === 'published').length;
        const draftTimetables = timetables.filter((t: any) => t.status === 'draft').length;
        const conflictTimetables = timetables.filter((t: any) => t.hasConflict).length;

        // Enhanced school life stats
        const galleryItems = JSON.parse(localStorage.getItem('apaer_school_gallery') || '[]');
        const newsItems = JSON.parse(localStorage.getItem('apaer_school_news') || '[]');
        const eventsItems = JSON.parse(localStorage.getItem('apaer_school_events') || '[]');
        const schoolLifeItems = [
          ...galleryItems,
          ...newsItems,
          ...eventsItems
        ];

        // Enhanced registration stats
        const pendingRegistrations = registrationSubmissions.filter((reg: any) => reg.status === 'pending').length;
        const approvedRegistrations = registrationSubmissions.filter((reg: any) => reg.status === 'approved').length;
        const rejectedRegistrations = registrationSubmissions.filter((reg: any) => reg.status === 'rejected').length;

        // TVET stats
        const tvetAttendance = JSON.parse(localStorage.getItem('tvet_attendance') || '[]');
        const today = new Date().toISOString().split('T')[0];
        const pendingTVET = tvetAttendance.filter((record: any) => 
          record.date === today && record.status === 'pending'
        ).length;

        setSystemStats(prev => ({
          ...prev,
          messages: {
            total: allMessages.length,
            pending: pendingMessages,
            replied: repliedMessages,
            urgent: urgentMessages
          },
          payments: {
            total: payments.length,
            pending: pendingPayments,
            verified: verifiedPayments,
            revenue: totalRevenue,
            failed: failedPayments
          },
          timetable: {
            total: timetables.length,
            published: publishedTimetables,
            draft: draftTimetables,
            conflicts: conflictTimetables
          },
          schoolLife: {
            total: schoolLifeItems.length,
            gallery: galleryItems.length,
            news: newsItems.length,
            events: eventsItems.length
          },
          registrations: {
            total: registrationSubmissions.length,
            pending: pendingRegistrations,
            approved: approvedRegistrations,
            rejected: rejectedRegistrations
          },
          tvet: {
            classes: 8,
            students: 156,
            attendance: 91.2,
            pending: pendingTVET
          }
        }));

        setUnreadCount(pendingMessages + getStudentMessagesCount() + pendingRegistrations + pendingPayments + pendingTVET);
      } catch (error) {
        console.error('Error loading system stats:', error);
      }
    };

    loadSystemStats();
    
    // Enhanced storage change listener
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('apaer_')) {
        loadSystemStats();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(loadSystemStats, 30000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [getStudentMessagesCount]);

  // Enhanced real-time system health updates
  useEffect(() => {
    const healthInterval = setInterval(() => {
      setSystemHealth(prev => {
        const performance = 85 + Math.random() * 15;
        const activeUsers = 40 + Math.floor(Math.random() * 20);
        const responseTime = (80 + Math.random() * 80).toFixed(0) + 'ms';
        const serverLoad = 20 + Math.random() * 50;
        const memoryUsage = 40 + Math.random() * 40;
        const networkLatency = 30 + Math.random() * 50;
        
        // Determine system status based on performance
        let status: 'healthy' | 'degraded' | 'critical' = 'healthy';
        if (performance < 70) status = 'critical';
        else if (performance < 85) status = 'degraded';

        return {
          ...prev,
          performance,
          activeUsers,
          responseTime,
          serverLoad,
          memoryUsage,
          networkLatency,
          status
        };
      });
    }, 5000);

    return () => clearInterval(healthInterval);
  }, []);

  // Enhanced handlers
  const handleLogout = (): void => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('apaer_admin_session');
      localStorage.removeItem('apaer_current_user');
      localStorage.removeItem('apaer_token');
      navigate('/');
    }
  };

  const handleSettings = (): void => {
    setActiveSection('system-settings');
  };

  const handleNotificationClick = (): void => {
    setNotificationsOpen(!notificationsOpen);
  };

  const handleNavigation = (section: string): void => {
    if (section === 'timetable-generate') {
      navigate('/admin/timetable/generate');
    } else if (section === 'timetable-manage') {
      navigate('/admin/timetable/manage');
    } else {
      setActiveSection(section);
      setNotificationsOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleQuickAction = (action: string): void => {
    switch (action) {
      case 'refresh':
        window.location.reload();
        break;
      case 'clearCache':
        localStorage.removeItem('apaer_cache_timestamp');
        showToast('Cache cleared successfully!', 'success');
        break;
      case 'backup':
        setActiveSection('backup-restore');
        showToast('Backup system opened', 'info');
        break;
      case 'reports':
        setActiveSection('analytics');
        break;
      case 'settings':
        setActiveSection('system-settings');
        break;
      default:
        break;
    }
  };

  const toggleCategory = (categoryId: string): void => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const showToast = (message: string, type: string = 'info'): void => {
    // Enhanced toast implementation
    const toastEvent = new CustomEvent('showToast', {
      detail: { message, type, duration: 3000 }
    });
    window.dispatchEvent(toastEvent);
  };

  const renderActiveSection = (): JSX.Element => {
    const sectionComponents: { [key: string]: JSX.Element } = {
      'overview': <DashboardOverview systemStats={systemStats} systemHealth={systemHealth} />,
      'messages': <MessagesCenter />,
      'student-messages': <StudentMessages />,
      'registrations': <RegistrationsManager />,
      'teachers': <TeacherSubmissions />,
      'students': <StudentSubmissions />,
      'parents': <ParentSubmissions />,
      'payments': <PaymentManagement />,
      'schoollife': <SchoolLifeManager />,
      'tvet-attendance': <TVETAttendanceSystem />,
      'analytics': <SystemAnalytics systemStats={systemStats} />,
      'system-health': <SystemHealth systemHealth={systemHealth} />,
      'system-settings': <SystemSettings />,
      'user-management': <UserManagement />,
      'backup-restore': <BackupRestore />,
      'audit-log': <AuditLog />,
      'api-keys': <APIKeys />,
      'customization': <Customization />,
      'billing': <div className="coming-soon">Billing & Invoices - Coming Soon</div>,
      'reports': <div className="coming-soon">Custom Reports - Coming Soon</div>
    };

    return sectionComponents[activeSection] || <DashboardOverview systemStats={systemStats} systemHealth={systemHealth} />;
  };

  const getActiveSectionColor = (): string => {
    const activeItem = navigationItems.find(item => item.id === activeSection);
    return activeItem?.color || '#3498db';
  };

  const filteredNavigationItems = navigationItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getItemsByCategory = (categoryId: string): NavigationItem[] => {
    return filteredNavigationItems
      .filter(item => item.category === categoryId)
      .sort((a, b) => a.priority - b.priority);
  };

  const getCategoryStats = (categoryId: string): number => {
    const items = getItemsByCategory(categoryId);
    return items.reduce((total, item) => total + (item.badge || 0), 0);
  };

  // Enhanced search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            setActiveSection('overview');
            break;
          case '2':
            e.preventDefault();
            setActiveSection('messages');
            break;
          case '3':
            e.preventDefault();
            setActiveSection('payments');
            break;
          case '4':
            e.preventDefault();
            setActiveSection('analytics');
            break;
          case 'k':
            e.preventDefault();
            const searchInput = document.querySelector<HTMLInputElement>('.search-input');
            searchInput?.focus();
            break;
          case 'b':
            e.preventDefault();
            setSidebarOpen(prev => !prev);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="admin-dashboard-container">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Enhanced Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="school-brand">
            <div className="brand-avatar" style={{ backgroundColor: getActiveSectionColor() }}>
              <FaRocket />
            </div>
            <div className="brand-info">
              <h3>Apaer Institute</h3>
              <span>Admin Portal v2.1</span>
              <div className="brand-status">
                <div className={`status-dot ${systemHealth.status}`}></div>
                <span>System {systemHealth.status}</span>
              </div>
            </div>
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ color: getActiveSectionColor() }}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <FaBars />
          </button>
        </div>

        {/* Enhanced Search Bar */}
        <div className="sidebar-search">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search modules, features..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
              aria-label="Search dashboard modules"
            />
            {searchQuery && (
              <button 
                className="search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        <div className="sidebar-content">
          <nav className="sidebar-nav" aria-label="Main navigation">
            {categories.map(category => {
              const categoryItems = getItemsByCategory(category.id);
              if (categoryItems.length === 0 && searchQuery) return null;
              
              const CategoryIcon = category.icon;
              const isExpanded = expandedCategories.has(category.id);
              const categoryStats = getCategoryStats(category.id);
              
              return (
                <div key={category.id} className="nav-category">
                  <button 
                    className="category-header"
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={isExpanded}
                  >
                    <div className="category-info">
                      <CategoryIcon className="category-icon" />
                      <div className="category-text">
                        <span className="category-label">{category.label}</span>
                        <span className="category-desc">{category.description}</span>
                      </div>
                    </div>
                    <div className="category-actions">
                      {categoryStats > 0 && (
                        <span className="category-badge">{categoryStats}</span>
                      )}
                      {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="category-items">
                      {categoryItems.map(item => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={item.id}
                            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => handleNavigation(item.id)}
                            style={{
                              '--active-color': item.color
                            } as React.CSSProperties}
                            title={item.description}
                            aria-current={activeSection === item.id ? 'page' : undefined}
                          >
                            <div className="nav-icon">
                              <IconComponent />
                            </div>
                            <span className="nav-label">{item.label}</span>
                            {item.badge && item.badge > 0 && (
                              <span className="nav-badge">{item.badge > 99 ? '99+' : item.badge}</span>
                            )}
                            {activeSection === item.id && (
                              <div className="active-indicator"></div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <QuickActionsPanel onAction={handleQuickAction} />
            
            {/* Enhanced System Status Card */}
            <div className="system-status-card">
              <div className="status-header">
                <div className={`status-indicator ${systemHealth.status}`}>
                  <div className="status-dot"></div>
                  <span>System {systemHealth.status.charAt(0).toUpperCase() + systemHealth.status.slice(1)}</span>
                </div>
                <div className="status-uptime">{systemHealth.uptime}</div>
              </div>
              <div className="system-metrics">
                <div className="metric">
                  <span>CPU</span>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill" 
                      style={{ 
                        width: `${systemHealth.performance}%`,
                        backgroundColor: systemHealth.performance > 85 ? '#2ecc71' : systemHealth.performance > 70 ? '#f39c12' : '#e74c3c'
                      }}
                    ></div>
                  </div>
                  <span>{systemHealth.performance.toFixed(1)}%</span>
                </div>
                <div className="metric">
                  <span>Memory</span>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill" 
                      style={{ 
                        width: `${systemHealth.memoryUsage}%`,
                        backgroundColor: systemHealth.memoryUsage > 85 ? '#e74c3c' : systemHealth.memoryUsage > 70 ? '#f39c12' : '#2ecc71'
                      }}
                    ></div>
                  </div>
                  <span>{systemHealth.memoryUsage}%</span>
                </div>
                <div className="metric">
                  <span>Load</span>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill" 
                      style={{ 
                        width: `${systemHealth.serverLoad}%`,
                        backgroundColor: systemHealth.serverLoad > 85 ? '#e74c3c' : systemHealth.serverLoad > 70 ? '#f39c12' : '#2ecc71'
                      }}
                    ></div>
                  </div>
                  <span>{systemHealth.serverLoad}%</span>
                </div>
              </div>
            </div>
            
            <div className="user-profile-card">
              <div className="profile-avatar" style={{ backgroundColor: getActiveSectionColor() }}>
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt={userProfile.name} />
                ) : (
                  <FaUserShield />
                )}
              </div>
              <div className="profile-info">
                <span className="profile-name">{userProfile.name}</span>
                <span className="profile-role">{userProfile.role}</span>
                <span className="profile-department">{userProfile.department}</span>
              </div>
            </div>
            
            <button className="nav-item settings-btn" onClick={handleSettings}>
              <div className="nav-icon">
                <FaCog />
              </div>
              <span className="nav-label">Settings</span>
            </button>
            <button className="nav-item logout-btn" onClick={handleLogout}>
              <div className="nav-icon">
                <FaSignOutAlt />
              </div>
              <span className="nav-label">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <FaBars />
            </button>
            <div className="breadcrumb">
              <span>Admin Panel</span>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-category">
                {categories.find(cat => cat.id === navigationItems.find(item => item.id === activeSection)?.category)?.label}
              </span>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-active" style={{ color: getActiveSectionColor() }}>
                {navigationItems.find(item => item.id === activeSection)?.label}
              </span>
            </div>
            <h1 style={{ color: getActiveSectionColor() }}>
              {navigationItems.find(item => item.id === activeSection)?.label}
            </h1>
            <p>{navigationItems.find(item => item.id === activeSection)?.description}</p>
          </div>
          
          <div className="header-right">
            <div className="header-stats">
              <div className="stat-item revenue">
                <FaMoneyBillWave />
                <div className="stat-details">
                  <span className="stat-value">RWF {systemStats.payments.revenue.toLocaleString()}</span>
                  <span className="stat-label">Total Revenue</span>
                </div>
              </div>
              <div className="stat-item students">
                <FaUserGraduate />
                <div className="stat-details">
                  <span className="stat-value">{systemStats.students.total}</span>
                  <span className="stat-label">Students</span>
                </div>
              </div>
              <div className="stat-item teachers">
                <FaChalkboardTeacher />
                <div className="stat-details">
                  <span className="stat-value">{systemStats.teachers.total}</span>
                  <span className="stat-label">Teachers</span>
                </div>
              </div>
              <div className="stat-item tvet">
                <FaUserCheck />
                <div className="stat-details">
                  <span className="stat-value">{systemStats.tvet.attendance}%</span>
                  <span className="stat-label">TVET Attendance</span>
                </div>
              </div>
            </div>
            
            <div className="header-actions">
              <button 
                className="notification-btn" 
                onClick={handleNotificationClick}
                data-badge={unreadCount}
                aria-label={`Notifications ${unreadCount > 0 ? `${unreadCount} unread` : ''}`}
              >
                <FaBell />
                {unreadCount > 0 && <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>}
              </button>
              
              <button 
                className="refresh-btn" 
                onClick={() => handleQuickAction('refresh')}
                title="Refresh Dashboard"
                aria-label="Refresh dashboard"
              >
                <FaSync />
              </button>

              <div className="health-indicator">
                <div 
                  className={`health-dot ${systemHealth.status}`}
                  title={`System Status: ${systemHealth.status}`}
                  aria-label={`System status: ${systemHealth.status}`}
                ></div>
              </div>
              
              <div className="admin-profile">
                <div className="profile-avatar" style={{ backgroundColor: getActiveSectionColor() }}>
                  {userProfile.avatar ? (
                    <img src={userProfile.avatar} alt={userProfile.name} />
                  ) : (
                    <FaUserShield />
                  )}
                </div>
                <div className="profile-info">
                  <span className="profile-name">{userProfile.name}</span>
                  <span className="profile-role">{userProfile.role}</span>
                </div>
                <div className="profile-dropdown">
                  <button className="dropdown-toggle" aria-label="User menu">
                    <FaChevronDown />
                  </button>
                  <div className="dropdown-menu">
                    <button onClick={() => setActiveSection('user-management')}>
                      <FaUserCog /> Profile Settings
                    </button>
                    <button onClick={handleSettings}>
                      <FaCog /> System Settings
                    </button>
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Notifications Panel */}
        {notificationsOpen && (
          <NotificationCenter 
            unreadCount={unreadCount}
            systemStats={systemStats}
            onClose={() => setNotificationsOpen(false)}
            onNavigate={handleNavigation}
          />
        )}

        <div className="admin-content">
          {renderActiveSection()}
        </div>

        {/* Enhanced Footer */}
        <footer className="admin-footer">
          <div className="footer-stats">
            <div className="footer-stat">
              <span className="stat-label">Active Users</span>
              <span className="stat-value">{systemHealth.activeUsers}</span>
            </div>
            <div className="footer-stat">
              <span className="stat-label">Response Time</span>
              <span className="stat-value">{systemHealth.responseTime}</span>
            </div>
            <div className="footer-stat">
              <span className="stat-label">Server Uptime</span>
              <span className="stat-value">{systemHealth.uptime}</span>
            </div>
            <div className="footer-stat">
              <span className="stat-label">Memory Usage</span>
              <span className="stat-value">{systemHealth.memoryUsage}%</span>
            </div>
          </div>
          <div className="footer-actions">
            <button className="footer-btn" onClick={() => handleQuickAction('backup')}>
              <FaCloud /> Backup Now
            </button>
            <button className="footer-btn" onClick={() => handleQuickAction('settings')}>
              <FaCog /> Settings
            </button>
            <div className="footer-version">
              v2.1.0 • {new Date().getFullYear()}
            </div>
          </div>
        </footer>

        {/* Enhanced Floating Action Buttons */}
        <button 
          className="fab primary" 
          onClick={() => handleQuickAction('reports')}
          style={{ backgroundColor: getActiveSectionColor() }}
          aria-label="Quick reports"
        >
          <FaChartBar />
        </button>

        <button className="fab secondary" onClick={() => handleQuickAction('refresh')} aria-label="Refresh">
          <FaSync />
        </button>

        <button className="help-fab" aria-label="Get help">
          <FaQuestionCircle />
        </button>
      </main>
    </div>
  );
};

export default AdminDashboard;