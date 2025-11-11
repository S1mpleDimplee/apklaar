import React from 'react';
import './Home.css';

const Home = () => {
  const tarievenData = [
    { service: "APK Keuring", prijs: "€47,-", populair: true },
    { service: "APK + Kleine reparatie", prijs: "€89,-", populair: false },
    { service: "APK + Grote reparatie", prijs: "€159,-", populair: false },
    { service: "Alleen reparatie", prijs: "€65/uur", populair: false },
    { service: "Airco service", prijs: "€125,-", populair: false },
    { service: "Banden wisselen", prijs: "€45,-", populair: false }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                APK KEURING VOOR €47,-
              </h1>
              <p className="hero-description">
                Bij APKlaar is je auto goedkoop en snel weer 
                goedgekeurd voor de weg, maak snel een afspraak 
                aan en kom bij een van onze garages langs
              </p>
              <button className="cta-button">
                Afspraak maken
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title">Snel en makkelijk proces</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-card step-teal">
                <div className="step-icon">📅</div>
                <h3 className="step-title">Afspraak maken</h3>
                <p className="step-description">
                  Maak snel een afspraak aan, met een van onze 
                  gecertificeerde Monteurs.
                </p>
              </div>
            </div>
            
            <div className="arrow">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="step">
              <div className="step-card step-yellow">
                <div className="step-icon">🚗</div>
                <h3 className="step-title">Langs komen</h3>
                <p className="step-description">
                  Kom langs en wij kijken 
                  direct naar uw auto voor 
                  enige problemen.
                </p>
              </div>
            </div>
            
            <div className="arrow">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="step">
              <div className="step-card step-green">
                <div className="step-icon">✅</div>
                <h3 className="step-title">Hup de weg op</h3>
                <p className="step-description">
                  Sta binnen no-time weer 
                  op de weg met een 
                  APK-gekeurd auto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarieven Section */}
      <section className="tarieven-section">
        <div className="container">
          <h2 className="section-title">Gemiddelde tarieven</h2>
          <div className="tarieven-grid">
            {tarievenData.map((item, index) => (
              <div key={index} className={`tarief-card ${item.populair ? 'populair' : ''}`}>
                {item.populair && <div className="populair-badge">Meest gekozen</div>}
                <h3 className="tarief-service">{item.service}</h3>
                <div className="tarief-prijs">{item.prijs}</div>
                <button className="tarief-button">Kies deze service</button>
              </div>
            ))}
          </div>
          <div className="tarieven-note">
            <p>* Prijzen zijn indicatief en kunnen variëren afhankelijk van uw voertuig</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Klaar om uw APK te plannen?</h2>
            <p className="cta-description">
              Maak vandaag nog een afspraak en rijd morgen zorgeloos de weg op!
            </p>
            <button className="cta-button-large">
              Plan nu uw APK keuring
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;