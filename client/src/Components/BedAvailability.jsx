import React, { useState } from "react";
import { useWebSocket } from "../Contexts/WebSocketContext";
import { slugify } from "../utils/slugify";

const BedAvailability = ({ hospital }) => {
  const socket = useWebSocket(); // Access WebSocket instance from context

  const [showModal, setShowModal] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [formData, setFormData] = useState({
    patientName: "",
    emergencyCause: "",
  });

  // Sample bed data — this can later come from props or an API
  const beds = [
    { type: "General Beds", total: 30, available: 12 },
    { type: "ICU Beds", total: 10, available: 4 },
    { type: "Emergency Beds", total: 5, available: 0 }, // full
  ];

  const handleRequest = (bed) => {
    if (bed.available > 0) {
      setSelectedBed(bed);
      setShowModal(true);
    } else {
      console.log("No beds available. Can't send request.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.emergencyCause) return;

    const payload = {
      eventType: "BED_REQUEST",
      bedType: selectedBed.type,
      available: selectedBed.available,
      patientName: formData.patientName,
      cause: formData.emergencyCause,
      timestamp: new Date().toISOString(),
      hospitalSlug: slugify(hospital.data.name),
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
      console.log("Sent to WebSocket server:", payload);
    } else {
      console.warn("WebSocket is not open.");
    }

    // Cleanup
    setShowModal(false);
    setFormData({ patientName: "", emergencyCause: "" });
    setSelectedBed(null);
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
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Dimming Background Layer */}
          <div className="absolute inset-0 bg-black opacity-20 backdrop-blur-sm z-0"></div>

          {/* Modal Content */}
          <div
            className="relative z-10 p-6 rounded-xl text-white w-96"
            style={{ backgroundColor: "oklch(0.29 0 0)" }}
          >
            <h3 className="text-lg font-semibold mb-4">Request Bed</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Patient Name</label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({ ...formData, patientName: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded text-white border border-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Cause of Emergency</label>
                <input
                  type="text"
                  value={formData.emergencyCause}
                  onChange={(e) =>
                    setFormData({ ...formData, emergencyCause: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded text-white border border-gray-400"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Confirm Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BedAvailability;
