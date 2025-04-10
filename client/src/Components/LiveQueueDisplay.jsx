import React from 'react';

const LiveQueueDisplay = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Live OPD Queue</h2>
      <p>Current Patients in Queue: <span className="font-bold">10</span></p>
    </div>
  );
};

export default LiveQueueDisplay;