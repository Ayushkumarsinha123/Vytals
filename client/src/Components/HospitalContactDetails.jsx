import React from 'react';

const HospitalContactDetails = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      <p>Phone: +91-9876543210</p>
      <p>Emergency: +91-9999999999</p>
      <p>Address: Main Road, Delhi</p>
      <iframe
        src="https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="200"
        allowFullScreen=""
        loading="lazy"
        className="mt-4 rounded"
        title="Hospital Location"
      ></iframe>
    </div>
  );
};

export default HospitalContactDetails;