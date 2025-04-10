import React, { useState } from 'react';

const OPDRegistrationForm = ({ doctorInfo, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    reason: '',
    timeSlot: '',
  });

  const timeSlots = ['10:00 AM', '11:00 AM', '12:30 PM', '2:00 PM', '4:30 PM'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked with ${doctorInfo.doctor} at ${formData.timeSlot}`);
    onClose();
    /// for backend 
  };

  return (
    <div className="bg-gray-100 p-4 rounded mt-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        Book Appointment - {doctorInfo.department} ({doctorInfo.doctor})
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          className="w-full p-2 border rounded"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          name="reason"
          placeholder="Reason for Visit"
          className="w-full p-2 border rounded"
          value={formData.reason}
          onChange={handleChange}
          required
        />
        <select
          name="timeSlot"
          className="w-full p-2 border rounded"
          value={formData.timeSlot}
          onChange={handleChange}
          required
        >
          <option value="">Select Time Slot</option>
          {timeSlots.map((slot, i) => (
            <option key={i} value={slot}>{slot}</option>
          ))}
        </select>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default OPDRegistrationForm;
