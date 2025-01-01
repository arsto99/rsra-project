import React, { useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // سيتم إضافة منطق التسجيل هنا
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h1 className="register-title">Register Page</h1>
        <div className="register-card">
          <h2 className="sign-up-title">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="register-input"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="register-input"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="register-input"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="register-input"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="sign-up-button">CREATE ACCOUNT</button>

            <div className="social-register">
              <p className="or-divider">Or register with</p>
              <div className="social-buttons">
                <button type="button" className="social-button google">
                  <FaGoogle />
                </button>
                <button type="button" className="social-button facebook">
                  <FaFacebook />
                </button>
              </div>
            </div>

            <div className="register-links">
              <p>Already have an account? <a href="/login">Sign in</a></p>
            </div>
          </form>
        </div>
      </div>
      
      <div className="register-right">
        <div className="welcome-text">
          <h2>Join RASAR Today</h2>
          <p>Create your account and start your journey</p>
          <div className="rasar-logo">RASAR</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
