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
    <div className="bg-gradient-to-r from-green-100 to-green-200 shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-6 text-green-800">OPD Appointments</h2>
      <div className="space-y-4">
        {opdList.map((opd, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-5 rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            <p className="font-medium text-lg text-green-700">{opd.department} - {opd.doctor}</p>
            <p className="text-sm text-gray-600">Next Slot: {opd.nextSlot}</p>
            <button
              onClick={() => setSelectedDoctor(opd)}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all duration-300"
            >
              Book Appointment
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
