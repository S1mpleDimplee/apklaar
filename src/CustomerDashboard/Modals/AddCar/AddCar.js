import React, { useState } from "react";
import "./AddCar.css";
import { useToast } from "../../../toastmessage/toastmessage";
import apiCall from "../../../Calls/calls";

// AddCar Component
const AddCar = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    userid: "",
    brand: "",
    model: "",
    buildyear: "",
    lastInspection: "",
    color: "",
    fuelType: "",
    carNickname: "",
    countryCode: "NL",
    licensePlate: "Uw-pla-tje",
    carimage: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { openToast } = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData({ ...formData, carimage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById("car-image-input");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async () => {
    formData.userid = JSON.parse(localStorage.getItem("userdata")).userid;

    const response = await apiCall("addCar", formData);
    if (response.isSuccess) {
      openToast(response.message);
      onClose();
    } else {
      openToast(response.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="addcar-overlay">
      <div className="addcar-container">
        <button onClick={onClose} className="addcar-close-btn">
          ✕
        </button>

        <h2 className="addcar-title">Auto registreren</h2>

        <div className="addcar-content">
          {/* Left Column - Form Fields */}
          <div className="addcar-form-section">
            <div className="addcar-form-row">
              <div className="addcar-field">
                <label className="addcar-label">Auto merk</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  placeholder="Bijv: Toyota"
                  className="addcar-input"
                />
              </div>

              <div className="addcar-field">
                <label className="addcar-label">Bouw jaar</label>
                <input
                  type="text"
                  value={formData.buildyear}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, buildyear: value });
                  }}
                  placeholder="Bijv: 1999"
                  className="addcar-input"
                />
              </div>
            </div>

            <div className="addcar-form-row">
              <div className="addcar-field">
                <label className="addcar-label">Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  placeholder="Bijv: Toyota Starlet"
                  className="addcar-input"
                />
              </div>

              <div className="addcar-field">
                <label className="addcar-label">Laatste keuring</label>
                <input
                  type="text"
                  value={formData.lastInspection}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, lastInspection: value });
                  }}
                  placeholder="DD-MM-YYYY"
                  className="addcar-input"
                />
              </div>
            </div>

            <div className="addcar-form-row">
              <div className="addcar-field">
                <label className="addcar-label">Kleur</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  placeholder="Blauw"
                  className="addcar-input"
                />
              </div>

              <div className="addcar-field">
                <label className="addcar-label">Gewicht</label>
                <input type="text" placeholder="0g" className="addcar-input" />
              </div>
            </div>

            <div className="addcar-form-row">
              <div className="addcar-field">
                <label className="addcar-label">Brandstof</label>
                <input
                  type="text"
                  value={formData.fuelType}
                  onChange={(e) =>
                    setFormData({ ...formData, fuelType: e.target.value })
                  }
                  placeholder="Bijv: Diesel"
                  className="addcar-input"
                />
              </div>

              <div className="addcar-field">
                <label className="addcar-label">Willekeurige naam</label>
                <input
                  type="text"
                  value={formData.carNickname}
                  onChange={(e) =>
                    setFormData({ ...formData, carNickname: e.target.value })
                  }
                  placeholder="Mijn auto naam"
                  className="addcar-input"
                />
              </div>
            </div>
          </div>

          {/* Right Column - License Plate and Image */}
          <div className="addcar-side-section">
            <div className="addcar-license-section">
              <h3 className="addcar-section-title">Kenteken</h3>
              <div className="addcar-license-plate">
                <span className="addcar-license-country">
                  {formData.countryCode}
                </span>
                <span className="addcar-license-number">
                  {formData.licensePlate}
                </span>
              </div>
            </div>

            <div className="addcar-image-section">
              <h3 className="addcar-section-title">Afbeelding</h3>
              {imagePreview && (
                <span className="addcar-image-note" onClick={removeImage}>
                  Afbeelding verwijderen
                </span>
              )}
              <div className="addcar-image-container">
                <div className="addcar-image-preview">
                  <img src={imagePreview} className="addcar-preview-image" />
                </div>

                <input
                  type="file"
                  id="car-image-input"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="addcar-file-input"
                />
                <label htmlFor="car-image-input" className="addcar-upload-btn">
                  {imagePreview ? "Andere afbeelding" : "Afbeelding uploaden"}
                </label>
              </div>
            </div>

            <button onClick={handleSubmit} className="addcar-submit-btn">
              Auto registreren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
