import React, { useState, useEffect } from 'react';
import './TimeTable.css';

const ManagerTimeTable = () => {
  const [filters, setFilters] = useState({
    nameFilter: '',
    serviceType: 'alle',
    mechanic: 'alle',
    status: 'alle',
    dateRange: 'deze-week'
  });

  const [weekData, setWeekData] = useState([]);
  const mechanics = ['alle', 'Jan Bakker', 'Piet Smit', 'Maria Jansen', 'Tom van Berg'];
  const serviceTypes = ['alle', 'APK-Keuring', 'Reparatie', 'Onderhoud', 'Motor olie'];
  const statusOptions = ['alle', 'bezet', 'beschikbaar', 'afgerond', 'geannuleerd'];

  // --- Helper: get next week number ---
  const getNextWeekNumber = () => {
    const today = new Date();
    const nextWeekDate = new Date(today);
    nextWeekDate.setDate(today.getDate() + 7);
    const weekNumber = getWeekNumber(nextWeekDate);
    const year = nextWeekDate.getFullYear();
    return { week: weekNumber, year };
  };

  // --- Helper: get week number from date ---
  const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  // --- Helper: get weekday dates for week ---
  const getWeekDates = (weekNumber, year) => {
    const simple = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    const dow = simple.getDay();
    const monday = new Date(simple);
    if (dow <= 4) monday.setDate(simple.getDate() - simple.getDay() + 1);
    else monday.setDate(simple.getDate() + 8 - simple.getDay());
    return Array.from({ length: 5 }).map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const bodyData = { function: 'getallappointments' };

        if (filters.dateRange === 'volgende-week') {
          const nextWeek = getNextWeekNumber();
          bodyData.function = 'getappointmentsforweek';
          bodyData.data = { week: nextWeek.week, year: nextWeek.year };
        }

        const res = await fetch('http://localhost/apklaarAPI/router/router.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(bodyData)
        });

        const json = await res.json();
        if (json.success) {
          // Map appointments to weekdays with dates
          const weekNum = filters.dateRange === 'volgende-week' ? getNextWeekNumber().week : getWeekNumber(new Date());
          const yearNum = filters.dateRange === 'volgende-week' ? getNextWeekNumber().year : new Date().getFullYear();
          setWeekData(mapAppointmentsToWeek(json.data, weekNum, yearNum));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAppointments();
  }, [filters.dateRange]);

  // --- Map appointments to weekdays ---
  const mapAppointmentsToWeek = (appointments, weekNum, yearNum) => {
    const days = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'];
    const weekDates = getWeekDates(weekNum, yearNum);

    const week = days.map((day, idx) => ({
      day,
      date: weekDates[idx].toLocaleDateString('nl-NL'),
      appointments: []
    }));

    appointments.forEach(a => {
      const dateObj = new Date(a.appointmentDate || a.date);
      const dayIndex = dateObj.getDay() - 1; // Monday = 0
      if (dayIndex >= 0 && dayIndex < 5) {
        week[dayIndex].appointments.push({
          id: a.aid,
          type: (() => {
            try {
              const repairs = JSON.parse(a.repairs || a.note);
              return repairs.length > 0 ? repairs[0].repairationType : 'Reparatie';
            } catch {
              return 'Reparatie';
            }
          })(),
          time: `${a.appointmentTime || a.time} (${a.totalLaborTime || a.duration} min)`,
          code: (() => {
            try {
              const repairs = JSON.parse(a.repairs || a.note);
              return repairs.length > 0 ? repairs[0].id : '';
            } catch {
              return '';
            }
          })(),
          vehicle: `${a.customer_firstname || ''} ${a.customer_lastname || ''}`.trim(),
          status: a.status,
          mechanic: `${a.mechanic_firstname || ''} ${a.mechanic_lastname || ''}`.trim() || 'Onbekend'
        });
      }
    });

    return week;
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  // --- Filter appointments ---
  const filteredWeekData = weekData.map(day => ({
    ...day,
    appointments: day.appointments.filter(appointment => {
      const nameMatch = filters.nameFilter === '' ||
        appointment.vehicle.toLowerCase().includes(filters.nameFilter.toLowerCase()) ||
        appointment.code.toLowerCase().includes(filters.nameFilter.toLowerCase());

      const serviceMatch = filters.serviceType === 'alle' ||
        appointment.type.includes(filters.serviceType);

      const mechanicMatch = filters.mechanic === 'alle' ||
        appointment.mechanic === filters.mechanic;

      const statusMatch = filters.status === 'alle' ||
        appointment.status === filters.status;

      return nameMatch && serviceMatch && mechanicMatch && statusMatch;
    })
  }));

  return (
    <div className="manager-appointments-container">
      {/* Header */}
      <div className="manager-appointments-header">
        <div className="manager-appointments-breadcrumb">
          <span>Dashboard</span>
          <span className="manager-appointments-separator">/</span>
          <span>Afspraken</span>
        </div>
        <div className="manager-appointments-user-info">
          <div className="manager-appointments-user-avatar"></div>
          <span className="manager-appointments-user-name">Edward robinson</span>
        </div>
      </div>

      {/* Filters */}
      <div className="manager-appointments-main-content">
        <div className="manager-appointments-filters">
          <div className="manager-appointments-filters-row">
            {/* Name Filter */}
            <div className="manager-appointments-filter-group">
              <label className="manager-appointments-filter-label">Filter op naam</label>
              <input
                type="text"
                placeholder="Zoek op kenteken of voertuig..."
                value={filters.nameFilter}
                onChange={(e) => handleFilterChange('nameFilter', e.target.value)}
                className="manager-appointments-filter-input"
              />
            </div>

            {/* Service Type */}
            <div className="manager-appointments-filter-group">
              <label className="manager-appointments-filter-label">Service type</label>
              <select
                value={filters.serviceType}
                onChange={(e) => handleFilterChange('serviceType', e.target.value)}
                className="manager-appointments-filter-select"
              >
                {serviceTypes.map(type => (
                  <option key={type} value={type}>{type === 'alle' ? 'Alle services' : type}</option>
                ))}
              </select>
            </div>

            {/* Mechanic */}
            <div className="manager-appointments-filter-group">
              <label className="manager-appointments-filter-label">Monteur</label>
              <select
                value={filters.mechanic}
                onChange={(e) => handleFilterChange('mechanic', e.target.value)}
                className="manager-appointments-filter-select"
              >
                {mechanics.map(m => (
                  <option key={m} value={m}>{m === 'alle' ? 'Alle monteurs' : m}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="manager-appointments-filter-group">
              <label className="manager-appointments-filter-label">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="manager-appointments-filter-select"
              >
                {statusOptions.map(s => (
                  <option key={s} value={s}>{s === 'alle' ? 'Alle statussen' : s}</option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div className="manager-appointments-filter-group">
              <label className="manager-appointments-filter-label">Periode</label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="manager-appointments-filter-select"
              >
                <option value="deze-week">Deze week</option>
                <option value="volgende-week">Volgende week</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="manager-appointments-filter-group">
              <button
                onClick={() => setFilters({
                  nameFilter: '',
                  serviceType: 'alle',
                  mechanic: 'alle',
                  status: 'alle',
                  dateRange: 'deze-week'
                })}
                className="manager-appointments-clear-filters"
              >
                Filters wissen
              </button>
            </div>
          </div>
        </div>

        {/* Week Grid */}
        <div className="manager-appointments-week-grid">
          {filteredWeekData.map((day, dayIndex) => (
            <div key={dayIndex} className="manager-appointments-day-column">
              <div className="manager-appointments-day-header">
                <div className="manager-appointments-day-name">{day.day}</div>
                <div className="manager-appointments-day-date">{day.date}</div>
              </div>
              <div className="manager-appointments-day-content">
                {day.appointments.length === 0 && (
                  <div className="manager-appointments-no-appointments">Geen afspraken</div>
                )}
                {day.appointments.map(a => (
                  <div key={a.id} className={`manager-appointments-appointment-card ${a.type.includes('Reparatie') ? 'repair' : 'apk'}`}>
                    <div className="manager-appointments-appointment-header">
                      <span className="manager-appointments-appointment-type">{a.type}</span>
                      <span className="manager-appointments-appointment-time">{a.time}</span>
                    </div>
                    <div className="manager-appointments-appointment-status">
                      <span className={`manager-appointments-status-badge ${a.status}`}>{a.status}</span>
                      <span className="manager-appointments-appointment-code">{a.code}</span>
                    </div>
                    <div className="manager-appointments-appointment-vehicle">
                      <div className="manager-appointments-car-icon">🚗</div>
                      <span className="manager-appointments-vehicle-name">{a.vehicle}</span>
                    </div>
                    <div className="manager-appointments-appointment-mechanic">
                      Monteur: {a.mechanic}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerTimeTable;
