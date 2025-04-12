import React from "react";

const BedAvailability = () => {
  // Sample bed data — this can later come from props or an API
  const beds = [
    { type: "General Beds", total: 30, available: 12 },
    { type: "ICU Beds", total: 10, available: 0 },
    { type: "Emergency Beds", total: 5, available: 0 }, // full
  ];

  const handleRequest = (bedType) => {
    // You can replace this with an API call later
    console.log(bedType);
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

            {bed.available === 0 && (
              <button
                onClick={() => handleRequest(bed.type)}
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
