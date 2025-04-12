import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HospitalHeader from "../Components/HospitalHeader";
import BedAvailability from "../Components/BedAvailability";
import OPDAppointmentSection from "../Components/OPDAppointmentSection";
import LiveQueueDisplay from "../Components/LiveQueueDisplay";
import HospitalContactDetails from "../Components/HospitalContactDetails";
import EmergencyNotice from "../Components/EmergencyNotice";

const HospitalPage = () => {
  const { hospitalId } = useParams(); // <- get id from URL
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await fetch(
          `http://localhost:6010/api/v1/get-nearest-hospitals/distances/${hospitalId}`
        );
        const data = await res.json();
        console.log(data);
        setHospital(data);
      } catch (err) {
        console.error("Error fetching hospital:", err);
      }
    };

    fetchHospital();
  }, [hospitalId]);

  if (!hospital) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <HospitalHeader hospital={hospital} />
      <EmergencyNotice hospital={hospital} />
      <BedAvailability hospital={hospital} />
      <OPDAppointmentSection hospital={hospital} />
      <LiveQueueDisplay hospital={hospital} />
      <HospitalContactDetails hospital={hospital} />
    </div>
  );
};

export default HospitalPage;
