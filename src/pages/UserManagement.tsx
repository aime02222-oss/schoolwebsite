import React, { useState, useEffect } from 'react';
import {
  FaUsers,
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaLock,
  FaUnlock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
  FaUserShield,
  FaUserTie,
  FaUserGraduate,
  FaUserFriends,
  FaCog,
  FaKey,
  FaCalendar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChalkboardTeacher  // Added missing import
} from 'react-icons/fa';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const userRoles = [
    { id: 'super_admin', label: 'Super Admin', icon: FaUserShield, color: '#e74c3c' },
    { id: 'admin', label: 'Administrator', icon: FaUserTie, color: '#3498db' },
    { id: 'teacher', label: 'Teacher', icon: FaChalkboardTeacher, color: '#e67e22' },
    { id: 'student', label: 'Student', icon: FaUserGraduate, color: '#2ecc71' },
    { id: 'parent', label: 'Parent', icon: FaUserFriends, color: '#9b59b6' }
  ];

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'student',
    status: 'active',
    password: '',
    confirmPassword: '',
    permissions: [],
    department: '',
    joinDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter, statusFilter]);

  const loadUsers = () => {
    // Simulated user data
    const sampleUsers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@apaer.ac.rw',
        phone: '+250788123456',
        role: 'super_admin',
        status: 'active',
        lastLogin: '2024-01-15T10:30:00Z',
        joinDate: '2023-01-15',
        department: 'Administration',
        avatar: null,
        permissions: ['all']
      },
      {
        id: 2,
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@apaer.ac.rw',
        phone: '+250788654321',
        role: 'admin',
        status: 'active',
        lastLogin: '2024-01-14T15:45:00Z',
        joinDate: '2023-03-20',
        department: 'Academic',
        avatar: null,
        permissions: ['users.read', 'students.manage', 'payments.view']
      },
      {
        id: 3,
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert.j@apaer.ac.rw',
        phone: '+250788789012',
        role: 'teacher',
        status: 'active',
        lastLogin: '2024-01-13T08:15:00Z',
        joinDate: '2023-02-10',
        department: 'Science',
        avatar: null,
        permissions: ['students.view', 'grades.manage']
      }
    ];
    setUsers(sampleUsers);
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'student',
      status: 'active',
      password: '',
      confirmPassword: '',
      permissions: [],
      department: '',
      joinDate: new Date().toISOString().split('T')[0]
    });
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ ...user, password: '', confirmPassword: '' });
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (newUser.password !== newUser.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map(user =>
        user.id === editingUser.id ? { ...newUser, id: editingUser.id } : user
      );
      setUsers(updatedUsers);
    } else {
      // Add new user
      const userToAdd = {
        ...newUser,
        id: Date.now(),
        lastLogin: null,
        avatar: null
      };
      setUsers([...users, userToAdd]);
    }

    setShowUserModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const getRoleIcon = (roleId) => {
    const role = userRoles.find(r => r.id === roleId);
    const IconComponent = role?.icon || FaUsers;
    return <IconComponent style={{ color: role?.color }} />;
  };

  const getRoleLabel = (roleId) => {
    return userRoles.find(r => r.id === roleId)?.label || 'Unknown';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const permissionGroups = {
    users: ['users.read', 'users.write', 'users.delete'],
    students: ['students.view', 'students.manage', 'students.delete'],
    teachers: ['teachers.view', 'teachers.manage'],
    payments: ['payments.view', 'payments.manage', 'payments.verify'],
    academic: ['grades.manage', 'attendance.manage', 'timetable.manage'],
    system: ['system.settings', 'backup.manage', 'reports.generate']
  };

  return (
    <div className="user-management-container">
      <div className="management-header">
        <div className="header-content">
          <FaUsers className="header-icon" />
          <div>
            <h1>User Management</h1>
            <p>Manage system users, roles, and permissions</p>
          </div>
        </div>
        <button className="btn-primary" onClick={handleAddUser}>
          <FaUserPlus />
          Add New User
        </button>
      </div>

      <div className="management-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search users by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            {userRoles.map(role => (
              <option key={role.id} value={role.id}>{role.label}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="users-grid">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <div className="user-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                ) : (
                  <FaUsers />
                )}
              </div>
              <div className="user-info">
                <h3>{user.firstName} {user.lastName}</h3>
                <p className="user-email">{user.email}</p>
                <div className="user-meta">
                  <span className="user-role">
                    {getRoleIcon(user.role)}
                    {getRoleLabel(user.role)}
                  </span>
                  <span className={`user-status ${user.status}`}>
                    {user.status === 'active' ? <FaCheckCircle /> : <FaTimesCircle />}
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="user-details">
              <div className="detail-item">
                <FaPhone />
                <span>{user.phone}</span>
              </div>
              <div className="detail-item">
                <FaMapMarkerAlt />
                <span>{user.department}</span>
              </div>
              <div className="detail-item">
                <FaCalendar />
                <span>Joined: {formatDate(user.joinDate)}</span>
              </div>
              {user.lastLogin && (
                <div className="detail-item">
                  <FaEye />
                  <span>Last login: {formatDate(user.lastLogin)}</span>
                </div>
              )}
            </div>

            <div className="user-actions">
              <button
                className="btn-edit"
                onClick={() => handleEditUser(user)}
                title="Edit User"
              >
                <FaEdit />
              </button>
              <button
                className={`btn-status ${user.status}`}
                onClick={() => toggleUserStatus(user.id)}
                title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
              >
                {user.status === 'active' ? <FaLock /> : <FaUnlock />}
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDeleteUser(user.id)}
                title="Delete User"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="empty-state">
          <FaUsers className="empty-icon" />
          <h3>No users found</h3>
          <p>No users match your search criteria</p>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="user-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
              <button
                className="modal-close"
                onClick={() => setShowUserModal(false)}
              >
                <FaTimesCircle />
              </button>
            </div>

            <div className="modal-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    placeholder="Enter last name"
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    {userRoles.map(role => (
                      <option key={role.id} value={role.id}>{role.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    placeholder="Enter department"
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Join Date</label>
                  <input
                    type="date"
                    value={newUser.joinDate}
                    onChange={(e) => setNewUser({ ...newUser, joinDate: e.target.value })}
                  />
                </div>
              </div>

              {!editingUser && (
                <div className="password-section">
                  <h4>Set Password</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Password *</label>
                      <div className="password-input">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={newUser.password}
                          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Confirm Password *</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newUser.confirmPassword}
                        onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="permissions-section">
                <h4>Permissions</h4>
                <div className="permissions-grid">
                  {Object.entries(permissionGroups).map(([group, permissions]) => (
                    <div key={group} className="permission-group">
                      <h5>{group.charAt(0).toUpperCase() + group.slice(1)}</h5>
                      {permissions.map(permission => (
                        <label key={permission} className="permission-checkbox">
                          <input
                            type="checkbox"
                            checked={newUser.permissions.includes(permission)}
                            onChange={(e) => {
                              const updatedPermissions = e.target.checked
                                ? [...newUser.permissions, permission]
                                : newUser.permissions.filter(p => p !== permission);
                              setNewUser({ ...newUser, permissions: updatedPermissions });
                            }}
                          />
                          <span className="checkmark"></span>
                          {permission}
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowUserModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handleSaveUser}
              >
                {editingUser ? 'Update User' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;