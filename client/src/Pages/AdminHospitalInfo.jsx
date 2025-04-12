import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const bedData = [
  { type: "ICU", available: 10, total: 15 },
  { type: "Emergency", available: 5, total: 10 },
  { type: "General", available: 20, total: 30 },
];

const HospitalAdminDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:6010/api/v1/opd");
        const responseData = await res.json();
        const appointments = responseData.data.appointments;

        setAppointments(appointments);

        if (appointments.length > 0) {
          const latest = appointments[appointments.length - 1];
          const message = `${latest.patientName} has booked an appointment with Dr. ${latest.doctorName} (${latest.department})`;
          setLatestMessage(message);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-100 to-green-200 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">CityCare Hospital - Bed Management</h1>

      {/* Bed Management Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {bedData.map((bed, index) => (
          <div
            key={index}
            onClick={() => navigate(`/admin/beds/${bed.type.toLowerCase()}`)}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-gray-800">{bed.type} Beds</h2>
            <p className="mt-2 text-lg text-gray-600">
              {bed.available} / {bed.total} Available
            </p>
          </div>
        ))}
      </div>

      {/* Message Component */}
      {latestMessage && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">New Appointment: </strong>
          <span className="block sm:inline">{latestMessage}</span>
          <span
            onClick={() => setLatestMessage(null)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
          >
            <svg
              className="fill-current h-6 w-6 text-yellow-800"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414L8.586 8.586l-2.934 2.934a1 1 0 101.414 1.414L10 10.828l2.934 2.934a1 1 0 001.414-1.414l-2.934-2.934 2.934-2.934z" />
            </svg>
          </span>
        </div>
      )}

      {/* Appointments Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">OPD Appointments</h2>
        {appointments.length > 0 ? (
          <table className="w-full table-auto border-collapse shadow-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4 border">Patient</th>
                <th className="p-4 border">Contact</th>
                <th className="p-4 border">Department</th>
                <th className="p-4 border">Doctor</th>
                <th className="p-4 border">Date</th>
                <th className="p-4 border">Time Slot</th>
                <th className="p-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, idx) => (
                <tr key={idx} className="text-center border-t hover:bg-gray-50 transition-all duration-300">
                  <td className="p-4 border">{appt.patientName}</td>
                  <td className="p-4 border">{appt.contact}</td>
                  <td className="p-4 border">{appt.department}</td>
                  <td className="p-4 border">{appt.doctorName}</td>
                  <td className="p-4 border">
                    {new Date(appt.appointmentDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 border">{appt.timeSlot}</td>
                  <td className="p-4 border">{appt.status}</td>
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
