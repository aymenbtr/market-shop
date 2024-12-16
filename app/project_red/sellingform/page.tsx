"use client";
import React from 'react';

const InfoForm = () => {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const contentStyle = {
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '30px',
    padding: '4rem',
    width: '100%',
    maxWidth: '900px',
    textAlign: 'center',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
    color: '#fff',
  };

  const welcomeTextStyle = {
    marginBottom: '4rem', // Increased spacing
    animation: 'fadeIn 0.8s ease-out', // Added animation
  };

  const headingStyle = {
    color: '#fff',
    fontSize: '3.2rem', // Increased size
    marginBottom: '1.5rem', // Increased spacing
    fontWeight: '700', // Made bolder
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Enhanced shadow
    letterSpacing: '0.5px', // Added letter spacing
    lineHeight: '1.2', // Improved line height
    position: 'relative',
    display: 'inline-block',
    padding: '0 1rem',
  };

  const subtitleStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.3rem', // Slightly increased
    lineHeight: '1.6',
    maxWidth: '700px', // Increased max-width
    margin: '0 auto',
    fontWeight: '300', // Made lighter for contrast with title
  };

  // Rest of the styles remain the same
  const buttonsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '4rem',
    flexWrap: 'wrap',
    position: 'relative',
    marginTop: '2rem', // Added margin top
  };

  const buttonGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  };

  const arrowTextStyle = {
    color: '#fff',
    fontSize: '0.9rem',
    marginTop: '1rem',
    opacity: 0,
    transform: 'translateY(-10px)',
    transition: 'all 0.3s ease',
  };

  const arrowStyle = {
    width: '20px',
    height: '20px',
    border: 'solid #fff',
    borderWidth: '0 2px 2px 0',
    transform: 'rotate(45deg)',
    marginTop: '0.5rem',
    opacity: 0,
    transition: 'all 0.3s ease',
  };

  const buttonStyle = {
    padding: '1rem 3rem',
    fontSize: '1.1rem',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    fontWeight: '500',
    minWidth: '200px',
    position: 'relative',
    overflow: 'hidden',
  };

  const loginStyle = {
    background: '#fff',
    color: '#764ba2',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  };

  const signupStyle = {
    background: 'transparent',
    border: '2px solid #fff',
    color: '#fff',
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div style={contentStyle}>
        <div style={welcomeTextStyle}>
          <h1 style={headingStyle}>Welcome to Our Market-Zone Regestration Form</h1>
          <p style={subtitleStyle}>
            Join our community and discover amazing features. Buy or Sell everything you want!
          </p>
        </div>
        <div style={buttonsContainerStyle}>
          <div style={buttonGroupStyle} onMouseEnter={(e) => {
            e.currentTarget.querySelector('.arrow-text').style.opacity = '1';
            e.currentTarget.querySelector('.arrow').style.opacity = '1';
            e.currentTarget.querySelector('.arrow-text').style.transform = 'translateY(0)';
          }} onMouseLeave={(e) => {
            e.currentTarget.querySelector('.arrow-text').style.opacity = '0';
            e.currentTarget.querySelector('.arrow').style.opacity = '0';
            e.currentTarget.querySelector('.arrow-text').style.transform = 'translateY(-10px)';
          }}>
            <a href="loginform" style={{ ...buttonStyle, ...loginStyle }}>Log In</a>
            <div className="arrow-text" style={arrowTextStyle}>Want to sell? Continue from here</div>
            <div className="arrow" style={arrowStyle}></div>
          </div>
          <div style={buttonGroupStyle} onMouseEnter={(e) => {
            e.currentTarget.querySelector('.arrow-text').style.opacity = '1';
            e.currentTarget.querySelector('.arrow').style.opacity = '1';
            e.currentTarget.querySelector('.arrow-text').style.transform = 'translateY(0)';
          }} onMouseLeave={(e) => {
            e.currentTarget.querySelector('.arrow-text').style.opacity = '0';
            e.currentTarget.querySelector('.arrow').style.opacity = '0';
            e.currentTarget.querySelector('.arrow-text').style.transform = 'translateY(-10px)';
          }}>
            <a href="#" style={{ ...buttonStyle, ...signupStyle }}>Sign Up</a>
            <div className="arrow-text" style={arrowTextStyle}>New here? Sign in from here</div>
            <div className="arrow" style={arrowStyle}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoForm;