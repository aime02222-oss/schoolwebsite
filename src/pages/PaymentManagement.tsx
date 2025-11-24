// src/components/PaymentManagement.js
import React, { useState, useEffect } from 'react';
import { 
  FaMoneyBillWave, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEnvelope,
  FaUserGraduate,
  FaPhone,
  FaUniversity,
  FaMobileAlt,
  FaEye,
  FaCheck,
  FaTimes,
  FaArrowRight,
  FaChartBar
} from 'react-icons/fa';
import './PaymentManagement.css';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    verified: 0,
    rejected: 0
  });

  useEffect(() => {
    loadPayments();
    window.addEventListener('storage', loadPayments);
    return () => window.removeEventListener('storage', loadPayments);
  }, []);

  const loadPayments = () => {
    const storedPayments = JSON.parse(localStorage.getItem('apaer_payments') || '[]');
    setPayments(storedPayments);

    const pending = storedPayments.filter(p => p.status === 'pending').length;
    const verified = storedPayments.filter(p => p.status === 'verified').length;
    const rejected = storedPayments.filter(p => p.status === 'rejected').length;

    setStats({
      total: storedPayments.length,
      pending,
      verified,
      rejected
    });
  };

  const filteredPayments = payments.filter(payment => {
    const matchesFilter = filter === 'all' || payment.status === filter;
    const matchesSearch = 
      payment.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const updatePaymentStatus = (paymentId, status, adminNotes = '') => {
    const updatedPayments = payments.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            status, 
            verifiedAt: status === 'verified' ? new Date().toISOString() : payment.verifiedAt,
            verifiedBy: status === 'verified' ? 'Administrator' : '',
            adminNotes: adminNotes || payment.adminNotes,
            rejectionReason: status === 'rejected' ? adminNotes : ''
          }
        : payment
    );

    setPayments(updatedPayments);
    localStorage.setItem('apaer_payments', JSON.stringify(updatedPayments));
    setSelectedPayment(null);
  };

  const sendToAccountant = (payment) => {
    // In a real app, this would integrate with your accounting system
    const accountantData = {
      ...payment,
      exportedToAccountant: true,
      exportedAt: new Date().toISOString()
    };

    const updatedPayments = payments.map(p => 
      p.id === payment.id ? accountantData : p
    );

    setPayments(updatedPayments);
    localStorage.setItem('apaer_payments', JSON.stringify(updatedPayments));
    
    alert(`Payment for ${payment.studentName} sent to accounting system successfully!`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: '#FF9800', label: 'Pending', icon: FaClock },
      verified: { color: '#4CAF50', label: 'Verified', icon: FaCheckCircle },
      rejected: { color: '#f44336', label: 'Rejected', icon: FaTimes }
    };
    
    const config = statusConfig[status] || { color: '#666', label: status, icon: FaClock };
    const IconComponent = config.icon;
    
    return (
      <span className="status-badge" style={{ backgroundColor: config.color }}>
        <IconComponent />
        {config.label}
      </span>
    );
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'mtn':
      case 'airtel':
        return <FaMobileAlt className="method-icon mobile" />;
      case 'bk':
      case 'equity':
      case 'bpr':
        return <FaUniversity className="method-icon bank" />;
      case 'urubuto':
        return <FaMoneyBillWave className="method-icon urubuto" />;
      default:
        return <FaMoneyBillWave className="method-icon default" />;
    }
  };

  return (
    <div className="payment-management">
      {/* Header */}
      <div className="payment-header">
        <div className="header-content">
          <FaMoneyBillWave className="header-icon" />
          <div className="header-text">
            <h1>Payment Management</h1>
            <p>Manage and verify student fee payments</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="payment-stats">
        <div className="stat-card total">
          <div className="stat-icon">
            <FaMoneyBillWave />
          </div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Payments</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-info">
            <h3>{stats.pending}</h3>
            <p>Pending Verification</p>
          </div>
        </div>
        <div className="stat-card verified">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <h3>{stats.verified}</h3>
            <p>Verified Payments</p>
          </div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-icon">
            <FaExclamationTriangle />
          </div>
          <div className="stat-info">
            <h3>{stats.rejected}</h3>
            <p>Rejected Payments</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="payment-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by student name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Payments
          </button>
          <button 
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-tab ${filter === 'verified' ? 'active' : ''}`}
            onClick={() => setFilter('verified')}
          >
            Verified
          </button>
          <button 
            className={`filter-tab ${filter === 'rejected' ? 'active' : ''}`}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="payments-table-container">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-payments">
                  <FaMoneyBillWave />
                  <p>No payments found</p>
                  <span>Student payments will appear here when submitted</span>
                </td>
              </tr>
            ) : (
              filteredPayments.map(payment => (
                <PaymentRow 
                  key={payment.id}
                  payment={payment}
                  onView={() => setSelectedPayment(payment)}
                  onVerify={updatePaymentStatus}
                  onReject={updatePaymentStatus}
                  onSendToAccountant={sendToAccountant}
                  getStatusBadge={getStatusBadge}
                  getMethodIcon={getMethodIcon}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
          onVerify={updatePaymentStatus}
          onReject={updatePaymentStatus}
          onSendToAccountant={sendToAccountant}
          getStatusBadge={getStatusBadge}
          getMethodIcon={getMethodIcon}
        />
      )}
    </div>
  );
};

const PaymentRow = ({ 
  payment, 
  onView, 
  onVerify, 
  onReject, 
  onSendToAccountant,
  getStatusBadge,
  getMethodIcon 
}) => {
  return (
    <tr className="payment-row">
      <td>
        <div className="student-info">
          <FaUserGraduate className="student-icon" />
          <div className="student-details">
            <strong>{payment.studentName}</strong>
            <span>{payment.studentId}</span>
            <span className="student-email">{payment.email}</span>
          </div>
        </div>
      </td>
      <td>
        <div className="amount-cell">
          <strong className="amount">RWF {payment.amount}</strong>
        </div>
      </td>
      <td>
        <div className="method-cell">
          {getMethodIcon(payment.method)}
          <span className="method-name">
            {payment.method === 'mtn' && 'MTN Mobile Money'}
            {payment.method === 'airtel' && 'Airtel Money'}
            {payment.method === 'bk' && 'Bank of Kigali'}
            {payment.method === 'equity' && 'Equity Bank'}
            {payment.method === 'bpr' && 'BPR Bank'}
            {payment.method === 'urubuto' && 'Urubuto Platform'}
          </span>
        </div>
      </td>
      <td>
        <div className="date-cell">
          {new Date(payment.submittedAt).toLocaleDateString()}
          <span className="time">
            {new Date(payment.submittedAt).toLocaleTimeString()}
          </span>
        </div>
      </td>
      <td>
        {getStatusBadge(payment.status)}
      </td>
      <td>
        <div className="action-buttons">
          <button className="btn-view" onClick={onView}>
            <FaEye />
            View
          </button>
          
          {payment.status === 'pending' && (
            <>
              <button 
                className="btn-verify"
                onClick={() => onVerify(payment.id, 'verified')}
              >
                <FaCheck />
                Verify
              </button>
              <button 
                className="btn-reject"
                onClick={() => onReject(payment.id, 'rejected')}
              >
                <FaTimes />
                Reject
              </button>
            </>
          )}
          
          {payment.status === 'verified' && !payment.exportedToAccountant && (
            <button 
              className="btn-accountant"
              onClick={() => onSendToAccountant(payment)}
            >
              <FaArrowRight />
              Send to Accountant
            </button>
          )}
          
          {payment.exportedToAccountant && (
            <span className="exported-badge">
              <FaCheckCircle />
              Sent to Accounting
            </span>
          )}
        </div>
      </td>
    </tr>
  );
};

const PaymentDetailModal = ({ 
  payment, 
  onClose, 
  onVerify, 
  onReject, 
  onSendToAccountant,
  getStatusBadge,
  getMethodIcon 
}) => {
  const [rejectionReason, setRejectionReason] = useState('');

  const handleReject = () => {
    if (rejectionReason.trim() === '') {
      alert('Please provide a reason for rejection');
      return;
    }
    onReject(payment.id, 'rejected', rejectionReason);
  };

  return (
    <div className="modal-overlay">
      <div className="payment-modal">
        <div className="modal-header">
          <h2>Payment Details</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          <div className="payment-details-grid">
            <div className="detail-section">
              <h3>Student Information</h3>
              <div className="detail-item">
                <span>Student Name:</span>
                <strong>{payment.studentName}</strong>
              </div>
              <div className="detail-item">
                <span>Student ID:</span>
                <strong>{payment.studentId}</strong>
              </div>
              <div className="detail-item">
                <span>Email:</span>
                <strong>{payment.email}</strong>
              </div>
              {payment.phoneNumber && (
                <div className="detail-item">
                  <span>Phone:</span>
                  <strong>{payment.phoneNumber}</strong>
                </div>
              )}
            </div>

            <div className="detail-section">
              <h3>Payment Information</h3>
              <div className="detail-item">
                <span>Amount:</span>
                <strong className="amount-large">RWF {payment.amount}</strong>
              </div>
              <div className="detail-item">
                <span>Payment Method:</span>
                <div className="method-detail">
                  {getMethodIcon(payment.method)}
                  <strong>
                    {payment.method === 'mtn' && 'MTN Mobile Money'}
                    {payment.method === 'airtel' && 'Airtel Money'}
                    {payment.method === 'bk' && 'Bank of Kigali'}
                    {payment.method === 'equity' && 'Equity Bank'}
                    {payment.method === 'bpr' && 'BPR Bank'}
                    {payment.method === 'urubuto' && 'Urubuto Platform'}
                  </strong>
                </div>
              </div>
              {payment.accountNumber && (
                <div className="detail-item">
                  <span>Account Number:</span>
                  <strong>{payment.accountNumber}</strong>
                </div>
              )}
              <div className="detail-item">
                <span>Submitted:</span>
                <strong>{new Date(payment.submittedAt).toLocaleString()}</strong>
              </div>
            </div>

            <div className="detail-section">
              <h3>Payment Status</h3>
              <div className="status-display">
                {getStatusBadge(payment.status)}
                {payment.verifiedAt && (
                  <div className="verification-info">
                    <span>Verified by: {payment.verifiedBy}</span>
                    <span>on {new Date(payment.verifiedAt).toLocaleString()}</span>
                  </div>
                )}
                {payment.rejectionReason && (
                  <div className="rejection-info">
                    <strong>Rejection Reason:</strong>
                    <p>{payment.rejectionReason}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {payment.status === 'pending' && (
            <div className="action-section">
              <div className="verification-actions">
                <button 
                  className="btn-verify-large"
                  onClick={() => onVerify(payment.id, 'verified')}
                >
                  <FaCheckCircle />
                  Verify Payment
                </button>
                
                <div className="rejection-area">
                  <h4>Reject Payment</h4>
                  <textarea
                    placeholder="Provide reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="rejection-textarea"
                  />
                  <button 
                    className="btn-reject-large"
                    onClick={handleReject}
                    disabled={!rejectionReason.trim()}
                  >
                    <FaTimes />
                    Reject Payment
                  </button>
                </div>
              </div>
            </div>
          )}

          {payment.status === 'verified' && !payment.exportedToAccountant && (
            <div className="accounting-section">
              <button 
                className="btn-accountant-large"
                onClick={() => onSendToAccountant(payment)}
              >
                <FaArrowRight />
                Send to Accounting System
              </button>
            </div>
          )}

          {payment.exportedToAccountant && (
            <div className="exported-section">
              <div className="success-message">
                <FaCheckCircle />
                <div>
                  <strong>Sent to Accounting System</strong>
                  <span>Exported on {new Date(payment.exportedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;