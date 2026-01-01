import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./MainPages/Home/Home";
import { ToastProvider, useToast } from "./toastmessage/toastmessage";
import postCall from "./Calls/calls";

import Footer from "./Footer/Footer";
import NavbarHome from "./Navbar/NavbarHome/Navbarhome";
import Register from "./registerpages/register/register";
import Login from "./registerpages/login/login";
import Verify from "./registerpages/emailverify/verify";
import DashboardKlant from "./CustomerDashboard/Dashboard/Dashboard";
import CarDetails from "./CustomerDashboard/CarDetails/CarDetails";
import CustomerNotifications from "./CustomerDashboard/Notifications/Notifications";
import MechanicDashboard from "./MechanicDashboard/Dashboard/Dashboard";
import MechanicTimeTable from "./MechanicDashboard/TimeTable/TimeTable";
import AppointmentInfo from "./MechanicDashboard/AppointmentInfo/AppointmentInfo";
import ManagerDashboard from "./ManagerDashboard/Dashboard/Dashboard";
import ManagerInvoices from "./ManagerDashboard/Invoices/invoices";
import ManagerTimeTable from "./ManagerDashboard/TimeTable/TimeTable";
import Sidebar from "./Navbar/SidebarDashboard/Sidebar"; // Import the new Sidebar component
import NavbarDashboard from "./Navbar/NavbarDashboard/NavbarDashboard";
import InvoicesCustomer from "./CustomerDashboard/Invoices/Invoices";
import downloadApiCall from "./Calls/downloadCall";

// Inner component that uses useLocation
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDashboard, setIsDashboard] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define dashboard URLs for all roles
  const dashboardUrls = [
    "/dashboard",
    "/dashboard/mijnauto",
    "/dashboard/berichten",
    "/dashboard/afspraken",
    "/dashboard/facturen",
    "/dashboard/facturen/betaling-mislukt",
    "/dashboard/facturen/betaling-gelukt",
    "/dashboard/rooster",
    "/dashboard/rooster/afspraakinformatie",
    "/dashboard/klanten",
    "/dashboard/rapporten",
    "/dashboard/gebruikers",
    "/dashboard/instellingen",
  ];

  const nonLoggedInUrls = [
    "/",
    "/inloggen",
    "/registreren",
    "/verificatie",
  ];
  const isNonLoggedIn = nonLoggedInUrls.includes(location.pathname);
  const loginpages = ["/inloggen", "/registreren", "/verificatie"];

  // const { openToast } = useToast();

  useEffect(() => {
    // Check if user is logged in and get their role
    checkUserLoginStatus();
    setIsDashboard(dashboardUrls.includes(location.pathname));
  }, [location.pathname]);

  const checkUserLoginStatus = () => {
    const loggedInData = JSON.parse(localStorage.getItem("userdata"));
    if (loggedInData) {
      setIsLoggedIn(true);
      setCurrentRole(parseInt(loggedInData.role));
      // You can uncomment this if you want to verify user data from database
      // checkIfLoginDataChangedFromDatabase();
    } else {
      setIsLoggedIn(false);
      // Redirect to login if trying to access dashboard without being logged in
      if (dashboardUrls.includes(location.pathname)) {
        navigate("/inloggen");
      }
    }
  };

  // Uncomment this function if you want to verify user data from database
  // const checkIfLoginDataChangedFromDatabase = async () => {
  //   const loggedInData = JSON.parse(localStorage.getItem("loggedInData"));
  //   if (loggedInData) {
  //     try {
  //       const response = await postCall("fetchuserdata", loggedInData.userid);
  //       if (response.isSuccess) {
  //         if (response.data.role !== loggedInData.role.toString() ||
  //           response.data.email !== loggedInData.email ||
  //           response.data.userid !== loggedInData.userid ||
  //           response.data.firstname !== loggedInData.firstName ||
  //           response.data.lastname !== loggedInData.lastName) {
  //           localStorage.removeItem("loggedInData");
  //           navigate("/inloggen");
  //           openToast(`WAARSCHUWING! Uw informatie is gewijzigd. Log opnieuw in.`);
  //         }
  //       } else {
  //         openToast("Er is iets misgegaan bij het ophalen van uw gegevens. Log opnieuw in.");
  //         localStorage.removeItem("loggedInData");
  //         navigate("/inloggen");
  //       }
  //     } catch (error) {
  //       console.error("Error checking user data:", error);
  //     }
  //   }
  // };

  const handleSidebarNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="app-container">
      <head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
      </head>
      {/* Navbar at the top */}
      {!isDashboard && <NavbarHome />}

      {/* Content area with sidebar and main content */}
      <div className="content-wrapper">
        {/* Sidebar - only show when logged in and on dashboard pages */}
        {isLoggedIn && isDashboard && (
          <Sidebar
            userRole={currentRole}
            onNavigate={handleSidebarNavigation}
            currentPath={location.pathname}
          />
        )}

        {/* Main content area with dashboard navbar inside */}
        <main
          className={`main-content ${isLoggedIn && isDashboard ? "dashboard-main-content" : ""
            }`}
        >
          {/* Dashboard Navbar - show inside main content area next to sidebar */}
          {isLoggedIn && isDashboard && <NavbarDashboard />}

          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/registreren" element={<Register />} />
            <Route path="/inloggen" element={<Login />} />
            <Route path="/verificatie" element={<Verify />} />

            {/* Protected Dashboard routes - only accessible when logged in */}
            {isLoggedIn && (
              <>
                {/* Customer Dashboard routes (role 1) */}
                {currentRole === 1 && (
                  <>
                    <Route path="/dashboard" element={<DashboardKlant />} />
                    <Route path="/dashboard/mijnauto" element={<CarDetails />} />
                    <Route
                      path="/dashboard/berichten"
                      element={<CustomerNotifications />}
                    />
                    <Route path="/dashboard/facturen" element={<InvoicesCustomer />} />
                    <Route path="/dashboard/facturen/betaling-mislukt" element={<InvoicesCustomer />} />
                    <Route path="/dashboard/facturen/betaling-gelukt" element={<InvoicesCustomer />} />
                  </>
                )}

                {/* Mechanic Dashboard routes (role 2) */}
                {currentRole === 2 && (
                  <>
                    <Route path="/dashboard" element={<MechanicDashboard />} />
                    <Route
                      path="/dashboard/rooster"
                      element={<MechanicTimeTable />}
                    />
                    <Route
                      path="/dashboard/rooster/afspraakinformatie"
                      element={<AppointmentInfo />}
                    />
                  </>
                )}

                {/* Manager Dashboard routes (role 3) */}
                {currentRole === 3 && (
                  <>
                    <Route path="/dashboard" element={<ManagerDashboard />} />
                    <Route
                      path="/dashboard/facturen"
                      element={<ManagerInvoices />}
                    />
                    <Route
                      path="/dashboard/rooster"
                      element={<ManagerTimeTable />}
                    />
                  </>
                )}
              </>
            )}
          </Routes>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        {!(isDashboard || loginpages.includes(location.pathname)) && (
          <Footer />
        )}
      </footer>
    </div>
  );
}

// Main App component that provides the Router
function App() {
  return (
    <ToastProvider>
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  );
}

export default App;
