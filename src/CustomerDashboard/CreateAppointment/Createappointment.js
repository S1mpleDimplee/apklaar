import React, { useEffect, useState } from 'react';
import './Createappointment.css';
import apiCall from '../../Calls/calls';

const CreateAppointment = ({ onClose, carData, onSubmit }) => {
  const [repairs, setRepairs] = useState([{}]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [mechanic, setMechanic] = useState('');
  const [selectedReparationID, setSelectedReparationID] = useState(null);
  const [reperationsTypes, setReperationsTypes] = useState([]);
  const [labercostPerHour, setLabercostPerHour] = useState(0);
  const [totalNet, setTotalNet] = useState(0);
  const [totalGross, setTotalGross] = useState(0);
  const [totalLaborTime, setTotalLaborTime] = useState(0);


  useEffect(() => {
    fetchReparations();
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const userid = JSON.parse(localStorage.getItem('userdata')).userid;
    const response = await apiCall('fetchcars', { userid });
  }

  const fetchReparations = async () => {
    const response = await apiCall('fetchreparations', {});

    if (response.isSuccess) {
      setReperationsTypes(response.data);
      setLabercostPerHour(response.data.find(type => type.reparation === 'Arbeitskosten (per uur)')?.netprice || 0);
    }
  }

  const addRepair = () => {
    if (!selectedReparationID) return;
    const selectedType = reperationsTypes.find(type => type.id === selectedReparationID);

    if (selectedType) {
      setRepairs([...repairs, {
        id: Date.now(),
        repairationType: selectedType.reparation,
        netPrice: selectedType.netprice,
        tax: selectedType.tax,
        grossPrice: calculateGrossPrice(selectedType.netprice, selectedType.tax),
        laborTime: selectedType.laborTime || 0
      }]);
      calculateTotals();
    }
  };

  const removeRepair = (index) => {
    setRepairs(repairs.filter((_, i) => i !== index));
    calculateTotals();
  };

  const calculateTotals = () => {
    let netTotal = 0;
    let grossTotal = 0;
    let laborTimeTotal = 0;
    repairs.forEach(repair => {
      netTotal += parseFloat(repair.netPrice) || 0;
      grossTotal += parseFloat(repair.grossPrice) || 0;
      laborTimeTotal += parseFloat(repair.laborTime) || 0;
    });



    setTotalGross(grossTotal);
    setTotalNet(netTotal);
    setTotalLaborTime(laborTimeTotal);
  }

  const calculateGrossPrice = (netPrice, tax) => {
    if (!netPrice || isNaN(netPrice)) return '';
    const gross = parseFloat(netPrice) * (1 + parseFloat(tax) / 100);
    return gross.toFixed(2);
  };

  const handleSubmit = () => {
    const data = {
      carId: carData?.carid,
      // inspectionType,
      appointmentDate,
      appointmentTime,
      mechanic,
      repairs: repairs.filter(r => r.repairationType),
      totals: {
        netPrice: totalNet,
        grossPrice: totalGross,
        totalLaborTime
      }
    };
    onSubmit(data);
  };


  return (
    <div className="repairs-modal-overlay">
      <div className="repairs-modal-container">
        <button onClick={onClose} className="repairs-modal-close">
          ✕
        </button>

        <h2 className="repairs-modal-title">Behandelingen</h2>

        <div className="repairs-modal-content">
          <div className="repairs-section">
            <div className="repairs-type-select">
              <select
                value={selectedReparationID || ''}
                onChange={(e) => setSelectedReparationID(e.target.value)}
                className="repairs-select"
              >
                <option value="">Selecteer een behandeling</option>
                {/* Tijdelijk een filter voor geen Arbeitskoisten veranderd later in de database of backend*/}
                {reperationsTypes.filter((type) => type.reparation !== 'Arbeitskosten (per uur)').map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.reparation}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={addRepair} className="repairs-add-btn">
              Toevoegen+
            </button>

            <div className="repairs-table-container">
              <table className="repairs-table">
                <thead>
                  <tr>
                    <th>Behandeling</th>
                    <th>Kosten</th>
                    <th>BTW</th>
                    <th>Totaal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {repairs.length > 0 ? (
                    repairs.map((repair, index) => (
                      <tr key={repair.id || index}>
                        <td>
                          <span className="repairs-repairation-type-label">{repair.repairationType}</span>
                        </td>
                        <td>
                          <span>€ {repair.netPrice || '0,00'}</span>
                        </td>
                        <td>
                          <span>{repair.tax}%</span>
                        </td>
                        <td className="repairs-price">€{repair.grossPrice || '0,00'}</td>
                        <td>
                          <button
                            onClick={() => removeRepair(index)}
                            className="repairs-remove-btn"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">Geen behandelingen toegevoegd</td>
                    </tr>
                  )}

                  <tr className="repairs-labor-row">
                    <td>Werktijd werknemer ({totalLaborTime} UUR)</td>
                    <td>
                      <span>{totalLaborTime ? `€${(parseFloat(totalLaborTime) * 50).toFixed(2)}` : '€0,00'}</span>
                    </td>
                    <td>21%</td>
                    <td className="repairs-price">
                      €{(parseFloat(repairs[0]?.laborTime || 0) * 50 * 1.21).toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="repairs-note">Excl btw.</div>

            <div className="repairs-total">
              Geschatte bedrag: €{totalGross.toFixed(2)}
            </div>
          </div>

          {/* Right side - Car info and appointment */}
          <div className="repairs-sidebar">
            {/* Car info */}
            <div className="repairs-car-info">
              <h3 className="repairs-car-title">
                Auto <span>{carData?.brand} {carData?.model} {carData?.buildyear}</span>
              </h3>
              <div className="repairs-car-details">
                <div className="repairs-detail-row">
                  <span>Merk</span>
                  <strong>{carData?.brand || 'Toyota'}</strong>
                </div>
                <div className="repairs-detail-row">
                  <span>Model</span>
                  <strong>{carData?.model || 'STARLET'}</strong>
                </div>
                <div className="repairs-detail-row">
                  <span>Bouw jaar</span>
                  <strong>{carData?.buildyear || '1999'}</strong>
                </div>
                <div className="repairs-detail-row">
                  <span>Kenteken</span>
                  <strong>{carData?.licensePlate || 'STARLET'}</strong>
                </div>
                <div className="repairs-detail-row">
                  <span>Laatste keuring</span>
                  <strong>{carData?.lastInspection || '19-11-2024'}</strong>
                </div>
                <div className="repairs-detail-row">
                  <span>Geregistreerd sinds</span>
                  <strong>{carData?.registeredSince || '11-10-2024'}</strong>
                </div>
              </div>
            </div>

            {/* Appointment scheduling */}
            <div className="repairs-appointment">
              <h3 className="repairs-appointment-title">Datum | Tijd</h3>
              <div className="repairs-appointment-form">
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="repairs-date-input"
                />

                <div className="repairs-time-input">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    placeholder="22"
                    value={appointmentTime.split(':')[0] || ''}
                    onChange={(e) => {
                      const hour = e.target.value.padStart(2, '0');
                      const minute = appointmentTime.split(':')[1] || '00';
                      setAppointmentTime(`${hour}:${minute}`);
                    }}
                    className="repairs-hour-input"
                  />
                  <span>:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    placeholder="00"
                    value={appointmentTime.split(':')[1] || ''}
                    onChange={(e) => {
                      const hour = appointmentTime.split(':')[0] || '00';
                      const minute = e.target.value.padStart(2, '0');
                      setAppointmentTime(`${hour}:${minute}`);
                    }}
                    className="repairs-minute-input"
                  />
                </div>

                <div className="repairs-mechanic-select">
                  <label>Voorkeur monteur <span>(optioneel)</span></label>
                  <select
                    value={mechanic}
                    onChange={(e) => setMechanic(e.target.value)}
                    className="repairs-select"
                  >
                    <option value="">-</option>
                    <option value="jan">Jan de Vries</option>
                    <option value="piet">Piet Jansen</option>
                    <option value="klaas">Klaas Bakker</option>
                  </select>
                </div>

                <button onClick={handleSubmit} className="repairs-submit-btn">
                  Afspraak plannen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;