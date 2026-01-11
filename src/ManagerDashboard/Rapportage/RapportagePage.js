import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const RapportagePage = () => {
  const [earningsData, setEarningsData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('weekly'); // weekly, monthly, yearly
  const [stats, setStats] = useState(null);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch earnings data from backend
  useEffect(() => {
    fetch('http://localhost/apklaarAPI/router/router.php', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ function: 'getEarnings', period: selectedPeriod }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setEarningsData(data.data);
      })
      .catch(err => console.error(err));
  }, [selectedPeriod]);

  // Optional: fetch summary stats for cards
  useEffect(() => {
    fetch('http://localhost/apklaarAPI/router/router.php', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ function: 'fetchmanagerdashboard' }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setStats(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="manager-dashboard-container">
      {/* Header */}
      <div className="manager-dashboard-header">
        <div className="manager-dashboard-breadcrumb">
          <span>Home</span>
          <span className="manager-dashboard-separator">/</span>
          <span>Rapportage</span>
        </div>
        <div className="manager-dashboard-user-info">
          <div className="manager-dashboard-user-avatar"></div>
          <span className="manager-dashboard-user-name">Edward Robinson</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="manager-dashboard-main-content">
        {/* Stats Cards */}
        <div className="manager-dashboard-stats-grid">
          <div className="manager-dashboard-stat-card revenue">
            <div className="manager-dashboard-stat-number">
              {stats ? `€${stats.revenueToday.toFixed(2)}` : '-'}
            </div>
            <div className="manager-dashboard-stat-label">Omzet vandaag</div>
            <div className="manager-dashboard-stat-subtitle">
              {stats ? `Doel: €${stats.revenueTodayTarget}` : 'Loading...'}
            </div>
          </div>

          <div className="manager-dashboard-stat-card revenue">
            <div className="manager-dashboard-stat-number">
              {stats ? `€${stats.revenueWeek.toFixed(2)}` : '-'}
            </div>
            <div className="manager-dashboard-stat-label">Omzet deze week</div>
            <div className="manager-dashboard-stat-subtitle">Van maandag tot vandaag</div>
          </div>

          <div className="manager-dashboard-stat-card revenue">
            <div className="manager-dashboard-stat-number">
              {stats ? `€${stats.revenueMonth.toFixed(2)}` : '-'}
            </div>
            <div className="manager-dashboard-stat-label">Omzet deze maand</div>
            <div className="manager-dashboard-stat-subtitle">Van 1 tot nu</div>
          </div>

          <div className="manager-dashboard-stat-card revenue">
            <div className="manager-dashboard-stat-number">
              {stats ? `€${stats.revenueYear.toFixed(2)}` : '-'}
            </div>
            <div className="manager-dashboard-stat-label">Omzet dit jaar</div>
            <div className="manager-dashboard-stat-subtitle">Januari tot vandaag</div>
          </div>
        </div>

        {/* Period Selector */}
        <div className="manager-dashboard-additional-stats" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['weekly', 'monthly', 'yearly'].map(period => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: selectedPeriod === period ? '#2196f3' : '#e0e0e0',
                  color: selectedPeriod === period ? 'white' : '#333',
                  cursor: 'pointer'
                }}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Graph */}
        <div className="manager-dashboard-content-section">
          <h2 className="manager-dashboard-section-title">Omzet overzicht ({selectedPeriod})</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#2196f3" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RapportagePage;
