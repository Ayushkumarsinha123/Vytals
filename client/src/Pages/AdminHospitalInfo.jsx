
import React from "react";
import { useNavigate } from "react-router-dom";

const bedData = [
  { type: "ICU", available: 10, total: 15 },
  { type: "Emergency", available: 5, total: 10 },
  { type: "General", available: 20, total: 30 },
];

const HospitalAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">CityCare Hospital - Bed Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bedData.map((bed, index) => (
          <div
            key={index}
            onClick={() => navigate(`/admin/beds/${bed.type.toLowerCase()}`)}
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-green-50"
          >
            <h2 className="text-xl font-semibold">{bed.type} Beds</h2>
            <p className="mt-2 text-gray-700">{bed.available} / {bed.total} Available</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalAdminDashboard;
