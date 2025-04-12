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
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-800">🛏️ Bed Availability</h2>
      <ul className="space-y-4">
        {beds.map((bed, index) => (
          <li
            key={index}
            className={`flex justify-between items-center border p-4 rounded-xl shadow-sm transition-all ease-in-out duration-300 ${
              bed.available === 0 ? "bg-red-50 border-red-300" : "bg-white border-gray-200"
            }`}
          >
            <div>
              <p className="font-medium text-lg text-blue-700">{bed.type}</p>
              <p className="text-sm text-gray-600">
                {bed.available}/{bed.total} Available
              </p>
            </div>

            {bed.available === 0 ? (
              <button
                onClick={() => handleRequest(bed.type)}
                className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition-all duration-300"
              >
                Request
              </button>
            ) : (
              <span className="text-green-600 font-medium">Available</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BedAvailability;
