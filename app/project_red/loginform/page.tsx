"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const gradients = [
    'linear-gradient(135deg, #2193b0, #6dd5ed)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #0083B0, #00B4DB)',
    'linear-gradient(135deg, #4CA1AF, #2C3E50)',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % gradients.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/people', {
        email: emailOrUsername,
        password,
      });
      setMessage('Login successful!');
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server error');
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    console.log('Continuing to next page');
  };

  return (
    <div style={{ ...containerStyle, background: gradients[currentColorIndex] }}>
      <div style={backgroundStyle}></div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={logoStyle}>🔐</div>
        <h2 style={headingStyle}>Welcome Back!</h2>
        {!isSuccess ? (
          <>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="emailOrUsername">Email or Username</label>
              <input
                type="text"
                id="emailOrUsername"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
                style={inputStyle}
                placeholder="Enter your email or username"
              />
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="password">Password</label>
              <div style={passwordContainerStyle}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={passwordInputStyle}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={eyeButtonStyle}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle} htmlFor="confirmPassword">Confirm Password</label>
              <div style={passwordContainerStyle}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={passwordInputStyle}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={eyeButtonStyle}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
            <button type="submit" style={buttonStyle} disabled={isLoading}>
              {isLoading ? (
                <div style={spinnerStyle}></div>
              ) : (
                'LOGIN'
              )}
            </button>
          </>
        ) : (
          <div style={successContainerStyle}>
            <div style={successIconStyle}>✓</div>
            <h3 style={successMessageStyle}>Login Successful!</h3>
            <Link href='/project_red/buyform'>
            <button onClick={handleContinue} style={continueButtonStyle}>
              Continue
            </button>
            </Link>
            </div>
        )}
        {message && !isSuccess && <p style={messageStyle}>{message}</p>}
        <div style={forgotPasswordStyle}>
          <a href="forgetform" style={linkStyle}>Forgot your password?</a>
        </div>
      </form>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  transition: 'background 1.5s ease',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  padding: '20px',
};

const backgroundStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
};

const formStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  padding: '40px',
  borderRadius: '25px',
  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '500px',
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
};

const logoStyle = {
  fontSize: '60px',
  marginBottom: '30px',
  color: '#2193b0',
};

const headingStyle = {
  margin: '0 0 40px 0',
  color: '#2193b0',
  fontSize: '32px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '2px',
};

const inputContainerStyle = {
  marginBottom: '25px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '10px',
  color: '#2193b0',
  fontSize: '16px',
  fontWeight: '500',
  textAlign: 'left',
  letterSpacing: '1px',
};

const inputStyle = {
  width: '100%',
  padding: '15px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  border: '2px solid #2193b0',
  borderRadius: '15px',
  fontSize: '16px',
  color: '#333',
  transition: 'all 0.3s ease',
  outline: 'none',
  '&:focus': {
    borderColor: '#6dd5ed',
    boxShadow: '0 0 10px rgba(109, 213, 237, 0.2)',
  },
};

const passwordContainerStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
};

const passwordInputStyle = {
  ...inputStyle,
  paddingRight: '45px',
};

const eyeButtonStyle = {
  position: 'absolute',
  right: '10px',
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#2193b0',
};

const buttonStyle = {
  width: '100%',
  padding: '18px',
  backgroundColor: '#2193b0',
  color: 'white',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight: '600',
  letterSpacing: '2px',
  transition: 'all 0.3s ease',
  textTransform: 'uppercase',
  marginTop: '20px',
  boxShadow: '0 5px 15px rgba(33, 147, 176, 0.3)',
  '&:hover': {
    backgroundColor: '#6dd5ed',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(33, 147, 176, 0.4)',
  },
};

const spinnerStyle = {
  width: '25px',
  height: '25px',
  border: '4px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '50%',
  borderTopColor: 'white',
  animation: 'spin 1s ease-in-out infinite',
  margin: '0 auto',
};

const messageStyle = {
  marginTop: '20px',
  color: '#2193b0',
  fontSize: '16px',
  fontWeight: '500',
};

const forgotPasswordStyle = {
  marginTop: '25px',
};

const linkStyle = {
  color: '#2193b0',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#6dd5ed',
  },
};

const successContainerStyle = {
  textAlign: 'center',
  padding: '30px 0',
};

const successIconStyle = {
  width: '80px',
  height: '80px',
  backgroundColor: '#2193b0',
  borderRadius: '50%',
  color: 'white',
  fontSize: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 30px auto',
  animation: 'pulse 2s infinite',
};

const successMessageStyle = {
  color: '#2193b0',
  marginBottom: '30px',
  fontSize: '24px',
  fontWeight: '600',
  letterSpacing: '1px',
};

const continueButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#2193b0',
  '&:hover': {
    backgroundColor: '#6dd5ed',
  },
};

export default LoginForm;