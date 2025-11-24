// services/auth.js
const USERS_KEY = 'apaer_users';

// Initialize with default users if not exists
const initializeUsers = () => {
  const existingUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (existingUsers.length === 0) {
    const defaultUsers = [
      { 
        id: 1, 
        email: 'admin@apaer.ac.rw', 
        password: 'admin123', 
        role: 'admin', 
        name: 'System Administrator',
        department: 'Administration',
        permissions: ['all']
      },
      { 
        id: 2, 
        email: 'dos@apaer.ac.rw', 
        password: 'dos123', 
        role: 'dos', 
        name: 'Director of Studies',
        department: 'Academic Administration',
        permissions: ['view_all', 'export_reports', 'analytics', 'receive_reports', 'system_management']
      },
      { 
        id: 3, 
        email: 'dm@apaer.ac.rw', 
        password: 'dm123', 
        role: 'dm', 
        name: 'Department Manager',
        department: 'Management',
        permissions: ['view_all', 'export_reports', 'analytics', 'receive_reports', 'system_management']
      },
      { 
        id: 4, 
        email: 'teacher.sod@apaer.ac.rw', 
        password: 'teacher123', 
        role: 'class_teacher', 
        name: 'John Smith - SOD Teacher',
        department: 'Software Development',
        permissions: ['mark_attendance', 'view_class', 'export_reports', 'manage_remarks'],
        programAccess: [1]
      },
      { 
        id: 5, 
        email: 'chief.sod@apaer.ac.rw', 
        password: 'chief123', 
        role: 'class_chief', 
        name: 'Alice Johnson - Class Chief',
        department: 'Software Development',
        permissions: ['mark_attendance', 'view_class', 'export_reports'],
        programAccess: [1]
      },
      { 
        id: 6, 
        email: 'user@example.com', 
        password: 'user123', 
        role: 'user', 
        name: 'John Doe',
        department: 'General',
        permissions: ['view_class']
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
};

// Simulate API call delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Initialize the default users
  initialize: () => {
    initializeUsers();
  },

  // Login function
  login: async (email, password) => {
    await delay(500); // Simulate network delay

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Remove password from user object before storing in localStorage for security
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      localStorage.setItem('apaer_current_user', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    } else {
      throw new Error('Invalid email or password');
    }
  },

  // Register function (only for regular users)
  register: async (userData) => {
    await delay(500);

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const existingUser = users.find(u => u.email === userData.email);

    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const newUser = {
      id: users.length + 1,
      ...userData,
      role: 'user', // Always set role to 'user' for registration
      department: 'General',
      permissions: ['view_class']
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Remove password from the returned user object
    const { password, ...userWithoutPassword } = newUser;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    localStorage.setItem('apaer_current_user', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  // Logout function
  logout: () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('apaer_current_user');
  },

  // Get current user
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  },

  // Check if user has permission
  hasPermission: (user, permission) => {
    if (!user || !user.permissions) return false;
    if (user.permissions.includes('all')) return true;
    return user.permissions.includes(permission);
  },

  // Get role display name
  getRoleDisplayName: (role) => {
    const roleNames = {
      'dos': 'Director of Studies',
      'dm': 'Department Manager',
      'class_teacher': 'Class Teacher',
      'class_chief': 'Class Chief',
      'admin': 'System Administrator',
      'user': 'User'
    };
    return roleNames[role] || role;
  }
};