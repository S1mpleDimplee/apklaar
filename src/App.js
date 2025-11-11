import "./App.css";
// import TandartsRegistratie from "./Registration/Register/Registration";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
// import NavbarHome from "./Navbars/Navbars/NavbarHome/NavbarHome";
// import NavbarDashboard from "./Navbars/Navbars/NavbarPanel/NavbarDashboard";
// import Sidebar from "./Navbars/Sidebar/Sidebar";
import Home from "./MainPages/Home/Home";
// import Footer from "./Footer/Footer";
import { ToastProvider, useToast } from "./toastmessage/toastmessage";
import postCall from "./Calls/calls";
import Footer from "./Footer/Footer";
import NavbarHome from "./Navbar/NavbarHome/Navbarhome";
import Register from "./registerpages/register/register";
import Login from "./registerpages/login/login";
import Verify from "./registerpages/emailverify/verify";

// Inner component that uses useLocation
function AppContent() {
  const location = useLocation();
  const [isPatientDashboard, setIsPatientDashboard] = useState(false);
  const patientDashboardUrls = ["/dashboard", "/dashboard-tandarts", "/dashboard/rooster", "/dashboard/profile", "/dashboard/patienten",
    "/dashboard/gebruikers",];

  const [currentRole, setCurrentRole] = useState(null);
  const nonLoggedInUrls = ["/", "/inloggen", "/registreren"];
  const isNonLoggedIn = nonLoggedInUrls.includes(location.pathname);

  const usedUrls = [...patientDashboardUrls, ...nonLoggedInUrls];

  const loginpages = ["/inloggen", "/registreren", "/inloggen/verify"];

  const navigate = useNavigate();

  // const { openToast } = useToast();


  // useEffect(() => {

  //   const loggedInData = JSON.parse(localStorage.getItem("loggedInData"));
  //   if (loggedInData) {
  //     setCurrentRole(parseInt(loggedInData.role));
  //   }
  //   checkIfLoginDataChangedFromDatabase();
  // }, [location.pathname]);

  // const checkIfLoginDataChangedFromDatabase = async () => {
  //   const loggedInData = JSON.parse(localStorage.getItem("loggedInData"));
  //   if (loggedInData) {
  //     const response = await postCall("fetchuserdata", loggedInData.userid);
  //     if (response.isSuccess) {
  //       if (response.data.role !== loggedInData.role.toString() ||
  //         response.data.email !== loggedInData.email ||
  //         response.data.userid !== loggedInData.userid ||
  //         response.data.firstname !== loggedInData.firstName ||
  //         response.data.lastname !== loggedInData.lastName) {
  //         localStorage.removeItem("loggedInData");
  //         navigate("/inloggen");

  //         openToast(`WAARSCHUWING! U heeft uw informatie aangepast in uw locale data. Log opnieuw in.`);
  //       }
  //     }
  //     else {
  //       openToast("Er is iets misgegaan bij het ophalen van uw gegevens. Log opnieuw in.");
  //       console.log("Database info:", response.data, "LocalStorage info:", loggedInData);
  //       localStorage.removeItem("loggedInData");
  //       navigate("/inloggen");
  //     }
  //   }
  // };

  useEffect(() => {
    setIsPatientDashboard(patientDashboardUrls.includes(location.pathname));
    // checkIfUserIsLoggedIn();
  }, [location.pathname]);

  // const checkIfUserIsLoggedIn = () => {
  //   const loggedInData = JSON.parse(localStorage.getItem("loggedInData"));
  //   if (!loggedInData && !isNonLoggedIn && usedUrls.includes(location.pathname)) {
  //     navigate("/inloggen");
  //   }
  // };

  return (
    <div className="app-container">
      {/* Navbar at the top */}
      {isPatientDashboard ? <NavbarHome /> : <NavbarHome />}

      {/* Content area with sidebar and main content */}
      <div className="content-wrapper">
        {/* {isPatientDashboard && <Sidebar />} */}

        {/* Main content area */}
        <main className={`main-content ${isPatientDashboard ? 'dashboard-main-content' : ''}`}>
          <Routes>

            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/registreren" element={<Register />} />
            <Route path="/inloggen" element={<Login />} />
            <Route path="/inloggen/verify" element={<Verify />} />
            {/* <Route path="*" element={<NotFound />} /> */}

            {/* Patient Dashboard routes */}
            {/* {currentRole === 0 && ( */}
              {/* <> */}
                {/* <Route path="/dashboard" element={<DashboardPatient />} /> */}
                {/* <Route path="/dashboard/profile" element={<PatientProfile />} /> */}
              {/* </> */}
            {/* )} */}

            {/* Dentist Dashboard routes */}
            {/* {currentRole === 1 && ( */}
              {/* <>
                <Route path="/dashboard" element={<DashboardTandarts />} />
                <Route path="/dashboard/patienten" element={<DentistUsers />} />
                <Route path="/dashboard/rooster" element={<DentisTimetable />} />
              {/* </> */}
            {/* )} */}

            {/* Manager Dashboard route */}
            {/* {currentRole === 3 && (
              <>
                <Route path="/dashboard" element={<UserInfo />} />
                <Route path="/dashboard/gebruikers" element={<UserPage />} />
              {/* </> */}
            {/* )} */}

          </Routes>
        </main>


      </div>
      <footer className="footer">
        {isPatientDashboard || loginpages ? null : <Footer />}
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