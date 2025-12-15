import React, { useEffect, useState } from 'react';
import './CarDetails.css';
import AddCar from '../Modals/AddCar/AddCar';
import apiCall from '../../Calls/calls';
import { useToast } from '../../toastmessage/toastmessage';

const CarDetails = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openToast } = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const userdata = JSON.parse(localStorage.getItem('userdata'));

      if (!userdata || !userdata.userid) {
        openToast('Gebruiker niet gevonden. Log opnieuw in.');
        setLoading(false);
        return;
      }

      const response = await apiCall('getcars', { userid: userdata.userid });


      if (response.isSuccess) {
        setCars(response.data);
        if (response.data.length > 0) {
          setSelectedCar(response.data[0]);
        }
      } else {
        openToast(response.message || 'Fout bij ophalen auto\'s');
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      openToast('Er is een fout opgetreden bij het ophalen van auto\'s');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCarAdded = () => {
    fetchCars();
    handleClosePopup();
  };

  const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === '0000-00-00') {
      return 'Niet ingevuld';
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatYear = (dateString) => {
    if (!dateString || dateString === '0000-00-00') {
      return 'Onbekend';
    }
    const date = new Date(dateString);
    return date.getFullYear();
  };


  if (loading) {
    return (
      <div className="car-main-content">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Laden...
        </div>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="car-main-content">
        <div className="car-content-grid">
          <div className="car-left-section">
            <h2>Geen auto's gevonden</h2>
            <p>U heeft nog geen auto's geregistreerd.</p>
            <button onClick={handleOpenPopup} className="car-modify-btn">
              Registreer je eerste auto
            </button>
          </div>
        </div>
        {isPopupOpen && (
          <AddCar
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            onCarAdded={handleCarAdded}
          />
        )}
      </div>
    );
  }

  return (
    <div className="car-main-content">
      <div className="car-content-grid">
        <div className="car-left-section">
          {/* Car Tabs */}
          <div className="car-tabs">
            {cars.map((car) => (
              <div
                key={car.carid}
                className={`car-tab ${selectedCar?.carid === car.carid ? 'active' : ''}`}
                onClick={() => handleSelectCar(car)}
              >
                {car.carnickname || `${car.brand} ${car.model}`}
              </div>
            ))}
          </div>

          <div className="car-image-container">
            <img
              src={selectedCar?.carimage || "https://placehold.co/500x230"}
              alt={`${selectedCar?.brand} ${selectedCar?.model}`}
              className="car-image"
            />
          </div>

          {/* Car Details Table */}
          {selectedCar && (
            <div className="car-details-table">
              <div className="car-detail-row">
                <span className="car-detail-label">Merk</span>
                <span className="car-detail-value">{selectedCar.brand}</span>
              </div>
              <div className="car-detail-row">
                <span className="car-detail-label">Model</span>
                <span className="car-detail-value">{selectedCar.model}</span>
              </div>
              <div className="car-detail-row">
                <span className="car-detail-label">Bouw jaar</span>
                <span className="car-detail-value">{formatYear(selectedCar.buildyear)}</span>
              </div>
              <div className="car-detail-row">
                <span className="car-detail-label">Kenteken</span>
                <span className="car-detail-value">
                  {selectedCar.licenseplatecountry} - {selectedCar.licenseplate}
                </span>
              </div>
              <div className="car-detail-row">
                <span className="car-detail-label">Laatste keuring</span>
                <span className="car-detail-value">{formatDate(selectedCar.lastinspection)}</span>
              </div>
              <div className="car-detail-row">
                <span className="car-detail-label">Geregistreerd sinds</span>
                <span className="car-detail-value">{formatDate(selectedCar.registered_at)}</span>
              </div>
            </div>
          )}

          <button className="car-modify-btn">Informatie wijzigen</button>
        </div>

        {/* Right Side - Car Info */}
        <div className="car-right-section">
          {selectedCar && (
            <div className="car-info-card">
              <div className="car-logo">
                <div className="car-logo-icon">🚗</div>
                <span className="car-logo-text">
                  {selectedCar.carnickname || selectedCar.brand}
                </span>
              </div>

              <h2 className="car-title">
                {selectedCar.brand} {selectedCar.model} {formatYear(selectedCar.buildyear)}
              </h2>
              <p className="car-subtitle">
                {selectedCar.color} | {selectedCar.fueltype} | {selectedCar.licenseplate}
              </p>
            </div>
          )}

          <div className="car-register-prompt">
            <span>Wilt u nog een auto registeren? </span>
            <a onClick={handleOpenPopup} className="car-register-link">
              klik hier
            </a>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <AddCar
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onCarAdded={handleCarAdded}
        />
      )}
    </div>
  );
};

export default CarDetails;