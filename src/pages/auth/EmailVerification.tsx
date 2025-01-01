import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EmailVerification.css';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // محاكاة عملية التحقق
    setTimeout(() => {
      setStatus('success');
      setMessage('تم التحقق من بريدك الإلكتروني بنجاح!');
    }, 2000);
  }, [token]);

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="email-verification-container">
      <div className="email-verification-card">
        <div className="verification-content">
          <div className="rasar-logo">RASAR</div>
          
          {status === 'loading' && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>جاري التحقق من بريدك الإلكتروني...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h2>تم التحقق بنجاح!</h2>
              <p>{message}</p>
              <button onClick={handleContinue} className="continue-button">
                متابعة إلى تسجيل الدخول
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="error-message">
              <div className="error-icon">✕</div>
              <h2>حدث خطأ</h2>
              <p>{message}</p>
              <button onClick={() => navigate('/login')} className="retry-button">
                العودة إلى تسجيل الدخول
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
