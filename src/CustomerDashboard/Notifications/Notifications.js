import React, { useState } from 'react';
import './Notifications.css';

const CustomerNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Nieuwe factuur',
      message: 'Er is een nieuwe factuur van 24-12-2025 met het bedrag van €120,21',
      timestamp: '21-12-2025 12:00',
      type: 'invoice'
    },
    {
      id: 2,
      title: 'Afspraak bevestigd',
      message: 'Uw afspraak van 24-12-2025 om 12:00 is bevestigd',
      timestamp: '21-12-2025 12:00',
      type: 'appointment'
    },
    {
      id: 3,
      title: 'Wachtwoord gewijzigd',
      message: 'Uw wachtwoord is gewijzigd, bent u dit niet? neem direct contact met ons op',
      timestamp: '21-12-2025 12:00',
      type: 'security'
    },
    {
      id: 4,
      title: 'Welkom',
      message: 'Welkom bij APKlaar wij hopen u goed van dienst te zijn',
      timestamp: '21-12-2025 12:00',
      type: 'welcome'
    }
  ]);

  return (
    <div className="notifications-main-content">
      <div className="notifications-content-area">
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-card">
              <div className="notification-content">
                <div className="notification-title-row">
                  <h3 className="notification-title">{notification.title}</h3>
                  <span className="notification-timestamp">{notification.timestamp}</span>
                </div>
                <p className="notification-message">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerNotifications;