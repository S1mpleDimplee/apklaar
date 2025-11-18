import React, { useState } from 'react';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    voornaam: '',
    achternaam: '',
    email: '',
    password: '',
    land: '',
    stad: '',
    postcode: '',
    straatnaam: '',
    tussenvoegsel: '',
    huisnummer: '',
    telefoonnummer: ''
  });

  const [countryCode, setCountryCode] = useState('+31');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleSubmit = () => {
    // Handle registration logic here
    console.log('Registration data:', {
      ...formData,
      fullPhone: `${countryCode}${formData.telefoonnummer}`
    });
    // You can add your registration logic here
  };

  const handleLoginRedirect = () => {
    // Redirect to login page
    console.log('Redirect to login');
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Maak een account aan</h2>
          <div className="title-underline"></div>
          
          <div className="register-form">
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="voornaam"
                  value={formData.voornaam}
                  onChange={handleChange}
                  placeholder="Voornaam"
                  className="form-input"
                />
                <label className="form-label">
                  Voer hier uw voor in
                </label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="land"
                  value={formData.land}
                  onChange={handleChange}
                  placeholder="Land"
                  className="form-input"
                />
                <label className="form-label">
                  Voer hier uw land in
                </label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="stad"
                  value={formData.stad}
                  onChange={handleChange}
                  placeholder="Stad"
                  className="form-input"
                />
                <label className="form-label">
                  Voer hier uw stad in
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <input
                  type="text"
                  name="achternaam"
                  value={formData.achternaam}
                  onChange={handleChange}
                  placeholder="Achternaam"
                  className="form-input"
                />
                <label className="form-label">
                  Voer hier uw achternaam in (inclusief tussenvoegsels)
                </label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  placeholder="Postcode"
                  className="form-input"
                />
                <label className="form-label">
                  Voer hier uw postcode in zoals 1234XX
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="uwemailadres@gmail.com"
                  className="form-input"
                />
                <label className="form-label">
                  Herhaal hier uw email adres in
                </label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="straatnaam"
                  value={formData.straatnaam}
                  onChange={handleChange}
                  placeholder="Straatnaam"
                  className="form-input"
                />
                <label className="form-label">
                  Voer hier uw huidige straatnaam in
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="EenSterkWachtwoord123"
                  className="form-input"
                />
                <label className="form-label">
                  Minimaal 8 karakters waarvan 1 hoofdletter en 1 cijfer)
                </label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="tussenvoegsel"
                  value={formData.tussenvoegsel}
                  onChange={handleChange}
                  placeholder="Tussenvoegsel"
                  className="form-input"
                />
                <label className="form-label">
                  Voer hier het tussenvoegsel in
                </label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="huisnummer"
                  value={formData.huisnummer}
                  onChange={handleChange}
                  placeholder="Huisnummer"
                  className="form-input"
                />
                <label className="form-label">
                  Voer hier uw huisnummer in
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="phone-group">
                <select 
                  value={countryCode} 
                  onChange={handleCountryCodeChange}
                  className="country-select"
                >
                  <option value="+31">+31</option>
                  <option value="+32">+32</option>
                  <option value="+49">+49</option>
                  <option value="+33">+33</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="tel"
                  name="telefoonnummer"
                  value={formData.telefoonnummer}
                  onChange={handleChange}
                  placeholder="0612345789"
                  className="form-input phone-input"
                />
              </div>
              <label className="form-label">
                Voer hier uw telefoonnummer in
              </label>

              <div className="license-plate-group">
                <div className="license-plate">
                  <span className="plate-nl">NL</span>
                  <span className="plate-number">Uw-pla-tje</span>
                </div>
              </div>
            </div>

            <button onClick={handleSubmit} className="register-button">
              Registreren
            </button>

            <div className="register-footer">
              <button onClick={handleLoginRedirect} className="login-redirect-link">
                Ik heb al een account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;