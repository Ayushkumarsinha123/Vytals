import React from "react";
import { useWebSocket } from "../Contexts/WebSocketContext";

const BedAvailability = () => {
  const socket = useWebSocket(); // Access WebSocket instance from context

  // Sample bed data — this can later come from props or an API
  const beds = [
    { type: "General Beds", total: 30, available: 12 },
    { type: "ICU Beds", total: 10, available: 4 },
    { type: "Emergency Beds", total: 5, available: 0 }, // full
  ];

  // Send BED_REQUEST EVENT to the backend
  const handleRequest = (bed) => {
    if (bed.available > 0) {
      console.log(bed);
      const payload = {
        eventType: "BED_REQUEST",
        bedType: bed.type,
        available: bed.available,
        timestamp: new Date().toISOString(), // Optional: useful for debugging/sync
      };

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(payload));
        console.log("Sent to WebSocket server:", payload);
      } else {
        console.warn("WebSocket is not open.");
      }
    } else {
      console.log("No beds available. Can't send request.");
    }
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Bed Availability</h2>
      <ul className="space-y-3">
        {beds.map((bed, index) => (
          <li
            key={index}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-medium">{bed.type}</p>
              <p className="text-sm text-gray-600">
                {bed.available}/{bed.total} Available
              </p>
            </div>

            {bed.type !== "General Beds" && (
              <button
                onClick={() => handleRequest(bed)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Request
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BedAvailability;
