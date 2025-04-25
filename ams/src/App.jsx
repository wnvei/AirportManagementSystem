import { useState, useEffect } from "react";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { Flights } from "./components/sections/Flights";
import "./index.css";
import About from "./components/pages/About";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Explore from "./components/pages/Explore";
import Login from "./components/pages/Login";
import Admin from "./components/pages/admin";
import Crew from "./components/pages/crew";
import Device from "./components/sections/Device";

function AppRoutes({ isLaptop }) {
  const location = useLocation();

  if (!isLaptop && location.pathname !== "/device") {
    return <Navigate to="/device" replace />;
  }

  return (
    <>
      <Navbar />
      <MobileMenu />
      <Routes>
        <Route path="/" element={<><Home /><Flights /></>} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/device" element={<Device />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLaptop, setIsLaptop] = useState(true);

  useEffect(() => {
    const ua = navigator.userAgent;
    const blockedDevices = [
      'iPad Pro', 'iPad Air', 'iPad', 'iPhone', 'Android', 'Mobile',
      'ASUS_Zenbook', 'ASUS', 'Surface Pro 7', 'Surface Duo', 'Touch', 'Tablet'
    ];
    const isBlocked = blockedDevices.some(device => ua.includes(device));
    const isSmallScreen = window.innerWidth < 1024;

    if (isBlocked || isSmallScreen) {
      setIsLaptop(false);
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <Router basename="/ams">
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-gray-100`}
      >
        <AppRoutes isLaptop={isLaptop} />
      </div>
    </Router>
  );
}

export default App;