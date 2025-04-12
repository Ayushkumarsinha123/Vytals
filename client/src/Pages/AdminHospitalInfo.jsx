// src/pages/adminHospitalInfo.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../Contexts/WebSocketContext";

const bedData = [
  { type: "ICU", available: 10, total: 15 },
  { type: "Emergency", available: 5, total: 10 },
  { type: "General", available: 20, total: 30 },
];

const HospitalAdminDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const socket = useWebSocket();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:6010/api/v1/opd");
        const responseData = await res.json();
        setAppointments(responseData.data.appointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.eventType === "BED_REQUEST_ACK") {
        console.log("Received BED_REQUEST_ACK:", data);
        // You can update UI here
      }
    };

    // Optional: cleanup
    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        CityCare Hospital - Bed Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {bedData.map((bed, index) => (
          <div
            key={index}
            onClick={() => navigate(`/admin/beds/${bed.type.toLowerCase()}`)}
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-green-50"
          >
            <h2 className="text-xl font-semibold">{bed.type} Beds</h2>
            <p className="mt-2 text-gray-700">
              {bed.available} / {bed.total} Available
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">OPD Appointments</h2>
        {appointments.length > 0 ? (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-2 border">Patient</th>
                <th className="p-2 border">Contact</th>
                <th className="p-2 border">Department</th>
                <th className="p-2 border">Doctor</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time Slot</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, idx) => (
                <tr key={idx} className="text-center border-t hover:bg-gray-50">
                  <td className="p-2 border">{appt.patientName}</td>
                  <td className="p-2 border">{appt.contact}</td>
                  <td className="p-2 border">{appt.department}</td>
                  <td className="p-2 border">{appt.doctorName}</td>
                  <td className="p-2 border">
                    {new Date(appt.appointmentDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">{appt.timeSlot}</td>
                  <td className="p-2 border">{appt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No OPD appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default HospitalAdminDashboard;
