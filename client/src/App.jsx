import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import HospitalAdminDashboard from "./Pages/AdminHospitalInfo";
import BedDetailsPage from "./Pages/BedDetailsPage";

import Map from "./Pages/Map";

import "./App.css";
import HospitalPage from "./Pages/HospitalPage";
import { WebSocketProvider } from "./Contexts/WebSocketContext";

function App() {
  const [userLocation, setUserLocation] = useState(null);

  // Get USER-LOCATION
  function getUserLocation() {
    // Getting current-location from Local-Storage
    const storedLocation = localStorage.getItem("userLocation");

    if (storedLocation) {
      // Get LOCATION from Local-Storage
      setUserLocation(JSON.parse(storedLocation));
    } else {
      // Store LOCATION in Local-Storage on first visit
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            localStorage.setItem("userLocation", JSON.stringify(location));
            setUserLocation(location);
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      } else {
        console.error("Geolocation not available");
      }
    }
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div>
      <WebSocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Map userLocation={userLocation} />} />
            <Route path="/hospital" element={<HospitalPage />} />
            <Route path="/hospitalAdmin" element={<HospitalAdminDashboard />} />
            <Route path="/admin/beds/:bedType" element={<BedDetailsPage />} />
          </Routes>
        </BrowserRouter>
      </WebSocketProvider>
    </div>
  );
}

export default App;
