import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
