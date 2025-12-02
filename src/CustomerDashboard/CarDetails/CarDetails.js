import React from 'react';
import './CarDetails.css';

const CarDetails = () => {
  return (
    <div className="car-details-container">
      {/* Header */}
      <div className="car-header">
        <div className="car-breadcrumb">
          <span>Dashboard</span>
          <span className="car-separator">/</span>
          <span>Mijn auto(s)</span>
        </div>
        
        <div className="car-user-info">
          <div className="car-user-avatar"></div>
          <span className="car-user-name">Edward robinson</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="car-main-content">
        {/* Car Tabs */}
        <div className="car-tabs">
          <div className="car-tab active">Toyota starlet</div>
          <div className="car-tab">Audi R8</div>
          <div className="car-tab">Auto 3</div>
        </div>

        {/* Car Content Grid */}
        <div className="car-content-grid">
          {/* Left Side - Car Image and Details */}
          <div className="car-left-section">
            <div className="car-image-container">
              <img 
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop&auto=format"
                alt="Toyota Starlet 1999"
                className="car-image"
              />
            </div>
            
            {/* Car Details Table */}
            <div className="car-details-table">
              <div className="car-detail-row">
                <span className="car-detail-label">Merk</span>
                <span className="car-detail-value">Toyota</span>
              </div>
              <div className="car-detail-row">
                <span className="car-detail-label">Model</span>
                <span className="car-detail-value">STARLET</span>
              </div>
              <div className="car-detail-row">
                <span className="car-detail-label">Bouw jaar</span>
                <span className="car-detail-value">1999</span>
              </div>
              <div className="car-detail-row">
                <span className="car-detail-label">Kenteken</span>
                <span className="car-detail-value">STARLET</span>
              </div>
              <div className="car-detail-row">
                <span className="car-detail-label">Laatste keuring</span>
                <span className="car-detail-value">19-11-2024</span>
              </div>
              <div className="car-detail-row">
                <span className="car-detail-label">Geregistreerd sinds</span>
                <span className="car-detail-value">11-10-2024</span>
              </div>
            </div>
            
            <button className="car-modify-btn">Informatie wijzigen</button>
          </div>

          {/* Right Side - Car Info */}
          <div className="car-right-section">
            <div className="car-info-card">
              <div className="car-logo">
                <div className="car-logo-icon">🌐</div>
                <span className="car-logo-text">Boeing 747</span>
              </div>
              
              <h2 className="car-title">Toyota starlet 1999</h2>
              <p className="car-subtitle">Blauw | 1.3L | Benzine | blah | blah</p>
            </div>
            
            <div className="car-register-prompt">
              <span>Wilt u nog een auto registeren? </span>
              <a href="#" className="car-register-link">klik hier</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;