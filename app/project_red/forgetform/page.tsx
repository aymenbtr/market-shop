"use client";
import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [method, setMethod] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/api/users', {
        [method]: identifier,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundEffectStyle}></div>
      <div style={cardStyle}>
        <div style={cardHeaderStyle}>
          <div style={logoStyle}>🌟</div>
          <h2 style={headingStyle}>Welcome!</h2>
          <p style={subheadingStyle}>Choose your preferred verification method</p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          <ul style={methodListStyle}>
            <li style={listItemContainerStyle}>
              <input
                type="radio"
                id="email"
                name="method"
                value="email"
                checked={method === 'email'}
                onChange={() => setMethod('email')}
                style={radioStyle}
              />
              <label htmlFor="email" style={{
                ...methodLabelStyle,
                borderColor: method === 'email' ? '#6366f1' : '#e0e0e0',
                backgroundColor: method === 'email' ? 'rgba(99, 102, 241, 0.1)' : 'white'
              }}>
                <div style={methodIconContainerStyle}>
                  <span style={methodIconStyle}>✉️</span>
                </div>
                <div style={methodTextContainerStyle}>
                  <span style={methodTitleStyle}>Email Verification</span>
                  <span style={methodDescStyle}>Secure verification via email</span>
                </div>
                <div style={checkmarkStyle(method === 'email')}>✓</div>
              </label>
            </li>
            <li style={listItemContainerStyle}>
              <input
                type="radio"
                id="phone"
                name="method"
                value="phone"
                checked={method === 'phone'}
                onChange={() => setMethod('phone')}
                style={radioStyle}
              />
              <label htmlFor="phone" style={{
                ...methodLabelStyle,
                borderColor: method === 'phone' ? '#6366f1' : '#e0e0e0',
                backgroundColor: method === 'phone' ? 'rgba(99, 102, 241, 0.1)' : 'white'
              }}>
                <div style={methodIconContainerStyle}>
                  <span style={methodIconStyle}>📱</span>
                </div>
                <div style={methodTextContainerStyle}>
                  <span style={methodTitleStyle}>Phone Verification</span>
                  <span style={methodDescStyle}>Quick SMS verification</span>
                </div>
                <div style={checkmarkStyle(method === 'phone')}>✓</div>
              </label>
            </li>
          </ul>

          {method && (
            <div style={inputWrapperStyle}>
              <div style={inputContainerStyle}>
                <label style={labelStyle} htmlFor="identifier">
                  {method === 'email' ? 'Your Email Address' : 'Your Phone Number'}
                </label>
                <input
                  type={method === 'email' ? 'email' : 'tel'}
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  style={inputStyle}
                  placeholder={method === 'email' ? 'john@example.com' : '+1 (234) 567-8900'}
                />
              </div>
            </div>
          )}
          
          <button 
            type="submit" 
            style={{
              ...buttonStyle,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'wait' : 'pointer'
            }}
            disabled={isLoading}
          >
            <span style={buttonTextStyle}>
              {isLoading ? 'Processing...' : 'Continue'}
            </span>
            {!isLoading && <span style={buttonIconStyle}>→</span>}
          </button>
          
          {message && <div style={messageStyle}>{message}</div>}
        </form>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '20px',
  position: 'relative',
  overflow: 'hidden',
};

const backgroundEffectStyle = {
  position: 'absolute',
  top: '-50%',
  left: '-50%',
  width: '200%',
  height: '200%',
  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
  animation: 'rotate 20s linear infinite',
};

const cardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  borderRadius: '30px',
  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)',
  width: '100%',
  maxWidth: '560px',
  padding: '40px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s ease',
  ':hover': {
    transform: 'translateY(-5px)',
  },
};

const cardHeaderStyle = {
  textAlign: 'center',
  marginBottom: '40px',
};

const logoStyle = {
  fontSize: '40px',
  marginBottom: '20px',
  animation: 'bounce 2s infinite',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
};

const headingStyle = {
  margin: '0',
  color: '#1a1a1a',
  fontSize: '36px',
  fontWeight: '800',
  marginBottom: '12px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const subheadingStyle = {
  margin: '0',
  color: '#666',
  fontSize: '18px',
  fontWeight: '500',
};

const methodListStyle = {
  listStyle: 'none',
  padding: '0',
  margin: '0',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const listItemContainerStyle = {
  position: 'relative',
};

const methodLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '24px',
  border: '2px solid',
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
};

const methodIconContainerStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: 'rgba(99, 102, 241, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '20px',
};

const methodIconStyle = {
  fontSize: '24px',
};

const methodTextContainerStyle = {
  flex: 1,
};

const methodTitleStyle = {
  display: 'block',
  fontSize: '18px',
  fontWeight: '600',
  color: '#1a1a1a',
  marginBottom: '4px',
};

const methodDescStyle = {
  display: 'block',
  fontSize: '14px',
  color: '#666',
};

const checkmarkStyle = (isSelected) => ({
  opacity: isSelected ? 1 : 0,
  color: '#6366f1',
  fontSize: '24px',
  transition: 'all 0.3s ease',
});

const inputWrapperStyle = {
  animation: 'slideDown 0.3s ease',
};

const inputContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const labelStyle = {
  color: '#4a4a4a',
  fontSize: '15px',
  fontWeight: '600',
  marginBottom: '8px',
};

const inputStyle = {
  padding: '18px',
  border: '2px solid #e0e0e0',
  borderRadius: '16px',
  fontSize: '16px',
  transition: 'all 0.3s ease',
  outline: 'none',
  ':focus': {
    borderColor: '#6366f1',
    boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.1)',
  },
};

const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  padding: '18px',
  backgroundColor: '#6366f1',
  color: 'white',
  border: 'none',
  borderRadius: '16px',
  fontSize: '18px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
  ':hover': {
    backgroundColor: '#4f46e5',
    transform: 'translateY(-2px)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
};

const buttonTextStyle = {
  fontSize: '18px',
  position: 'relative',
  zIndex: 1,
};

const buttonIconStyle = {
  fontSize: '20px',
  position: 'relative',
  zIndex: 1,
};

const messageStyle = {
  textAlign: 'center',
  fontSize: '15px',
  padding: '16px',
  margin: '0',
  borderRadius: '16px',
  backgroundColor: '#fff',
  border: '2px solid #e0e0e0',
  color: '#4a4a4a',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  animation: 'slideUp 0.3s ease',
};

const radioStyle = {
  position: 'absolute',
  opacity: '0',
  cursor: 'pointer',
};

export default UserForm;