import React, { useState } from 'react';
import axios from 'axios';

const OPDRegistrationForm = ({ doctorInfo, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    contact: '',
    reasonForVisit: '',
    timeSlot: '',
    appointmentDate: '',
  });

  const timeSlots = ['10:00 AM', '11:00 AM', '12:30 PM', '2:00 PM', '4:30 PM'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:6010/api/v1/opd', {
        patientName: formData.patientName,
        contact: formData.contact,
        department: doctorInfo.department,
        doctorName: doctorInfo.doctor,
        reasonForVisit: formData.reasonForVisit,
        timeSlot: formData.timeSlot,
        appointmentDate: new Date(formData.appointmentDate), // converting to Date object
      });

      alert(`Appointment booked with ${doctorInfo.doctor} at ${formData.timeSlot}`);
      onClose();
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Something went wrong while booking. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded mt-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        Book Appointment - {doctorInfo.department} ({doctorInfo.doctor})
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="patientName"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          value={formData.patientName}
          onChange={handleChange}
          required
        />
        <input
          name="contact"
          placeholder="Contact Number"
          className="w-full p-2 border rounded"
          value={formData.contact}
          onChange={handleChange}
        />
        <input
          name="reasonForVisit"
          placeholder="Reason for Visit"
          className="w-full p-2 border rounded"
          value={formData.reasonForVisit}
          onChange={handleChange}
          required
        />
        <input
          name="appointmentDate"
          type="date"
          className="w-full p-2 border rounded"
          value={formData.appointmentDate}
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
