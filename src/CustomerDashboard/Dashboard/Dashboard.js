import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import apiCall from '../../Calls/calls';

const DashboardKlant = () => {
  const [notifications, setNotifications] = useState([{}]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const userid = JSON.parse(localStorage.getItem('userdata')).userid;
    const response = await apiCall('getNotifications', { userid });
    if (response.isSuccess) {
      setNotifications(response.data);
    }
  };

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

        <div className="content-grid">
          <div className="content-section">
            <h2>Meldingen</h2>

            <div className="notification-item">
              {notifications.map((notification) => (
                <div key={notification.id} className="notification-card">
                  <div className="notification-content">
                    <div className="notification-title-row">
                      <h3 className="notification-title">{notification.title}</h3>
                      <span className="notification-timestamp">{notification.date}</span>
                    </div>
                    <p className="notification-message">{notification.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="end-of-list">Einde van de lijst</p>


          </div>
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