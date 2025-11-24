import React, { useState, useEffect } from 'react';
import { 
  FaUserGraduate, 
  FaSearch, 
  FaFilter, 
  FaEnvelope, 
  FaPhone, 
  FaCalendar,
  FaEye,
  FaDownload,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import './RegistrationsManager.css';

const RegistrationsManager = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadRegistrations();
    window.addEventListener('storage', loadRegistrations);
    return () => window.removeEventListener('storage', loadRegistrations);
  }, []);

  useEffect(() => {
    filterRegistrations();
  }, [registrations, searchTerm, statusFilter]);

  const loadRegistrations = () => {
    const submissions = JSON.parse(localStorage.getItem('apaer_registrations_submissions') || '[]');
    setRegistrations(submissions);
  };

  const filterRegistrations = () => {
    let filtered = registrations;

    if (searchTerm) {
      filtered = filtered.filter(reg => 
        reg.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(reg => reg.status === statusFilter);
    }

    setFilteredRegistrations(filtered);
  };

  const updateStatus = (registrationId, status) => {
    const updated = registrations.map(reg => 
      reg.id === registrationId ? { ...reg, status } : reg
    );
    
    setRegistrations(updated);
    localStorage.setItem('apaer_registrations_submissions', JSON.stringify(updated));
  };

  const getProgramInfo = (registration) => {
    if (registration.programType === 'o-level') {
      return `O-Level - ${registration.level}`;
    } else {
      return `TVET - ${registration.tvetTrade} (${registration.tvetLevel})`;
    }
  };

  return (
    <div className="registrations-manager">
      <div className="section-header">
        <h2><FaUserGraduate /> Student Registrations</h2>
        <p>Manage all student registration applications</p>
      </div>

      <div className="controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search registrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="registrations-layout">
        <div className="registrations-list">
          {filteredRegistrations.map(registration => (
            <div
              key={registration.id}
              className={`registration-card ${selectedRegistration?.id === registration.id ? 'active' : ''}`}
              onClick={() => setSelectedRegistration(registration)}
            >
              <div className="card-header">
                <h4>{registration.fullName}</h4>
                <span className={`status-badge ${registration.status}`}>
                  {registration.status}
                </span>
              </div>
              
              <div className="card-details">
                <p><FaEnvelope /> {registration.email}</p>
                <p><FaPhone /> {registration.phone}</p>
                <p><FaCalendar /> {registration.dateOfBirth}</p>
                <p><FaUserGraduate /> {getProgramInfo(registration)}</p>
              </div>

              <div className="card-meta">
                <span>{new Date(registration.submittedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="registration-detail">
          {selectedRegistration ? (
            <div className="detail-view">
              <div className="detail-header">
                <h3>{selectedRegistration.fullName}</h3>
                <div className="status-controls">
                  <button 
                    className="btn-success"
                    onClick={() => updateStatus(selectedRegistration.id, 'approved')}
                  >
                    <FaCheck /> Approve
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => updateStatus(selectedRegistration.id, 'rejected')}
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              </div>

              <div className="detail-sections">
                <div className="detail-section">
                  <h4>Personal Information</h4>
                  <div className="info-grid">
                    <div><strong>Email:</strong> {selectedRegistration.email}</div>
                    <div><strong>Phone:</strong> {selectedRegistration.phone}</div>
                    <div><strong>Date of Birth:</strong> {selectedRegistration.dateOfBirth}</div>
                    <div><strong>Gender:</strong> {selectedRegistration.gender}</div>
                    <div><strong>Nationality:</strong> {selectedRegistration.nationality}</div>
                    <div><strong>Address:</strong> {selectedRegistration.address}</div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Academic Information</h4>
                  <div className="info-grid">
                    <div><strong>Program Type:</strong> {selectedRegistration.programType === 'o-level' ? 'O-Level' : 'TVET'}</div>
                    <div><strong>Level:</strong> {selectedRegistration.level || selectedRegistration.tvetLevel}</div>
                    {selectedRegistration.tvetTrade && (
                      <div><strong>Trade:</strong> {selectedRegistration.tvetTrade}</div>
                    )}
                    <div><strong>Current School:</strong> {selectedRegistration.currentSchool}</div>
                  </div>
                </div>

                {selectedRegistration.documents && (
                  <div className="detail-section">
                    <h4>Documents</h4>
                    <div className="documents-list">
                      {selectedRegistration.documents.reportCard && (
                        <div className="document-item">
                          <FaDownload />
                          <span>Report Card: {selectedRegistration.documents.reportCard.name}</span>
                        </div>
                      )}
                      {selectedRegistration.documents.studentPhoto && (
                        <div className="document-item">
                          <FaDownload />
                          <span>Student Photo: {selectedRegistration.documents.studentPhoto.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <FaEye />
              <p>Select a registration to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationsManager;