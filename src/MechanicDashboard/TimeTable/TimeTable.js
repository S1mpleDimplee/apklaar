// src/MechanicDashboard/TimeTable/TimeTable.js
import React, { useState, useEffect } from 'react';
import './TimeTable.css';
import { getISOWeek, startOfISOWeek, setISOWeek, addDays, getISOWeeksInYear } from 'date-fns';
import postCall from '../../Calls/calls';
import { useToast } from '../../toastmessage/toastmessage';
import CreateAppointmentModal from '../Components/CreateAppointmentModal';

const MechanicTimeTable = () => {
  const today = new Date();
  const [currentWeek, setCurrentWeek] = useState(getISOWeek(today));
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const { openToast } = useToast();

  const weekDates = Array.from({ length: 5 }, (_, i) => {
    const monday = startOfISOWeek(setISOWeek(new Date(currentYear, 0, 1), currentWeek));
    return addDays(monday, i).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  });

  const weekData = {
    days: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'],
    dates: weekDates,
    timeSlots: [
      '08:00 - 08:30','08:30 - 09:00','09:00 - 09:30','09:30 - 10:00',
      '10:00 - 10:30','10:30 - 11:00','11:00 - 11:30','11:30 - 12:00',
      '12:00 - 12:30','12:30 - 13:00','13:00 - 13:30','13:30 - 14:00',
      '14:00 - 14:30','14:30 - 15:00','15:00 - 15:30'
    ]
  };

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments for current week
  const fetchAppointmentsForWeek = async (week, year) => {
    try {
      setLoading(true);
      setError(null);
      const loggedInData = JSON.parse(localStorage.getItem('loggedInData'));
      if (!loggedInData || !loggedInData.userid) {
        setError('Gebruiker niet ingelogd');
        setLoading(false);
        return;
      }

      const userid = loggedInData.userid;
      const response = await postCall('getAppointmentsForWeek', { week, year, userid });

      if (response.isSuccess && response.data) {
        // Transform the data to match the expected format
        const transformedAppointments = response.data.map(appt => ({
          id: appt.id || appt.appointmentid,
          type: appt.apk ? 'APK-Keuring' : `Reparatie (${appt.duration}h)`,
          time: appt.time,
          date: new Date(appt.date).toLocaleDateString('nl-NL'),
          licensePlate: appt.licensePlate || appt.kenteken || 'Onbekend',
          status: appt.status || 'bezet'
        }));
        setAppointments(transformedAppointments);
      } else {
        setError(response.message || 'Kon afspraken niet ophalen');
        setAppointments([]);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Fout bij het ophalen van afspraken');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointmentsForWeek(currentWeek, currentYear); }, []);

  const addThirtyMinutes = (time) => {
    const [h,m] = time.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m + 30);
    return d.toTimeString().substring(0,5);
  };

  const navigateWeek = (dir) => {
    let newWeek = dir === 'next' ? currentWeek+1 : currentWeek-1;
    let newYear = currentYear;
    const totalWeeks = getISOWeeksInYear(new Date(currentYear,0,1));
    if (newWeek > totalWeeks) { newWeek = 1; newYear++; }
    if (newWeek < 1) { newYear--; newWeek = getISOWeeksInYear(new Date(newYear,0,1)); }
    setCurrentWeek(newWeek); setCurrentYear(newYear);
    fetchAppointmentsForWeek(newWeek, newYear);
  };

  const handleAppointmentClick = (appointmentId) => {
    // Handle appointment click - could open edit modal, show details, etc.
    console.log('Clicked appointment:', appointmentId);
  };

  return (
    <div className="planner-container">
      {/* Header */}
      <div className="planner-header">
        <div className="planner-breadcrumb">
          <span>Dashboard</span>
          <span className="planner-separator">/</span>
          <span>Afspraken</span>
        </div>

        <div className="planner-user-info">
          <div className="planner-user-avatar"></div>
          <span className="planner-user-name">Edward robinson</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="planner-main-content">
        {/* Date Header */}
        <div className="planner-date-header">
          <div className="planner-date-card">
            <div className="planner-day">Week {currentWeek}, {currentYear}</div>
            <div className="planner-date">
              <button onClick={()=>navigateWeek('prev')}>← Vorige week</button>
              <button onClick={()=>navigateWeek('next')}>Volgende week →</button>
            </div>
          </div>
        </div>

        {/* Appointments Grid */}
        <div className="planner-appointments-grid">
          {loading ? (
            <div className="planner-loading">Afspraaken laden...</div>
          ) : error ? (
            <div className="planner-error">{error}</div>
          ) : appointments.length === 0 ? (
            <div className="planner-no-appointments">Geen afspraken gevonden voor deze week.</div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`planner-appointment-card ${appointment.type === 'Reparatie' ? 'repair' : 'apk'}`}
                onClick={() => handleAppointmentClick(appointment.id)}
              >
                <div className="planner-appointment-header">
                  <span className="planner-appointment-type">{appointment.type}</span>
                  <span className="planner-appointment-time">{appointment.time}</span>
                </div>

                <div className="planner-appointment-status">
                  <span className="planner-status-badge">{appointment.status}</span>
                  <span className="planner-appointment-date">{appointment.date}</span>
                </div>

                <div className="planner-appointment-vehicle">
                  <div className="planner-car-icon">🚗</div>
                  <span className="planner-license-plate">{appointment.licensePlate}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MechanicTimeTable;
