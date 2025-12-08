import React from "react";
import "./Sidebar.css";

const Sidebar = ({ userRole, onNavigate, currentPath }) => {
  // Define menu items for different roles
  const menuItems = {
    // Customer (role 0)
    0: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "📊",
        path: "/dashboard",
        description: "Overzicht van uw account",
      },
      {
        id: "mijnauto",
        label: "Mijn auto(s)",
        icon: "🚗",
        path: "/dashboard/mijnauto",
        description: "Voertuig informatie",
      },
      {
        id: "afspraken",
        label: "Afspraken",
        icon: "📅",
        path: "/dashboard/afspraken",
        description: "Uw geplande afspraken",
      },
      {
        id: "facturen",
        label: "Facturen",
        icon: "🧾",
        path: "/dashboard/facturen",
        description: "Uw factuuroverzicht",
      },
      {
        id: "berichten",
        label: "Berichten",
        icon: "📧",
        path: "/dashboard/berichten",
        description: "Notificaties en berichten",
      },
    ],
    // Mechanic (role 1)
    1: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "📊",
        path: "/dashboard",
        description: "Werkdag overzicht",
      },
      {
        id: "rooster",
        label: "Afspraken",
        icon: "📅",
        path: "/dashboard/rooster",
        description: "Uw werkrooster",
      },
      {
        id: "klanten",
        label: "Klanten",
        icon: "👥",
        path: "/dashboard/klanten",
        description: "Klantinformatie",
      },
      {
        id: "rapporten",
        label: "Rapporten",
        icon: "📋",
        path: "/dashboard/rapporten",
        description: "Werk rapporten",
      },
      {
        id: "berichten",
        label: "Berichten",
        icon: "📧",
        path: "/dashboard/berichten",
        description: "Mededelingen",
      },
    ],
    // Manager (role 2)
    2: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "📊",
        path: "/dashboard",
        description: "Bedrijfsoverzicht",
      },
      {
        id: "afspraken",
        label: "Afspraken",
        icon: "📅",
        path: "/dashboard/rooster",
        description: "Alle afspraken beheren",
      },
      {
        id: "facturen",
        label: "Facturen",
        icon: "🧾",
        path: "/dashboard/facturen",
        description: "Factuur management",
      },
      {
        id: "gebruikers",
        label: "Gebruikers",
        icon: "👥",
        path: "/dashboard/gebruikers",
        description: "Personeel beheer",
      },
      {
        id: "rapporten",
        label: "Rapporten",
        icon: "📈",
        path: "/dashboard/rapporten",
        description: "Business intelligence",
      },
      {
        id: "instellingen",
        label: "Instellingen",
        icon: "⚙️",
        path: "/dashboard/instellingen",
        description: "Systeembeheer",
      },
    ],
  };

  // Get role-specific menu items
  const currentMenuItems = menuItems[userRole] || menuItems[0];

  // Get role-specific title
  const getRoleTitle = () => {
    switch (userRole) {
      case 0:
        return "Klant Profiel";
      case 1:
        return "Monteur Profiel";
      case 2:
        return "Manager Profiel";
      default:
        return "Gebruiker Profiel";
    }
  };

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const isActive = (path) => {
    if (path === "/dashboard") {
      return currentPath === "/dashboard";
    }
    return currentPath && currentPath.startsWith(path);
  };

  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <h1>
            APK<span className="sidebar-logo-accent">KLAAR</span>
          </h1>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="sidebar-profile">
        <div className="sidebar-profile-title">{getRoleTitle()}</div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {currentMenuItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-nav-item ${
              isActive(item.path) ? "active" : ""
            }`}
            onClick={() => handleNavigation(item.path)}
            title={item.description}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span className="sidebar-nav-label">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Additional Role-specific Info */}
      {userRole === 2 && (
        <div className="sidebar-footer">
          <div className="sidebar-footer-item">
            <span className="sidebar-footer-label">Systeem Status</span>
            <span className="sidebar-footer-status active">🟢 Online</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
