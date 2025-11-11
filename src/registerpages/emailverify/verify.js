import React, { useState } from 'react';
import './verify.css';

const Verify = ({ email = "Emailadress@gmail.com" }) => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleCodeChange = (e) => {
    // Only allow numbers and format as XX-XX-XX
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 6) {
      // Format as XX-XX-XX
      if (value.length > 2 && value.length <= 4) {
        value = value.slice(0, 2) + '-' + value.slice(2);
      } else if (value.length > 4) {
        value = value.slice(0, 2) + '-' + value.slice(2, 4) + '-' + value.slice(4);
      }
      setVerificationCode(value);
    }
  };

  const handleSubmit = () => {
    // Handle verification logic here
    console.log('Verification code:', verificationCode.replace(/-/g, ''));
    // You can add your verification logic here
  };

  const handleResendCode = () => {
    // Handle resend code logic
    console.log('Resending verification code to:', email);
  };

  return (
    <div className="verification-page">
      <div className="verification-container">
        <div className="verification-card">
          <h2 className="verification-title">Nog een stap</h2>
          <div className="title-underline"></div>
          
          <div className="verification-content">
            <p className="verification-message">
              Er is een 6-cijferige code gestuurd naar
            </p>
            <p className="email-address">{email}</p>
            
            <div className="code-input-container">
              <input
                type="text"
                value={verificationCode}
                onChange={handleCodeChange}
                placeholder="67-02-12"
                className="code-input"
                maxLength="8" // XX-XX-XX format
              />
            </div>

            <button onClick={handleSubmit} className="verify-button">
              Inloggen
            </button>

            <div className="verification-footer">
              <p className="resend-text">Geen code ontvangen?</p>
              <button onClick={handleResendCode} className="resend-button">
                Code opnieuw versturen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;