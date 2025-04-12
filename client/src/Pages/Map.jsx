import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import HospitalMap from "../Components/HospitalMap";

import { slugify } from "../utils/slugify";

export default function Map({ userLocation = { lat: 28.4209, lng: 77.5267 } }) {
  const [hospitals, setHospitals] = useState([]);
  const [nearestHospitals, setNearestHospitals] = useState([]);

  // Fetch all hospitals
  const getApi = async () => {
    if (!userLocation) return;

    try {
      const res = await axios.get(
        `http://localhost:6010/api/v1/get-nearest-hospitals?lat=${userLocation.lat}&lng=${userLocation.lng}`
      );

      setHospitals(res.data);
    } catch (err) {
      console.error("Error fetching hospitals:", err);
    }
  };

  // Fetch hospitals with distances and calculate OPD + sorting
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await fetch(
          `http://localhost:6010/api/v1/get-nearest-hospitals/distances?lat=${userLocation.lat}&lng=${userLocation.lng}`
        );
        const data = await res.json();

        const enrichedHospitals = data.data.map((hospital) => ({
          ...hospital,
          opdQueue: Math.floor(Math.random() * 91) + 10, // Random OPD queue (10–100)
          distanceValue: parseFloat(hospital.distance.replace(" km", "")),
        }));

        const sorted = enrichedHospitals.sort((a, b) => {
          const aScore = a.distanceValue + a.opdQueue / 100;
          const bScore = b.distanceValue + b.opdQueue / 100;
          return aScore - bScore;
        });

        setNearestHospitals(sorted.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch hospital data:", err);
      }
    };

    fetchHospitals();
  }, [userLocation]);

  useEffect(() => {
    if (userLocation && userLocation.lat && userLocation.lng) {
      getApi();
    }
  }, [userLocation]);

  return (
    <div className="flex h-screen w-screen">
      <div className="w-[25%] bg-[#1f1f1f] text-white p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-100">
          Nearest Hospitals
        </h2>
        <ul className="space-y-2">
          {nearestHospitals.map((hospital, index) => {
            const slug = slugify(hospital.name);

            return (
              <Link
                key={index}
                to={`/hospital/${slug}`}
                className="block bg-[#2a2a2a] rounded-xl p-3 border border-gray-700 text-sm text-gray-200 hover:bg-[#3a3a3a] transition"
              >
                <p className="font-medium text-white truncate">
                  {hospital.name}
                </p>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-400">
                    OPD: {hospital.opdQueue}
                  </span>
                  <span className="text-gray-400">
                    Dist: {hospital.distance}
                  </span>
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  ⏱ {hospital.duration}
                </div>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="w-[75%]">
        <HospitalMap hospitals={hospitals} />
      </div>
    </div>
  );
}
