import React from 'react';
import { Link } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2>Reset Password</h2>
        <p>Enter your new password below.</p>
        
        <div className="input-group">
          <input type="password" placeholder="New password" className="reset-password-input" />
          <input type="password" placeholder="Confirm new password" className="reset-password-input" />
        </div>

        <button className="reset-button">Reset Password</button>

        <div className="reset-password-links">
          <Link to="/login" className="back-to-login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
