import React, { useEffect, useState } from "react";
import axios from "axios";
import HospitalMap from "../Components/HospitalMap";

export default function Map() {
  const [hospitals, setHospitals] = useState([]);
  const [nearestHospitals, setNearestHospitals] = useState([]);

  const getApi = async () => {
    try {
      const res = await axios.get(
        "http://localhost:6010/api/v1/get-nearest-hospitals"
      );
      setHospitals(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await fetch(
          "http://localhost:6010/api/v1/get-nearest-hospitals/distances"
        );

        const data = await res.json();

        // Add random OPD queue value and convert distance to number for sorting
        const enrichedHospitals = data.data.map((hospital) => ({
          ...hospital,
          opdQueue: Math.floor(Math.random() * 91) + 10, // 10 to 100
          distanceValue: parseFloat(hospital.distance.replace(" km", "")),
        }));

        // Sort by distance + opdQueue weight (tweak weight as needed)
        const sorted = enrichedHospitals.sort((a, b) => {
          const aScore = a.distanceValue + a.opdQueue / 100; // less is better
          const bScore = b.distanceValue + b.opdQueue / 100;
          return aScore - bScore;
        });

        setNearestHospitals(sorted.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch hospital data:", err);
      }
    };

    fetchHospitals();
  }, []);

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <div className="w-[25%] bg-[#1f1f1f] text-white p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-100">
          Nearest Hospitals
        </h2>
        <ul className="space-y-2">
          {nearestHospitals.map((hospital, index) => (
            <li
              key={index}
              className="bg-[#2a2a2a] rounded-xl p-3 border border-gray-700 text-sm text-gray-200"
            >
              <p className="font-medium text-white truncate">{hospital.name}</p>
              <div className="flex justify-between mt-1">
                <span className="text-gray-400">OPD: {hospital.opdQueue}</span>
                <span className="text-gray-400">Dist: {hospital.distance}</span>
              </div>
              <div className="text-gray-500 text-xs mt-1">
                ⏱ {hospital.duration}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-[75%]">
        <HospitalMap hospitals={hospitals} />
      </div>
    </div>
  );
}
