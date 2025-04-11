import { BrowserRouter, Routes, Route } from "react-router-dom";
import HospitalAdminDashboard from "./Pages/AdminHospitalInfo";
import BedDetailsPage from "./Pages/BedDetailsPage";

import Map from "./Pages/Map";

import "./App.css";
import HospitalPage from "./Pages/HospitalPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/hospital" element={<HospitalPage />} />
          <Route path="/hospitalAdmin" element={<HospitalAdminDashboard/>}/>
          <Route path="/admin/beds/:bedType" element={<BedDetailsPage />} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
