import React, { useState } from 'react';
import OPDRegistrationForm from '../Pages/OPDRegistrationForm';

const OPDAppointmentSection = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const opdList = [
    {
      department: 'Cardiology',
      doctor: 'Dr. Ahuja',
      nextSlot: '10:30 AM',
    },
    {
      department: 'Dermatology',
      doctor: 'Dr. Singh',
      nextSlot: '11:00 AM',
    },
  ];

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">OPD Appointments</h2>
      <div className="space-y-3">
        {opdList.map((opd, index) => (
          <div key={index} className="border p-3 rounded">
            <p className="font-medium">{opd.department} - {opd.doctor}</p>
            <p className="text-sm text-gray-600">Next Slot: {opd.nextSlot}</p>
            <button
              onClick={() => setSelectedDoctor(opd)}
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Book
            </button>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <OPDRegistrationForm
          doctorInfo={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
};

export default OPDAppointmentSection;
