import React from 'react';

const HospitalContactDetails = () => {
  return (
    <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-green-800 mb-6">Contact Information</h2>
      <p className="text-gray-700 mb-2">Phone: <span className="text-green-700">+91-9876543210</span></p>
      <p className="text-gray-700 mb-2">Emergency: <span className="text-red-700">+91-9999999999</span></p>
      <p className="text-gray-700 mb-4">Address: <span className="text-blue-700">Main Road, Delhi</span></p>
      <iframe
        src="https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="200"
        allowFullScreen=""
        loading="lazy"
        className="mt-4 rounded-lg shadow-md"
        title="Hospital Location"
      ></iframe>
    </div>
  );
};

export default HospitalContactDetails;
