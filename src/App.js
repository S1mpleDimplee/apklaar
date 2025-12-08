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

// Inner component that uses useLocation
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPatientDashboard, setIsPatientDashboard] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define dashboard URLs for all roles
  const dashboardUrls = [
    "/dashboard",
    "/dashboard/mijnauto",
    "/dashboard/berichten",
    "/dashboard/afspraken",
    "/dashboard/facturen",
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
    "/inloggen/verify",
  ];
  const isNonLoggedIn = nonLoggedInUrls.includes(location.pathname);
  const loginpages = ["/inloggen", "/registreren", "/inloggen/verify"];

  // const { openToast } = useToast();

  useEffect(() => {
    // Check if user is logged in and get their role
    checkUserLoginStatus();
    setIsPatientDashboard(dashboardUrls.includes(location.pathname));
  }, [location.pathname]);

  const checkUserLoginStatus = () => {
    const loggedInData = JSON.parse(localStorage.getItem("loggedInData"));
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
      {/* Navbar at the top */}
      <NavbarHome />

      {/* Content area with sidebar and main content */}
      <div className="content-wrapper">
        {/* Sidebar - only show when logged in and on dashboard pages */}
        {isLoggedIn && isPatientDashboard && (
          <Sidebar
            userRole={currentRole}
            onNavigate={handleSidebarNavigation}
            currentPath={location.pathname}
          />
        )}

        {/* Main content area */}
        <main
          className={`main-content ${
            isLoggedIn && isPatientDashboard ? "dashboard-main-content" : ""
          }`}
        >
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/registreren" element={<Register />} />
            <Route path="/inloggen" element={<Login />} />
            <Route path="/inloggen/verify" element={<Verify />} />
            {/* <Route path="*" element={<NotFound />} /> */}

            {/* Protected Dashboard routes - only accessible when logged in */}
            {isLoggedIn && (
              <>
                {/* Customer Dashboard routes (role 0) */}
                {currentRole === 0 && (
                  <>
                    <Route path="/dashboard" element={<DashboardKlant />} />
                    <Route
                      path="/dashboard/mijnauto"
                      element={<CarDetails />}
                    />
                    <Route
                      path="/dashboard/berichten"
                      element={<CustomerNotifications />}
                    />
                    {/* Add more customer routes as needed */}
                    {/* <Route path="/dashboard/afspraken" element={<CustomerAppointments />} />
                    <Route path="/dashboard/facturen" element={<CustomerInvoices />} /> */}
                  </>
                )}

                {/* Mechanic Dashboard routes (role 1) */}
                {currentRole === 1 && (
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
                    {/* Add more mechanic routes as needed */}
                    {/* <Route path="/dashboard/klanten" element={<MechanicCustomers />} />
                    <Route path="/dashboard/rapporten" element={<MechanicReports />} />
                    <Route path="/dashboard/berichten" element={<MechanicNotifications />} /> */}
                  </>
                )}

                {/* Manager Dashboard routes (role 2) */}
                {currentRole === 2 && (
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
                    {/* Add more manager routes as needed */}
                    {/* <Route path="/dashboard/gebruikers" element={<ManagerUsers />} />
                    <Route path="/dashboard/rapporten" element={<ManagerReports />} />
                    <Route path="/dashboard/instellingen" element={<ManagerSettings />} /> */}
                  </>
                )}
              </>
            )}
          </Routes>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        {!(isPatientDashboard || loginpages.includes(location.pathname)) && (
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
