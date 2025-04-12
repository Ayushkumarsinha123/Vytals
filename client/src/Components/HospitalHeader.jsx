import React from "react";

const HospitalHeader = ({ hospital }) => {
  return (
    <div className="bg-white shadow rounded p-4 text-center">
      <h1 className="text-3xl font-bold text-green-700">
        {hospital.data.name}
      </h1>
      <p className="text-gray-600">{hospital.data.address}</p>
    </div>
  );
};

export default HospitalHeader;
