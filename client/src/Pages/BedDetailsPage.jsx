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
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-sm text-blue-600">
          ← Back
        </button>
        <button
          onClick={generateRandomPatient}
          className="bg-green-500 text-white px-4 py-2 rounded shadow"
        >
          + Generate Patient
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 capitalize">
        {bedType} Beds - Patient List
      </h2>

      <div className="bg-white p-4 rounded shadow">
        {patients.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600">
                <th>Name</th>
                <th>Bed Type</th>
                <th>Reason</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id} className="border-t hover:bg-gray-50">
                  <td className="py-2">{patient.patientName}</td>
                  <td>{patient.patientBedType.toUpperCase()}</td>
                  <td>{patient.patientReasonForVisit}</td>
                  <td>
                    <button
                      onClick={() => releasePatient(patient._id)}
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
