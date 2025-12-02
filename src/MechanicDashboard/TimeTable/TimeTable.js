import React, { useState } from 'react';
import './TimeTable.css';

const MechanicTimeTable = () => {
  const [selectedDate, setSelectedDate] = useState('27 Dec 2025');
  
  // Sample appointment data - these would be props or state from your parent component
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      type: 'APK-Keuring',
      time: '10:00 - 10:30',
      date: '17-02-78',
      licensePlate: 'VOLVO',
      status: 'bezet'
    },
    {
      id: 2,
      type: 'APK-Keuring',
      time: '10:00 - 10:30',
      date: '17-02-78',
      licensePlate: 'VOLVO',
      status: 'bezet'
    },
    {
      id: 3,
      type: 'APK-Keuring',
      time: '10:05 - 10:30',
      date: '17-02-78',
      licensePlate: 'VOLVO',
      status: 'bezet'
    },
    {
      id: 4,
      type: 'APK-Keuring',
      time: '10:00 - 10:30',
      date: '17-02-78',
      licensePlate: 'VOLVO',
      status: 'bezet'
    },
    {
      id: 5,
      type: 'Reparatie (3)',
      time: '11:00-14:00',
      date: '23-1A-342',
      licensePlate: 'BMW',
      status: 'bezet'
    },
    {
      id: 6,
      type: 'APK-Keuring',
      time: '10:00 - 10:30',
      date: '17-02-78',
      licensePlate: 'VOLVO',
      status: 'bezet'
    },
    {
      id: 7,
      type: 'APK-Keuring',
      time: '10:05 - 10:30',
      date: '17-02-78',
      licensePlate: 'VOLVO',
      status: 'bezet'
    },
    {
      id: 8,
      type: 'APK-Keuring',
      time: '10:00 - 10:30',
      date: '17-02-78',
      licensePlate: 'VOLVO',
      status: 'bezet'
    },
    {
      id: 9,
      type: 'APK-Keuring',
      time: '15:00-15:30',
      date: '17-02-78',
      licensePlate: 'VOLVO',
      status: 'bezet'
    },
    {
      id: 10,
      type: 'APK-Keuring',
      time: '10:00 - 10:30',
      date: '17-02-78',
      licensePlate: 'VOLVO',
      status: 'bezet'
    },
    {
      id: 11,
      type: 'APK-Keuring',
      time: '10:00 - 10:30',
      date: '17-02-78',
      licensePlate: 'VOLVO',
      status: 'bezet'
    },
    {
      id: 12,
      type: 'APK-Keuring',
      time: '10:00 - 10:30',
      date: '17-02-78',
      licensePlate: 'VOLVO',
      status: 'bezet'
    },
    {
      id: 13,
      type: 'APK-Keuring',
      time: '10:00 - 10:30',
      date: '17-02-78',
      licensePlate: 'VOLVO',
      status: 'bezet'
    },
    {
      id: 14,
      type: 'APK-Keuring',
      time: '10:00 - 10:30',
      date: '17-02-78',
      licensePlate: 'VOLVO',
      status: 'bezet'
    }
  ]);

  const handleAppointmentClick = (appointmentId) => {
    // Handle appointment click - could open edit modal, show details, etc.
    console.log('Clicked appointment:', appointmentId);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    // Here you would typically fetch appointments for the new date
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
            <div className="planner-day">Maandag</div>
            <div className="planner-date">{selectedDate}</div>
          </div>
        </div>

        {/* Appointments Grid */}
        <div className="planner-appointments-grid">
          {appointments.map((appointment) => (
            <div 
              key={appointment.id}
              className={`planner-appointment-card ${appointment.type === 'Reparatie (3)' ? 'repair' : 'apk'}`}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default MechanicTimeTable;