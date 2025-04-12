// src/pages/BedDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BedDetailsPage = () => {
  const { bedType } = useParams();
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  // Fetch patients on component mount or when bedType changes
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:6010/api/v1/patient");
        const filtered = res.data.data.patients.filter(
          (p) => p.patientBedType.toLowerCase() === bedType.toLowerCase()
        );
        setPatients(filtered);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [bedType]);

  // Generate a random patient and add to DB
  const generateRandomPatient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:6010/api/v1/patient/generate/${bedType}`
      );
      setPatients((prev) => [...prev, res.data.data.patient]);
    } catch (error) {
      console.error("Error generating patient:", error);
    }
  };

  // Delete patient by ID
  const releasePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:6010/api/v1/patient/${id}`);
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error releasing patient:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-green-200 min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="text-sm text-blue-600">
          ← Back
        </button>
        <button
          onClick={generateRandomPatient}
          className="bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          + Generate Patient
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6 capitalize text-gray-800">
        {bedType} Beds - Patient List
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        {patients.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-4">Name</th>
                <th className="p-4">Bed Type</th>
                <th className="p-4">Reason</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{patient.patientName}</td>
                  <td className="py-3 px-4 text-uppercase">{patient.patientBedType}</td>
                  <td className="py-3 px-4">{patient.patientReasonForVisit}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => releasePatient(patient._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all duration-300"
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
