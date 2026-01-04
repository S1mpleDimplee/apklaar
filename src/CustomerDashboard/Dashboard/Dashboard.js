import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import apiCall from '../../Calls/calls';
import { useNavigate } from 'react-router-dom';
import CreateAppointment from '../CreateAppointment/Createappointment';

const DashboardKlant = () => {
  const [notifications, setNotifications] = useState([{}]);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [lastAPKKeuringData, setLastAPKKeuringData] = useState([]);
  const [upcomingAPKKeuringData, setUpcomingAPKKeuringData] = useState([]);
  const [openInvoices, setOpenInvoices] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    fetchDashboardInfo();
  }, []);

  const fetchNotifications = async () => {
    const userid = JSON.parse(localStorage.getItem('userdata')).userid;
    const response = await apiCall('getNotifications', { userid });
    if (response.isSuccess) {
      setNotifications(response.data);

    }
  };

  const fetchDashboardInfo = async () => {
    const userid = JSON.parse(localStorage.getItem('userdata')).userid;
    const response = await apiCall('fetchcustomerdashboard', { userid });
    if (response.isSuccess) {
      setOpenInvoices(response.data.openInvoices);
      setLastAPKKeuringData([response.data.lastAPKCarDate, response.data.lastAPKCarName]);
      setUpcomingAPKKeuringData([response.data.upcomingAPKCarDate, response.data.upcomingAPKCarName]);
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
            <p>{lastAPKKeuringData[0] != null ? `Uw vorige APK keuring was op ${lastAPKKeuringData[0]} voor uw "${lastAPKKeuringData[1]}"` : "U heeft nog geen vorige APK keuring"}</p>
          </div>

          <div className="stat-card yellow">
            <h3>Volgende APK Keuring</h3>
            <p>{upcomingAPKKeuringData[0] != null ? `Uw volgende APK keuring moet worden gedaan op ${upcomingAPKKeuringData[0]} voor uw "${upcomingAPKKeuringData[1]}"` : "U heeft nog geen volgende APK keuring gepland"}</p>
          </div>

          <div className="stat-card dark-blue">
            <h3>{openInvoices} open factuur(en)</h3>
            <p>Momenteel heeft u {openInvoices} factuur(en) open staan, u kunt open facturen bekijken en betalen via de <a onClick={() => navigate("facturen")} className='dashboard-link'>Facturen</a> pagina.</p>
          </div>
        </div>

        <div className="content-grid">
          <div className="content-section">
            <h2>Meldingen</h2>

            <div className="notification-item">
              {notifications.slice(0, 4).map((notification) => (
                <div key={notification.id} className="dashboard-notification-card">
                  <div className="dashboard-notification-content">
                    <div className="dashboard-notification-title-row">
                      <h3 className="dashboard-notification-title">{notification.title}</h3>
                      <span className="dashboard-notification-timestamp">{notification.date}</span>
                    </div>
                    <p className="dashboard-notification-message">{notification.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="end-of-list">Meeste 4 recente meldingen, <a onClick={() => navigate("berichten")} className='dashboard-link'>Bekijk alle meldingen</a></p>


          </div>
          <div className="content-section">
            <h2>Volgende APK Keuring</h2>
            <div className="empty-content">

              <p>U heeft nog geen APK keuringen ingepland. Plan nu uw volgende APK keuring om uw voertuig in topconditie te houden!</p>
              <button className="plan-apk-button"
                onClick={() => setShowAppointmentModal(true)}>Plan APK Keuring</button>
            </div>
          </div>
        </div>
      </div>
      {showAppointmentModal && (
        <CreateAppointment
          onClose={() => setShowAppointmentModal(false)}
        />
      )}
    </div>
  );
};

export default DashboardKlant;