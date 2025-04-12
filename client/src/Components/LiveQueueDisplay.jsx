import React from 'react';

const LiveQueueDisplay = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-800">Live OPD Queue</h2>
      <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out">
        <p className="text-lg text-gray-700">
          Current Patients in Queue: <span className="font-bold text-blue-600">10</span>
        </p>
      </div>
    </div>
  );
};

export default LiveQueueDisplay;
