import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('كلمات المرور غير متطابقة');
      return;
    }
    // سيتم إضافة منطق إعادة تعيين كلمة المرور هنا
    setMessage('تم تغيير كلمة المرور بنجاح');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-left">
        <h1 className="reset-password-title">Reset Password</h1>
        <div className="reset-password-card">
          <h2 className="reset-title">Set New Password</h2>
          <p className="reset-description">
            Enter your new password below
          </p>
          
          <form onSubmit={handleSubmit} className="reset-form">
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="New Password"
                className="reset-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                className="reset-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="reset-button">RESET PASSWORD</button>

            {message && (
              <div className={`message ${message.includes('نجاح') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <div className="reset-links">
              <Link to="/login" className="back-to-login">Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
      
      <div className="reset-password-right">
        <div className="welcome-text">
          <h2>Password Reset</h2>
          <p>Create a strong new password</p>
          <div className="rasar-logo">RASAR</div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
