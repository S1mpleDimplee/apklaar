import React, { useEffect } from "react";
import "./Navbarhome.css";
import apklaarlogo from "../../media/apklaar-blue-black.webp";
import apklaarwhite from "../../media/apklaar-white.webp";
import { useNavigate } from "react-router-dom";

const NavbarHome = () => {
  const loginpages = ["/inloggen", "/registreren", "/verificatie"];

  const isLoginPage = loginpages.includes(window.location.pathname);


  const navigate = useNavigate();
  return (
    <header className={isLoginPage ? "header" : "header-dark"}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <span className="logo-text">
            <img src={!isLoginPage ? apklaarwhite : apklaarlogo} alt="APKlaar Logo" width={"120px"} />
          </span>
        </div>

        {/* Navigation */}
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
            {/* <li className="nav-item">
              <a href="#" className="nav-link">
                Reparaties
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Tarieven
              </a>
            </li> */}
            <button
              className="nav-button"
              onClick={() => navigate("/inloggen")}
            >
              Inloggen
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavbarHome;
