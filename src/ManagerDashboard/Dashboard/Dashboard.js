import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const ManagerDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);


  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('http://localhost/apklaarAPI/router/router.php', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        function: 'fetchmanagerdashboard',
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch('http://localhost/apklaarAPI/router/router.php', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ function: 'getAllAppointments' }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Only scheduled appointments
          const scheduled = data.data.filter(a => a.status === 'scheduled');
          setAppointments(scheduled);
        }
      })
      .catch(err => console.error(err));
  }, []);


  // Sample dashboard data for manager
  const dashboardData = {
    apkSuccessRate: {
      percentage: 89,
      description: 'APK Slagingspercentage'
    },
    revenueToday: {
      amount: '€2,847',
      target: '€3,200',
      percentage: 89
    },
    bridgeStatus: [
      { id: 1, status: 'occupied', mechanic: 'Jan Bakker', task: 'APK Toyota', timeLeft: '15 min' },
      { id: 2, status: 'occupied', mechanic: 'Piet Smit', task: 'Reparatie BMW', timeLeft: '45 min' },
      { id: 3, status: 'maintenance', mechanic: '-', task: 'Onderhoud gepland', timeLeft: '2u' },
      { id: 4, status: 'occupied', mechanic: 'Lisa Vermeer', task: 'Onderhoud VW', timeLeft: '30 min' },
      { id: 5, status: 'occupied', mechanic: 'Mark de Vries', task: 'APK Audi', timeLeft: '20 min' },
      { id: 6, status: 'available', mechanic: 'Sandra Bos', task: 'Beschikbaar', timeLeft: '-' }
    ]
  };

  const formatDateTime = (date, time) => {
    const dt = new Date(`${date}T${time}`);
    return dt.toLocaleString('nl-NL', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#666';
    }
  };

  return (
    <div className="manager-dashboard-container">
      {/* Header */}
      <div className="manager-dashboard-header">
        <div className="manager-dashboard-breadcrumb">
          <span>Home</span>
          <span className="manager-dashboard-separator">/</span>
          <span>Dashboard</span>
        </div>

        <div className="manager-dashboard-user-info">
          <div className="manager-dashboard-user-avatar"></div>
          <span className="manager-dashboard-user-name">Edward robinson</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="manager-dashboard-main-content">
        {/* Stats Cards */}
        <div className="manager-dashboard-stats-grid">
          <div className="manager-dashboard-stat-card appointments">
            <div className="manager-dashboard-stat-number">
              {stats ? stats.appointmentsToday.scheduled : '-'}
            </div>

            <div className="manager-dashboard-stat-label">
              Afspraken geplant
            </div>

            <div className="manager-dashboard-stat-subtitle">
              {stats ? `${stats.appointmentsToday.total} total` : 'Loading...'}
            </div>
          </div>


          <div className="manager-dashboard-stat-card mechanics">
            <div className="manager-dashboard-stat-number">
              {stats ? stats.mechanics : '-'}
            </div>
            <div className="manager-dashboard-stat-label">Monteurs aanwezig</div>
            <div className="manager-dashboard-stat-subtitle">in de garage</div>
          </div>

          <div className="manager-dashboard-stat-card customers">
            <div className="manager-dashboard-stat-number">
              {stats ? stats.customers : '-'}
            </div>
            <div className="manager-dashboard-stat-label">Huidige klanten</div>
            <div className="manager-dashboard-stat-subtitle">aangemeld op de website</div>
          </div>


          <div className="manager-dashboard-stat-card success-rate">
            <div className="manager-dashboard-stat-number">{dashboardData.apkSuccessRate.percentage}%</div>
            <div className="manager-dashboard-stat-label">APK</div>
            <div className="manager-dashboard-stat-subtitle">Slagingspercentage</div>
          </div>
        </div>

        {/* Additional Manager Stats */}
        <div className="manager-dashboard-additional-stats">
          <div className="manager-dashboard-revenue-card">
            <div className="manager-dashboard-revenue-info">
              <span className="manager-dashboard-revenue-label">Omzet vandaag</span>
              <span className="manager-dashboard-revenue-amount">
                {stats && typeof stats.revenueToday === 'number'
                  ? `€${stats.revenueToday.toFixed(2)}`
                  : '€0.00'}
              </span>

              <span className="manager-dashboard-revenue-target">
                Doel: {dashboardData.revenueToday.target}
              </span>
            </div>

            <div className="manager-dashboard-revenue-progress">
              <div
                className="manager-dashboard-revenue-progress-fill"
                style={{
                  width: stats && typeof stats.revenueToday === 'number'
                    ? `${Math.min(
                      (stats.revenueToday /
                        Number(dashboardData.revenueToday.target.replace(/[^0-9.-]+/g, ''))) *
                      100,
                      100
                    )}%`
                    : '0%',
                }}
              ></div>
            </div>
          </div>

          <div className="manager-dashboard-time-card">
            <span className="manager-dashboard-time-label">Huidige tijd</span>
            <span className="manager-dashboard-time-value">{formatTime(currentTime)}</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="manager-dashboard-content-grid">
          {/* Today's Staff Overview */}
          {/* Today's Appointments */}
          {/* Today's Appointments */}
          <div className="manager-dashboard-content-section">
            <h2 className="manager-dashboard-section-title">Afspraken vandaag</h2>
            <div className="manager-dashboard-staff-list">
              {appointments.length > 0 ? (
                appointments.map((appt) => {
                  // Parse the note field
                  const repairs = JSON.parse(appt.note);
                  return (
                    <div key={appt.aid} className="manager-dashboard-staff-item">
                      <div className="manager-dashboard-staff-info">
                        {/* Customer name */}
                        <div className="manager-dashboard-staff-name">
                          {appt.customer_firstname} {appt.customer_lastname}
                        </div>

                        {/* Date and Time */}
                        <div className="manager-dashboard-staff-status">
                          {new Date(`${appt.date}T${appt.time}`).toLocaleString('nl-NL', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>

                        {/* List of repairation types */}
                        <div className="manager-dashboard-staff-appointments">
                          {repairs.map((r) => (
                            <div key={r.id}>{r.repairationType}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Geen geplande afspraken vandaag.</p>
              )}
            </div>
          </div>



          {/* Bridge Status & Issues */}
          <div className="manager-dashboard-content-section">
            <h2 className="manager-dashboard-section-title">Brug Status</h2>

            {/* Bridge Status */}
            <div className="manager-dashboard-bridges-section">
              <h3 className="manager-dashboard-subsection-title">Bruggen overzicht</h3>
              <div className="manager-dashboard-bridges-grid">
                {dashboardData.bridgeStatus.map((bridge) => (
                  <div key={bridge.id} className={`manager-dashboard-bridge-item ${bridge.status}`}>
                    <div className="manager-dashboard-bridge-number">Brug {bridge.id}</div>
                    <div className="manager-dashboard-bridge-info">
                      <div className="manager-dashboard-bridge-task">{bridge.task}</div>
                      {bridge.mechanic !== '-' && (
                        <div className="manager-dashboard-bridge-mechanic">{bridge.mechanic}</div>
                      )}
                      <div className="manager-dashboard-bridge-time">{bridge.timeLeft}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;