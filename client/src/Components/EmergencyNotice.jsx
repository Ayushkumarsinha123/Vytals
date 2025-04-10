import React from 'react';

const EmergencyNotice = () => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
      <p><strong>Notice:</strong> Emergency beds are currently full. Please check nearby hospitals or contact emergency services.</p>
    </div>
  );
};

export default EmergencyNotice;
