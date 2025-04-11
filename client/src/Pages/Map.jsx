import React, { useEffect, useState } from "react";
import axios from "axios";
import HospitalMap from "../Components/HospitalMap";

export default function Map() {
  const [hospitals, setHospitals] = useState([]);

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
    getApi();
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <div className="w-[25%] bg-black/80 text-white flex items-center justify-center">
        Nearest Hospitals
      </div>
      <div className="w-[75%]">
        <HospitalMap hospitals={hospitals} />
      </div>
    </div>
  );
}
