import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="login-title">Login Page</h1>
        <div className="login-card">
          <h2 className="sign-in-title">Sign in</h2>
          
          <div className="input-group">
            <input type="text" placeholder="Username" className="login-input" />
            <input type="password" placeholder="Password" className="login-input" />
          </div>

          <button className="sign-in-button">SIGN IN</button>

          <div className="social-login">
            <button className="social-button google">
              <FaGoogle />
            </button>
            <button className="social-button facebook">
              <FaFacebook />
            </button>
          </div>

          <div className="login-links">
            <a href="/register" className="create-account">Create new account</a>
            <a href="/forgot-password" className="forgot-password">Forgot password?</a>
          </div>
        </div>
      </div>
      
      <div className="login-right">
        <div className="welcome-text">
          <h2>Welcome to the site</h2>
          <div className="rasar-logo">RASAR</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
