import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // سيتم إضافة منطق إعادة تعيين كلمة المرور هنا
    setMessage('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-left">
        <h1 className="forgot-password-title">Reset Password</h1>
        <div className="forgot-password-card">
          <h2 className="reset-title">Forgot Password?</h2>
          <p className="reset-description">
            Enter your email address and we'll send you a link to reset your password
          </p>
          
          <form onSubmit={handleSubmit} className="reset-form">
            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                className="reset-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="reset-button">SEND RESET LINK</button>

            {message && <div className="success-message">{message}</div>}

            <div className="reset-links">
              <Link to="/login" className="back-to-login">Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
      
      <div className="forgot-password-right">
        <div className="welcome-text">
          <h2>Password Recovery</h2>
          <p>We'll help you get back to your account</p>
          <div className="rasar-logo">RASAR</div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
