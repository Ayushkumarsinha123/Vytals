import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HospitalHeader from "../Components/HospitalHeader";
import BedAvailability from "../Components/BedAvailability";
import OPDAppointmentSection from "../Components/OPDAppointmentSection";
import LiveQueueDisplay from "../Components/LiveQueueDisplay";
import HospitalContactDetails from "../Components/HospitalContactDetails";
import EmergencyNotice from "../Components/EmergencyNotice";

const HospitalPage = () => {
  const { hospitalId } = useParams();
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

  if (!hospital) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="text-xl font-medium text-gray-700">Loading hospital data...</div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 min-h-screen py-6 px-4 md:px-12">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <HospitalHeader hospital={hospital} />
        </div>

        {/* Emergency Notice */}
        <div className="bg-gradient-to-r from-red-100 via-red-50 to-white border border-red-200 rounded-2xl shadow-md p-4">
          <EmergencyNotice hospital={hospital} />
        </div>

        {/* Bed Availability */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 border-b pb-2">🛏️ Bed Availability</h2>
          <BedAvailability hospital={hospital} />
        </div>

        {/* OPD Appointment Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 border-b pb-2">📅 Book an OPD Appointment</h2>
          <OPDAppointmentSection hospital={hospital} />
        </div>

        {/* Live Queue Display */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 border-b pb-2">⏳ Live Queue Status</h2>
          <LiveQueueDisplay hospital={hospital} />
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 border-b pb-2">📞 Contact Details</h2>
          <HospitalContactDetails hospital={hospital} />
        </div>

      </div>
    </div>
  );
};

export default HospitalPage;
