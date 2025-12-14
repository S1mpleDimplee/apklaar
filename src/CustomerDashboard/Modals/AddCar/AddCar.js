import React, { useState } from 'react';
import './AddCar.css';
import { useToast } from '../../../toastmessage/toastmessage';
import apiCall from '../../../Calls/calls';

// AutoRegistrerenPopup Component
const AddCar = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    userid: '',
    brand: '',
    model: '',
    buildyear: '',
    lastInspection: '',
    color: '',
    fuelType: '',
    carNickname: '',
    countryCode: 'NL',
    licensePlate: 'Uw-pla-tje'
  });

  const { openToast } = useToast();


  const handleSubmit = async () => {
    formData.userid = JSON.parse(localStorage.getItem('userdata')).userid;

    const response = await apiCall('addCar', formData);
    if (response.isSuccess) {
      openToast(response.message);
      // onClose();
    } else {
      openToast(response.message);
    }

  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button onClick={onClose} className="popup-close-btn">
          &times;
        </button>

        <h2 className="popup-title">Auto regristeren</h2>

        <div className="popup-grid">
          <div>
            <h3 className="popup-section-title">Verplichte informatie</h3>

            <div className="popup-form-group">
              <div className="popup-field">
                <label className="popup-label">Auto merk</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="Bijv: Toyota"
                  className="popup-input"
                />
              </div>

              <div className="popup-field">
                <label className="popup-label">Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="Bijv: Toyota Starlet"
                  className="popup-input"
                />
              </div>

              <div className="popup-field">
                <label className="popup-label">Bouw jaar</label>
                <input
                  type="text"
                  value={formData.buildyear}
                  onChange={(e) => setFormData({ ...formData, buildyear: e.target.value })}
                  placeholder="Bijv: 1999"
                  className="popup-input"
                />
              </div>

              <div className="popup-field">
                <label className="popup-label">Kenteken</label>
                <input
                  className="popup-kenteken-nl"
                  type="text"
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  placeholder="Bijv: 1999"
                />
                <input
                  className="popup-kenteken-plate"
                  type="text"
                  value={formData.licensePlate}
                  onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                  placeholder="Bijv: 12-12-ABC"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Extra informatie */}
          <div>
            <h3 className="popup-section-title">Extra informatie</h3>
            <div className="popup-field">
              <label className="popup-label">Laatste keuring</label>
              <input
                type="text"
                value={formData.lastInspection}
                onChange={(e) => setFormData({ ...formData, lastInspection: e.target.value })}
                placeholder="DD-MM-YYYY"
                className="popup-input"
              />
            </div>
            <div className="popup-form-group">
              <div className="popup-field">
                <label className="popup-label">Kleur</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="Blauw"
                  className="popup-input"
                />
              </div>

              <div className="popup-field">
                <label className="popup-label">Brandstof</label>
                <input
                  type="text"
                  value={formData.fuelType}
                  onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                  placeholder="Bijv: Diesel"
                  className="popup-input"
                />
              </div>

              <div className="popup-field">
                <label className="popup-label">Willekeurige naam</label>
                <input
                  type="text"
                  value={formData.carNickname}
                  onChange={(e) => setFormData({ ...formData, carNickname: e.target.value })}
                  placeholder="Mijn auto naam"
                  className="popup-input"
                />
              </div>

              <button onClick={handleSubmit} className="popup-submit-btn">
                Auto registreren
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCar;