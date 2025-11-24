import React, { useState, useEffect } from 'react';
import { 
  FaUserPlus, 
  FaExclamationTriangle, 
  FaUserFriends, 
  FaChalkboardTeacher,
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEnvelope,
  FaPhone,
  FaDownload,
  FaPrint,
  FaSort,
  FaRegCalendarAlt,
  FaSchool,
  FaGraduationCap
} from 'react-icons/fa';

const SubmissionsTab = ({ type }) => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const submissionTypes = {
    registrations: {
      title: 'Registration Requests',
      description: 'Manage student registration applications',
      icon: FaUserPlus,
      statuses: ['pending', 'reviewed', 'approved', 'rejected'],
      sampleData: [
        {
          id: 1,
          studentName: 'Alice Uwase',
          program: 'O-Level Science',
          email: 'alice@email.com',
          phone: '+250788123456',
          submitted: '2024-01-15',
          status: 'pending',
          documents: 3,
          priority: 'high'
        }
      ]
    },
    problems: {
      title: 'Student Problems & Issues',
      description: 'Manage student-reported problems and support requests',
      icon: FaExclamationTriangle,
      statuses: ['new', 'in-progress', 'resolved', 'closed'],
      sampleData: [
        {
          id: 1,
          studentName: 'John Mugisha',
          studentId: 'STU2024001',
          issueType: 'Academic',
          subject: 'Mathematics difficulty',
          submitted: '2024-01-14',
          status: 'new',
          priority: 'urgent',
          class: 'S4A'
        }
      ]
    },
    parents: {
      title: 'Parent Inquiries',
      description: 'Manage parent communications and inquiries',
      icon: FaUserFriends,
      statuses: ['new', 'responded', 'resolved', 'closed'],
      sampleData: [
        {
          id: 1,
          parentName: 'Mr. & Mrs. Ndayisaba',
          studentName: 'Marie Ndayisaba',
          relationship: 'Parents',
          inquiryType: 'Academic Progress',
          submitted: '2024-01-13',
          status: 'new',
          contact: '+250788654321'
        }
      ]
    },
    teachers: {
      title: 'Teacher Requests',
      description: 'Manage teacher requests and communications',
      icon: FaChalkboardTeacher,
      statuses: ['new', 'processing', 'completed', 'closed'],
      sampleData: [
        {
          id: 1,
          teacherName: 'Dr. James Smith',
          department: 'Sciences',
          requestType: 'Resource Request',
          subject: 'Lab Equipment',
          submitted: '2024-01-12',
          status: 'new',
          priority: 'medium'
        }
      ]
    }
  };

  const currentType = submissionTypes[type] || submissionTypes.registrations;

  useEffect(() => {
    loadSubmissions();
  }, [type]);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchTerm, statusFilter]);

  const loadSubmissions = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubmissions(currentType.sampleData);
      setLoading(false);
    }, 1000);
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    if (searchTerm) {
      filtered = filtered.filter(submission =>
        submission.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.teacherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(submission => submission.status === statusFilter);
    }

    setFilteredSubmissions(filtered);
  };

  const handleStatusUpdate = (id, newStatus) => {
    setSubmissions(prev => prev.map(submission =>
      submission.id === id ? { ...submission, status: newStatus } : submission
    ));
  };

  const getStatusBadge = (status, priority = 'normal') => {
    const statusConfig = {
      pending: { color: 'orange', icon: FaClock, label: 'Pending' },
      new: { color: 'blue', icon: FaClock, label: 'New' },
      reviewed: { color: 'purple', icon: FaEye, label: 'Reviewed' },
      approved: { color: 'green', icon: FaCheckCircle, label: 'Approved' },
      rejected: { color: 'red', icon: FaTimesCircle, label: 'Rejected' },
      'in-progress': { color: 'yellow', icon: FaClock, label: 'In Progress' },
      resolved: { color: 'green', icon: FaCheckCircle, label: 'Resolved' },
      closed: { color: 'gray', icon: FaTimesCircle, label: 'Closed' },
      responded: { color: 'purple', icon: FaCheckCircle, label: 'Responded' },
      processing: { color: 'yellow', icon: FaClock, label: 'Processing' },
      completed: { color: 'green', icon: FaCheckCircle, label: 'Completed' }
    };

    const config = statusConfig[status] || { color: 'gray', label: status };
    const IconComponent = config.icon;

    return (
      <span className={`status-badge ${config.color} ${priority}`}>
        <IconComponent />
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { color: 'gray', label: 'Low' },
      medium: { color: 'blue', label: 'Medium' },
      high: { color: 'orange', label: 'High' },
      urgent: { color: 'red', label: 'Urgent' }
    };

    const config = priorityConfig[priority] || { color: 'gray', label: 'Normal' };
    return (
      <span className={`priority-badge ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const renderSubmissionRow = (submission) => {
    switch (type) {
      case 'registrations':
        return (
          <>
            <td>
              <div className="submission-main">
                <strong>{submission.studentName}</strong>
                <span className="submission-meta">{submission.program}</span>
              </div>
            </td>
            <td>
              <div className="contact-info">
                <div><FaEnvelope /> {submission.email}</div>
                <div><FaPhone /> {submission.phone}</div>
              </div>
            </td>
            <td>{submission.documents} files</td>
            <td>
              <div className="date-info">
                <FaRegCalendarAlt />
                {submission.submitted}
              </div>
            </td>
            <td>{getPriorityBadge(submission.priority)}</td>
          </>
        );

      case 'problems':
        return (
          <>
            <td>
              <div className="submission-main">
                <strong>{submission.studentName}</strong>
                <span className="submission-meta">ID: {submission.studentId}</span>
                <span className="submission-class">{submission.class}</span>
              </div>
            </td>
            <td>
              <div className="issue-info">
                <strong>{submission.issueType}</strong>
                <span>{submission.subject}</span>
              </div>
            </td>
            <td>
              <div className="date-info">
                <FaRegCalendarAlt />
                {submission.submitted}
              </div>
            </td>
            <td>{getPriorityBadge(submission.priority)}</td>
          </>
        );

      case 'parents':
        return (
          <>
            <td>
              <div className="submission-main">
                <strong>{submission.parentName}</strong>
                <span className="submission-meta">{submission.relationship}</span>
              </div>
            </td>
            <td>
              <div className="student-reference">
                <FaGraduationCap />
                <span>{submission.studentName}</span>
              </div>
            </td>
            <td>{submission.inquiryType}</td>
            <td>
              <div className="contact-info">
                <FaPhone />
                {submission.contact}
              </div>
            </td>
            <td>
              <div className="date-info">
                <FaRegCalendarAlt />
                {submission.submitted}
              </div>
            </td>
          </>
        );

      case 'teachers':
        return (
          <>
            <td>
              <div className="submission-main">
                <strong>{submission.teacherName}</strong>
                <span className="submission-meta">{submission.department}</span>
              </div>
            </td>
            <td>{submission.requestType}</td>
            <td>{submission.subject}</td>
            <td>
              <div className="date-info">
                <FaRegCalendarAlt />
                {submission.submitted}
              </div>
            </td>
            <td>{getPriorityBadge(submission.priority)}</td>
          </>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="submissions-loading">
        <div className="loading-spinner"></div>
        <p>Loading {currentType.title}...</p>
      </div>
    );
  }

  return (
    <div className="submissions-tab">
      <div className="tab-header">
        <div className="header-content">
          <div className="header-icon">
            <currentType.icon />
          </div>
          <div>
            <h2>{currentType.title}</h2>
            <p>{currentType.description}</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <FaDownload />
            Export
          </button>
          <button className="btn btn-outline">
            <FaPrint />
            Print
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="submissions-stats">
        {currentType.statuses.map(status => (
          <div key={status} className="stat-card">
            <div className={`stat-icon ${status}`}>
              <currentType.icon />
            </div>
            <div className="stat-content">
              <h3>
                {submissions.filter(s => s.status === status).length}
              </h3>
              <p>{status.charAt(0).toUpperCase() + status.slice(1)}</p>
            </div>
          </div>
        ))}
        <div className="stat-card">
          <div className="stat-icon total">
            <FaSchool />
          </div>
          <div className="stat-content">
            <h3>{submissions.length}</h3>
            <p>Total</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="submissions-controls">
        <div className="search-filter">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder={`Search ${type}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            {currentType.statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <button className="btn btn-outline">
            <FaFilter />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="submissions-table-container">
        <table className="submissions-table">
          <thead>
            <tr>
              <th>Applicant/Requester</th>
              {type === 'registrations' && (
                <>
                  <th>Contact Info</th>
                  <th>Documents</th>
                  <th>Submitted</th>
                  <th>Priority</th>
                </>
              )}
              {type === 'problems' && (
                <>
                  <th>Issue Details</th>
                  <th>Date</th>
                  <th>Priority</th>
                </>
              )}
              {type === 'parents' && (
                <>
                  <th>Student</th>
                  <th>Inquiry Type</th>
                  <th>Contact</th>
                  <th>Date</th>
                </>
              )}
              {type === 'teachers' && (
                <>
                  <th>Request Type</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Priority</th>
                </>
              )}
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-state">
                  <div className="empty-icon">
                    <currentType.icon />
                  </div>
                  <h4>No submissions found</h4>
                  <p>Try adjusting your search or filters</p>
                </td>
              </tr>
            ) : (
              filteredSubmissions.map((submission) => (
                <tr key={submission.id} className={`submission-row ${submission.priority}`}>
                  {renderSubmissionRow(submission)}
                  
                  <td>
                    {getStatusBadge(submission.status, submission.priority)}
                  </td>
                  
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon view"
                        onClick={() => setSelectedSubmission(submission)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="btn-icon edit"
                        title="Edit Status"
                      >
                        <FaEdit />
                      </button>
                      <select
                        value={submission.status}
                        onChange={(e) => handleStatusUpdate(submission.id, e.target.value)}
                        className="status-select"
                      >
                        {currentType.statuses.map(status => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Submission Details</h3>
              <button 
                className="modal-close"
                onClick={() => setSelectedSubmission(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h4>Basic Information</h4>
                <div className="detail-grid">
                  {Object.entries(selectedSubmission).map(([key, value]) => (
                    <div key={key} className="detail-item">
                      <strong>{key}:</strong>
                      <span>{value.toString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </button>
              <button className="btn btn-primary">
                Take Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsTab;