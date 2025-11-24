import React, { useState, useEffect } from 'react';
import { FaUserGraduate, FaSearch, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const StudentSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    loadSubmissions();
    window.addEventListener('storage', loadSubmissions);
    return () => window.removeEventListener('storage', loadSubmissions);
  }, []);

  const loadSubmissions = () => {
    const studentSubmissions = JSON.parse(localStorage.getItem('apaer_student_submissions') || '[]');
    setSubmissions(studentSubmissions);
  };

  return (
    <div className="section-container">
      <div className="section-header">
        <h2><FaUserGraduate /> Student Inquiries</h2>
        <p>Manage student questions and concerns</p>
      </div>
      
      <div className="submissions-grid">
        {submissions.map(submission => (
          <div key={submission.id} className="submission-card">
            <div className="card-header">
              <h4>{submission.fullName}</h4>
              <span className={`status-badge ${submission.status}`}>
                {submission.status}
              </span>
            </div>
            <p><strong>Student ID:</strong> {submission.studentId}</p>
            <p><strong>Class:</strong> {submission.studentClass}</p>
            <p><strong>Message Type:</strong> {submission.messageType}</p>
            <p className="message-preview">{submission.message}</p>
            <div className="card-actions">
              <button className="btn-primary">
                <FaPaperPlane /> Respond
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSubmissions;