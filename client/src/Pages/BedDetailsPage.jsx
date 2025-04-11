// src/pages/BedDetailsPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialPatients = {
  icu: [
    { id: 1, name: "naruto", bedNo: "ICU-03", reason: "Cardiac Arrest" },
    { id: 2, name: "chomesh", bedNo: "ICU-07", reason: "Stroke" },
  ],
  emergency: [
    { id: 1, name: "Anurag", bedNo: "EM-02", reason: "Accident" },
  ],
  general: [
    { id: 1, name: "ashish", bedNo: "GEN-10", reason: "Fever" },
    { id: 2, name: "alok", bedNo: "GEN-12", reason: "Injury" },
  ],
};

const BedDetailsPage = () => {
  const { bedType } = useParams();
  const [patients, setPatients] = useState(initialPatients[bedType] || []);
  const navigate = useNavigate();

  const releasePatient = (id) => {
    const updated = patients.filter((p) => p.id !== id);
    setPatients(updated);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button onClick={() => navigate(-1)} className="text-sm text-blue-600 mb-4">← Back</button>
      <h2 className="text-2xl font-bold mb-4 capitalize">{bedType} Beds - Patient List</h2>

      <div className="bg-white p-4 rounded shadow">
        {patients.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600">
                <th>Name</th>
                <th>Bed No.</th>
                <th>Reason</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-t hover:bg-gray-50">
                  <td className="py-2">{patient.name}</td>
                  <td>{patient.bedNo}</td>
                  <td>{patient.reason}</td>
                  <td>
                    <button
                      onClick={() => releasePatient(patient.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Release
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No patients in this section.</p>
        )}
      </div>
    </div>
  );
};

export default BedDetailsPage;
