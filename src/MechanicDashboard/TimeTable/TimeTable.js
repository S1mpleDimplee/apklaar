// src/MechanicDashboard/TimeTable/TimeTable.js
import React, { useState, useEffect } from 'react';
import './TimeTable.css';
import {
  getISOWeek,
  startOfISOWeek,
  endOfISOWeek,
  setISOWeek,
  getISOWeeksInYear,
  format,
  addDays
} from 'date-fns';
import postCall from '../../Calls/calls';

const MechanicTimeTable = () => {
  const today = new Date();
  const [currentWeek, setCurrentWeek] = useState(getISOWeek(today));
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate the Monday and Friday of current ISO week
  const monday = startOfISOWeek(setISOWeek(new Date(currentYear, 0, 1), currentWeek));
  const friday = addDays(monday, 4); // 5 weekdays

  const weekDates = Array.from({ length: 5 }, (_, i) =>
    format(addDays(monday, i), 'yyyy-MM-dd')
  );

  const weekLabels = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'];

  // Fetch all appointments for the week at once
  const fetchAppointmentsForWeek = async () => {
    try {
      setLoading(true);
      setError(null);

      const loggedInData = JSON.parse(localStorage.getItem('userdata'));
      if (!loggedInData?.userid) {
        setError('Gebruiker niet ingelogd');
        setAppointments([]);
        return;
      }

      const response = await postCall('getappointmentsforweek', {
        mechanicId: loggedInData.userid,
        startDate: format(monday, 'yyyy-MM-dd'),
        endDate: format(friday, 'yyyy-MM-dd')
      });

      if (!response?.isSuccess) {
        setError(response?.message || 'Kon afspraken niet ophalen');
        setAppointments([]);
        return;
      }

      // Transform data for frontend
      const transformed = response.data.map(appt => {
        const repairs = JSON.parse(appt.repairs || '[]');
        const hasAPK = repairs.some(r => r.repairationType === 'APK-Keuring');

        return {
          id: appt.aid,
          date: appt.appointmentDate,
          time: appt.appointmentTime.slice(0, 5),
          type: hasAPK ? 'APK-Keuring' : `Reparatie (${appt.totalLaborTime}u)`,
          customer: appt.userid,
          status: appt.status
        };
      });

      setAppointments(transformed);

    } catch (err) {
      console.error(err);
      setError('Fout bij het ophalen van afspraken');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentsForWeek();
  }, [currentWeek, currentYear]);

  // Week navigation
  const navigateWeek = (dir) => {
    let newWeek = dir === 'next' ? currentWeek + 1 : currentWeek - 1;
    let newYear = currentYear;
    const totalWeeks = getISOWeeksInYear(new Date(currentYear, 0, 1));

    if (newWeek > totalWeeks) { newWeek = 1; newYear++; }
    if (newWeek < 1) { newYear--; newWeek = getISOWeeksInYear(new Date(newYear, 0, 1)); }

    setCurrentWeek(newWeek);
    setCurrentYear(newYear);
  };

  return (
    <div className="planner-container">
      <div className="planner-header">
        <div className="planner-breadcrumb">
          <span>Dashboard</span> / <span>Afspraken</span>
        </div>
      </div>

      <div className="planner-main-content">
        <div className="planner-date-header">
          <div className="planner-date-card">
            <div>Week {currentWeek}, {currentYear}</div>
            <div>
              <button onClick={() => navigateWeek('prev')}>← Vorige</button>
              <button onClick={() => navigateWeek('next')}>Volgende →</button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="planner-loading">Afspraken laden...</div>
        ) : error ? (
          <div className="planner-error">{error}</div>
        ) : appointments.length === 0 ? (
          <div className="planner-no-appointments">Geen afspraken deze week</div>
        ) : (
          <div className="planner-appointments-grid">
            {appointments.map(appt => (
              <div
                key={appt.id}
                className={`planner-appointment-card ${appt.type.includes('APK') ? 'apk' : 'repair'}`}
              >
                <div className="planner-appointment-header">
                  <span>{appt.type}</span>
                  <span>{appt.time}</span>
                </div>
                <div className="planner-appointment-status">
                  <span className="planner-status-badge">{appt.status}</span>
                  <span>{appt.date}</span>
                </div>
                <div className="planner-appointment-vehicle">
                  🚗 {appt.customer}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MechanicTimeTable;
