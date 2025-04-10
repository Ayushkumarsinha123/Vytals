import React from 'react';

const OPDAppointmentSection = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">OPD Appointments</h2>
      <div className="space-y-3">
        <div className="border p-3 rounded">
          <p className="font-medium">Cardiology - Dr. Ahuja</p>
          <p className="text-sm text-gray-600">Next Slot: 10:30 AM</p>
          <button className="mt-2 bg-green-600 text-white px-4 py-1 rounded">Book</button>
        </div>
        <div className="border p-3 rounded">
          <p className="font-medium">Dermatology - Dr. Singh</p>
          <p className="text-sm text-gray-600">Next Slot: 11:00 AM</p>
          <button className="mt-2 bg-green-600 text-white px-4 py-1 rounded">Book</button>
        </div>
      </div>
    </div>
  );
};

export default OPDAppointmentSection;
