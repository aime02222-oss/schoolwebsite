import React, { useState } from 'react';
import { 
  FaMobileAlt, 
  FaUniversity, 
  FaCheckCircle, 
  FaEnvelope, 
  FaPhone,
  FaArrowRight,
  FaArrowLeft,
  FaLock,
  FaCreditCard,
  FaQrcode,
  FaReceipt,
  FaUserGraduate,
  FaMoneyBillWave,
  FaRocket,
  FaShieldAlt
} from 'react-icons/fa';
import './Payment.css';
const Payment = () => {
  const [step, setStep] = useState(1);
  const [paymentData, setPaymentData] = useState({
    studentId: '',
    studentName: '',
    amount: '',
    method: '',
    accountNumber: '',
    phoneNumber: '',
    email: '',
    useUrubuto: false
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMethodSelect = (method) => {
    setPaymentData(prev => ({
      ...prev,
      method,
      useUrubuto: false,
      accountNumber: '',
      phoneNumber: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="modern-payment-page">
      {/* Header Section */}
      <div className="payment-header">
        <div className="header-background">
          <div className="header-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="header-content">
          <div className="header-badge">
            <FaMoneyBillWave />
            <span>Secure Payment</span>
          </div>
          <h1 className="header-title">
            School Fee <span className="gradient-text">Payment</span>
          </h1>
          <p className="header-description">
            Fast, secure, and convenient payment processing for Apaer Institute students
          </p>
        </div>
      </div>

      <div className="payment-container-wrapper">
        {/* Progress Steps */}
        <div className="payment-progress">
          <div className="progress-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <span className="step-label">Student Info</span>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span className="step-label">Payment Method</span>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span className="step-label">Confirmation</span>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="modern-payment-container">
          {step === 1 && (
            <PaymentForm 
              paymentData={paymentData}
              handleChange={handleChange}
              nextStep={nextStep}
            />
          )}
          
          {step === 2 && (
            <PaymentMethod 
              paymentData={paymentData}
              handleMethodSelect={handleMethodSelect}
              handleChange={handleChange}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />
          )}
          
          {step === 3 && (
            <PaymentConfirmation 
              paymentData={paymentData}
              prevStep={prevStep}
            />
          )}
        </div>

        {/* Security Badge */}
        <div className="security-banner">
          <div className="security-content">
            <FaLock className="security-icon" />
            <div className="security-text">
              <strong>100% Secure Payments</strong>
              <span>Encrypted & PCI DSS Compliant</span>
            </div>
          </div>
          <div className="security-features">
            <span className="feature">
              <FaShieldAlt />
              SSL Secured
            </span>
            <span className="feature">
              <FaCreditCard />
              Payment Protection
            </span>
            <span className="feature">
              <FaReceipt />
              Instant Receipt
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentForm = ({ paymentData, handleChange, nextStep }) => {
  const isFormValid = () => {
    return (
      paymentData.studentId.trim() !== '' &&
      paymentData.studentName.trim() !== '' &&
      paymentData.amount.trim() !== '' &&
      paymentData.email.trim() !== ''
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      nextStep();
    }
  };

  return (
    <form className="modern-payment-form" onSubmit={handleFormSubmit}>
      <div className="form-header">
        <div className="form-icon">
          <FaUserGraduate />
        </div>
        <div className="form-title">
          <h2>Student Information</h2>
          <p>Please provide your student details to proceed with payment</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group modern-form-group">
          <label className="form-label">
            Student ID <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              name="studentId"
              value={paymentData.studentId}
              onChange={handleChange}
              className="modern-input"
              required
              placeholder="Enter your student ID"
            />
            <div className="input-icon">
              <FaUserGraduate />
            </div>
          </div>
        </div>

        <div className="form-group modern-form-group">
          <label className="form-label">
            Student Name <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              name="studentName"
              value={paymentData.studentName}
              onChange={handleChange}
              className="modern-input"
              required
              placeholder="Enter your full name"
            />
            <div className="input-icon">
              <FaUserGraduate />
            </div>
          </div>
        </div>

        <div className="form-group modern-form-group">
          <label className="form-label">
            Amount (RWF) <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="number"
              name="amount"
              value={paymentData.amount}
              onChange={handleChange}
              className="modern-input"
              required
              min="1"
              placeholder="Enter amount"
            />
            <div className="input-icon">
              <FaMoneyBillWave />
            </div>
          </div>
          <div className="input-hint">Minimum amount: RWF 1,000</div>
        </div>

        <div className="form-group modern-form-group">
          <label className="form-label">
            Email Address <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              value={paymentData.email}
              onChange={handleChange}
              className="modern-input"
              required
              placeholder="your.email@example.com"
            />
            <div className="input-icon">
              <FaEnvelope />
            </div>
          </div>
          <div className="input-hint">Payment receipt will be sent to this email</div>
        </div>
      </div>

      <div className="form-actions modern-actions">
        <button 
          type="submit" 
          className="modern-btn primary-btn"
          disabled={!isFormValid()}
        >
          <span>Continue to Payment</span>
          <FaArrowRight />
        </button>
      </div>
    </form>
  );
};

const PaymentMethod = ({ 
  paymentData, 
  handleMethodSelect, 
  handleChange, 
  prevStep, 
  handleSubmit 
}) => {
  const isFormValid = () => {
    if (!paymentData.method) return false;
    if (paymentData.useUrubuto) return true;
    
    if (['mtn', 'airtel'].includes(paymentData.method)) {
      return paymentData.phoneNumber.trim() !== '';
    } else {
      return paymentData.accountNumber.trim() !== '';
    }
  };

  const paymentMethods = [
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      icon: FaMobileAlt,
      description: 'Pay instantly with MTN Mobile Money',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'airtel',
      name: 'Airtel Money',
      icon: FaMobileAlt,
      description: 'Pay with Airtel Money',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'bk',
      name: 'Bank of Kigali',
      icon: FaUniversity,
      description: 'Transfer via BK Bank',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'equity',
      name: 'Equity Bank',
      icon: FaUniversity,
      description: 'Transfer via Equity Bank',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'bpr',
      name: 'BPR Bank',
      icon: FaUniversity,
      description: 'Transfer via BPR Bank',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <form className="modern-payment-method" onSubmit={handleSubmit}>
      <div className="form-header">
        <div className="form-icon">
          <FaCreditCard />
        </div>
        <div className="form-title">
          <h2>Select Payment Method</h2>
          <p>Choose your preferred payment method to complete the transaction</p>
        </div>
      </div>
      
      <div className="payment-summary">
        <div className="summary-card">
          <div className="summary-item">
            <span>Student ID:</span>
            <strong>{paymentData.studentId}</strong>
          </div>
          <div className="summary-item">
            <span>Amount:</span>
            <strong className="amount">RWF {paymentData.amount}</strong>
          </div>
        </div>
      </div>
      
      <div className="method-options-grid">
        {paymentMethods.map(method => {
          const MethodIcon = method.icon;
          return (
            <button
              key={method.id}
              type="button"
              className={`method-option-card ${paymentData.method === method.id ? 'selected' : ''} ${method.color}`}
              onClick={() => handleMethodSelect(method.id)}
            >
              <div className="option-content">
                <div className="option-icon">
                  <MethodIcon />
                </div>
                <div className="option-details">
                  <h4>{method.name}</h4>
                  <p>{method.description}</p>
                </div>
                <div className="option-check">
                  <div className="check-circle">
                    {paymentData.method === method.id && <FaCheckCircle />}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {paymentData.method && (
        <div className="method-details-card">
          <div className="card-header">
            <h3>Payment Details</h3>
          </div>
          
          <div className="urubuto-option modern-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="useUrubuto"
                checked={paymentData.useUrubuto}
                onChange={handleChange}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">
                <strong>Pay using Urubuto platform</strong>
                <span>Secure government payment gateway</span>
              </span>
            </label>
          </div>

          {!paymentData.useUrubuto && (
            <div className="account-form">
              {['mtn', 'airtel'].includes(paymentData.method) ? (
                <div className="form-group modern-form-group">
                  <label className="form-label">Mobile Money Number *</label>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={paymentData.phoneNumber}
                      onChange={handleChange}
                      className="modern-input"
                      required
                      placeholder="07XXXXXXXX"
                      pattern="07[0-9]{8}"
                    />
                    <div className="input-icon">
                      <FaMobileAlt />
                    </div>
                  </div>
                  <div className="input-hint">Enter your 10-digit mobile number</div>
                </div>
              ) : (
                <div className="form-group modern-form-group">
                  <label className="form-label">Bank Account Number *</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="accountNumber"
                      value={paymentData.accountNumber}
                      onChange={handleChange}
                      className="modern-input"
                      required
                      placeholder="Enter your account number"
                    />
                    <div className="input-icon">
                      <FaUniversity />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {paymentData.useUrubuto && (
            <div className="urubuto-features">
              <div className="feature-item">
                <FaQrcode className="feature-icon" />
                <div>
                  <strong>QR Code Payment</strong>
                  <span>Scan to pay instantly</span>
                </div>
              </div>
              <div className="feature-item">
                <FaShieldAlt className="feature-icon" />
                <div>
                  <strong>Government Secure</strong>
                  <span>Official payment platform</span>
                </div>
              </div>
              <div className="feature-item">
                <FaRocket className="feature-icon" />
                <div>
                  <strong>Instant Confirmation</strong>
                  <span>Real-time processing</span>
                </div>
              </div>
            </div>
          )}

          {!paymentData.useUrubuto && ['bk', 'equity', 'bpr'].includes(paymentData.method) && (
            <div className="bank-details-card">
              <h4>Bank Transfer Details</h4>
              <div className="bank-details">
                <div className="detail-row">
                  <span>Account Name:</span>
                  <strong>Apaer Institute</strong>
                </div>
                <div className="detail-row">
                  <span>Account Number:</span>
                  <strong>1234567890</strong>
                </div>
                <div className="detail-row">
                  <span>Reference:</span>
                  <strong className="reference">Student ID {paymentData.studentId}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="form-actions modern-actions">
        <button 
          type="button" 
          className="modern-btn secondary-btn"
          onClick={prevStep}
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <button 
          type="submit" 
          className="modern-btn primary-btn"
          disabled={!isFormValid()}
        >
          <span>{paymentData.useUrubuto ? 'Proceed to Urubuto' : 'Confirm Payment'}</span>
          <FaArrowRight />
        </button>
      </div>
    </form>
  );
};

const PaymentConfirmation = ({ paymentData, prevStep }) => {
  const handleContact = (method) => {
    if (method === 'email') {
      window.location.href = `mailto:accounts@apaer.ac.rw?subject=Payment Confirmation for ${paymentData.studentName}`;
    } else {
      window.location.href = 'tel:+250788123456';
    }
  };

  const handleUrubutoRedirect = () => {
    window.open('https://urubuto.rw/payment', '_blank');
  };

  return (
    <div className="modern-payment-confirmation">
      <div className="confirmation-header">
        <div className="confirmation-icon success">
          <FaCheckCircle />
        </div>
        <div className="confirmation-title">
          {paymentData.useUrubuto ? (
            <>
              <h2>Ready for Urubuto Payment</h2>
              <p>You're about to complete your payment through the official government platform</p>
            </>
          ) : (
            <>
              <h2>Payment Submitted Successfully!</h2>
              <p>Your payment has been processed and confirmed</p>
            </>
          )}
        </div>
      </div>

      <div className="confirmation-content">
        {paymentData.useUrubuto ? (
          <div className="urubuto-redirect-section">
            <div className="redirect-card">
              <div className="qr-placeholder">
                <FaQrcode className="qr-icon" />
                <span>QR Code Payment Available</span>
              </div>
              
              <div className="payment-summary-urgent">
                <div className="summary-item">
                  <span>Amount Due:</span>
                  <strong className="amount-large">RWF {paymentData.amount}</strong>
                </div>
                <div className="summary-item">
                  <span>Student:</span>
                  <strong>{paymentData.studentName}</strong>
                </div>
                <div className="summary-item">
                  <span>Student ID:</span>
                  <strong>{paymentData.studentId}</strong>
                </div>
              </div>

              <button 
                className="modern-btn urgent-btn"
                onClick={handleUrubutoRedirect}
              >
                <FaRocket />
                <span>Proceed to Urubuto Now</span>
              </button>
              
              <div className="security-notice">
                <FaLock className="lock-icon" />
                <span>You will be redirected to Urubuto's secure payment page</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="payment-details-card">
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Student ID</span>
                <strong className="detail-value">{paymentData.studentId}</strong>
              </div>
              <div className="detail-item">
                <span className="detail-label">Student Name</span>
                <strong className="detail-value">{paymentData.studentName}</strong>
              </div>
              <div className="detail-item">
                <span className="detail-label">Amount Paid</span>
                <strong className="detail-value amount">RWF {paymentData.amount}</strong>
              </div>
              <div className="detail-item">
                <span className="detail-label">Payment Method</span>
                <strong className="detail-value method">{paymentData.method.toUpperCase()}</strong>
              </div>
              {paymentData.phoneNumber && (
                <div className="detail-item">
                  <span className="detail-label">Phone Number</span>
                  <strong className="detail-value">{paymentData.phoneNumber}</strong>
                </div>
              )}
              {paymentData.accountNumber && (
                <div className="detail-item">
                  <span className="detail-label">Account Number</span>
                  <strong className="detail-value">{paymentData.accountNumber}</strong>
                </div>
              )}
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <strong className="detail-value">{paymentData.email}</strong>
              </div>
            </div>
            
            <div className="confirmation-message">
              <div className="message-icon">
                <FaReceipt />
              </div>
              <div className="message-content">
                <p><strong>Payment Confirmed!</strong></p>
                <p>A detailed receipt has been sent to your email address.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="contact-section">
        <h4>Need Assistance?</h4>
        <div className="contact-buttons">
          <button 
            className="contact-btn email-btn"
            onClick={() => handleContact('email')}
          >
            <FaEnvelope />
            <div className="contact-info">
              <strong>Email Administrator</strong>
              <span>accounts@apaer.ac.rw</span>
            </div>
          </button>
          <button 
            className="contact-btn phone-btn"
            onClick={() => handleContact('phone')}
          >
            <FaPhone />
            <div className="contact-info">
              <strong>Call Administrator</strong>
              <span>+250 788 123 456</span>
            </div>
          </button>
        </div>
      </div>
      
      <div className="confirmation-actions">
        <button 
          className="modern-btn secondary-btn"
          onClick={prevStep}
        >
          <FaArrowLeft />
          <span>Make Another Payment</span>
        </button>
      </div>
    </div>
  );
};

export default Payment;