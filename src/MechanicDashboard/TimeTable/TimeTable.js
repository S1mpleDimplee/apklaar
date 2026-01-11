import React, { useState, useEffect } from 'react';
import './TimeTable.css';
import {
  getISOWeek,
  startOfISOWeek,
  addDays,
  getISOWeeksInYear,
  format
} from 'date-fns';
import { nl } from 'date-fns/locale';
import postCall from '../../Calls/calls';

const MechanicTimeTable = () => {
  const testDate = new Date('2026-01-05');
  const [currentWeek, setCurrentWeek] = useState(getISOWeek(testDate));
  const [currentYear, setCurrentYear] = useState(testDate.getFullYear());

  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(true);

  const monday = startOfISOWeek(
    new Date(currentYear, 0, 1 + (currentWeek - 1) * 7)
  );

  const weekDates = Array.from({ length: 5 }, (_, i) => addDays(monday, i));

  const timeSlots = [
    '08:00 - 08:30',
    '08:30 - 09:00',
    '09:00 - 09:30',
    '09:30 - 10:00',
    '10:00 - 10:30',
    '10:30 - 11:00',
    '11:00 - 11:30',
    '11:30 - 12:00',
    '12:00 - 12:30',
    '12:30 - 13:00',
    '13:00 - 13:30',
    '13:30 - 14:00',
    '14:00 - 14:30',
    '14:30 - 15:00'
  ];

  const normalizeTime = (time) => time.slice(0, 5);

  const addThirtyMinutes = (time) => {
    const [h, m] = time.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m + 30, 0, 0);
    return d.toTimeString().slice(0, 5);
  };

  const fetchAppointmentsForWeek = async () => {
    setLoading(true);
    try {
      const loggedInData = JSON.parse(localStorage.getItem('userdata'));
      const response = await postCall('getAppointmentsForWeek', {
        week: currentWeek,
        year: currentYear,
        mechanicId: loggedInData?.userid
      });

      console.log('🔥 API RESPONSE:', response);

      const mapped = {};

      if (Array.isArray(response.data)) {
        response.data.forEach(appt => {
          const dateKey = appt.appointmentdate;
          const start = normalizeTime(appt.appointmenttime);
          const end = addThirtyMinutes(start);
          const slot = `${start} - ${end}`;

          if (!mapped[dateKey]) mapped[dateKey] = [];

          mapped[dateKey].push({
            aid: appt.aid,
            time: slot,
            status: appt.status,
            repairs: appt.repairs
          });
        });
      }

      console.log('🔥 MAPPED APPOINTMENTS:', mapped);

      setAppointments(mapped);
    } catch (err) {
      console.error(err);
      setAppointments({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentsForWeek();
  }, [currentWeek, currentYear]);

  const navigateWeek = (dir) => {
    let newWeek = dir === 'next' ? currentWeek + 1 : currentWeek - 1;
    let newYear = currentYear;
    const totalWeeks = getISOWeeksInYear(new Date(currentYear, 0, 1));

    if (newWeek > totalWeeks) {
      newWeek = 1;
      newYear++;
    }
    if (newWeek < 1) {
      newYear--;
      newWeek = getISOWeeksInYear(new Date(newYear, 0, 1));
    }

    setCurrentWeek(newWeek);
    setCurrentYear(newYear);
  };

  const getAppointmentForSlot = (dateStr, slot) => {
    const dayApps = appointments[dateStr] || [];
    return dayApps.find(a => a.time === slot);
  };

  return (
    <div className="planner-container">
      <div className="planner-main-content">

        <div className="planner-date-header">
          <div className="planner-date-card">
            <div className="planner-week-label">
              Week {currentWeek}, {currentYear}
            </div>
            <div className="planner-nav-group">
              <button onClick={() => navigateWeek('prev')}>← Vorige</button>
              <button onClick={() => navigateWeek('next')}>Volgende →</button>
            </div>
          </div>
        </div>

        {loading ? (
          <div>Laden...</div>
        ) : (
          <div className="calendar-grid">
            <div className="calendar-header">
              {weekDates.map(date => (
                <div key={date} className="day-header">
                  <div className="day-name">
                    {format(date, 'EEEE', { locale: nl })}
                  </div>
                  <div className="day-date">
                    {format(date, 'dd MMM yyyy')}
                  </div>
                </div>
              ))}
            </div>

            <div className="time-slots-grid">
              {timeSlots.map(slot => (
                <div key={slot} className="time-row">
                  {weekDates.map(date => {
                    const dateKey = format(date, 'yyyy-MM-dd');
                    const appt = getAppointmentForSlot(dateKey, slot);

                    return (
                      <div key={dateKey + slot} className="time-slot">
                        {appt ? (
                          <div className="appointment-card">
                            <div className="appointment-time">{slot}</div>

                            {/* Show only repairationType */}
                            {appt.repairs && (
                              <div>
                                Repairs:{' '}
                                {Array.isArray(appt.repairs)
                                  ? appt.repairs.map(r => r.repairationType).join(', ')
                                  : (() => {
                                      try {
                                        const parsed = JSON.parse(appt.repairs);
                                        return parsed.map(r => r.repairationType).join(', ');
                                      } catch {
                                        return '';
                                      }
                                    })()}
                              </div>
                            )}

                            <div>Status: {appt.status}</div>
                            <div>AID: {appt.aid}</div>
                          </div>
                        ) : (
                          <div className="appointment-time">{slot}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MechanicTimeTable;
