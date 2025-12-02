import React from 'react';
import './Dashboard.css';

const DashboardKlant = () => {
  return (
    <div className="dashboard-container">
      {/* Main Content */}
      <div className="main-content">
       

        <div className="stats-grid">
          <div className="stat-card blue">
            <h3>Auto status</h3>
            <p>Auto status</p>
          </div>
          
          <div className="stat-card green">
            <h3>Laatste APK Keuring</h3>
            <p>Uw vorige APK keuring was op 11 Maart 2025</p>
          </div>
          
          <div className="stat-card yellow">
            <h3>Volgende APK Keuring</h3>
            <p>Uw volgende APK keuring moet worden gedaan op 10 augustus 2025</p>
          </div>
          
          <div className="stat-card dark-blue">
            <h3>1 open factuur(en)</h3>
            <p>Momenteel heeft u 1 factuur open staan betaal dit via "Facturen"</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Meldingen Section */}
          <div className="content-section">
            <h2>Meldingen</h2>
            
            <div className="notification-item">
              <div className="notification-content">
                <h4>Nieuwe factuur</h4>
                <p>Er is een nieuwe factuur van 24-12-2025 met het bedrag van €120,21</p>
              </div>
              <div className="notification-time">21-12-2025 12:00</div>
            </div>
            
            <div className="notification-item">
              <div className="notification-content">
                <h4>Afspraak bevestigd</h4>
                <p>Uw afspraak van 24-12-2025 om 12:00 is bevestigd</p>
              </div>
              <div className="notification-time">21-12-2025 12:00</div>
            </div>
            
            <div className="notification-item">
              <div className="notification-content">
                <h4>Wachtwoord gewijzigd</h4>
                <p>Uw wachtwoord is gewijzigd, bent u dit niet? neem direct contact met ons op</p>
              </div>
              <div className="notification-time">21-12-2025 12:00</div>
            </div>
          </div>

          {/* Volgende APK Keuring Section */}
          <div className="content-section">
            <h2>Volgende APK Keuring</h2>
            <div className="empty-content">
              {/* This section appears to be empty in the design */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardKlant;