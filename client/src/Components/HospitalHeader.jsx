import React from "react";
import { MapPin } from "lucide-react"; // Optional: icon for location

const HospitalHeader = ({ hospital }) => {
  const { name, address } = hospital?.data || {};

  return (
    <header className="bg-white shadow-md rounded-2xl p-6 mb-6">
      <h1 className="text-4xl font-extrabold text-green-700 mb-2">
        {name || "Hospital Name"}
      </h1>
      <p className="flex items-center justify-center text-gray-600 text-lg">
        <MapPin className="w-5 h-5 mr-2 text-green-500" />
        {address || "Hospital Address"}
      </p>
    </header>
  );
};

export default HospitalHeader;
