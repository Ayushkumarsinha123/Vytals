// For FUTURE REFERENCE

// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";

// // Custom icon for user location (red color)
// const redIcon = new L.Icon({
//   iconUrl:
//     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// // FitBounds now includes userLocation if available
// function FitBounds({ hospitals, userLocation }) {
//   const map = useMap();

//   useEffect(() => {
//     const bounds = [...hospitals.map((h) => [h.lat, h.lng])];

//     if (userLocation) {
//       bounds.push([userLocation.lat, userLocation.lng]);
//     }

//     if (bounds.length > 0) {
//       map.fitBounds(bounds);
//     }
//   }, [hospitals, userLocation, map]);

//   return null;
// }

// export default function HospitalMap({ hospitals }) {
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     const storedLocation = localStorage.getItem("userLocation");
//     if (storedLocation) {
//       setUserLocation(JSON.parse(storedLocation));
//     } else if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const location = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setUserLocation(location);
//         },
//         (error) => {
//           console.error("Geolocation error:", error);
//         }
//       );
//     }
//   }, []);

//   return (
//     <MapContainer
//       center={[28.6139, 77.209]}
//       zoom={13}
//       scrollWheelZoom={true}
//       className="h-full w-full"
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {userLocation && (
//         <Marker position={[userLocation.lat, userLocation.lng]} icon={redIcon}>
//           <Popup>You are here</Popup>
//         </Marker>
//       )}

//       {hospitals.map((hospital, index) => (
//         <Marker key={index} position={[hospital.lat, hospital.lng]}>
//           <Popup>
//             <strong>{hospital.name}</strong>
//             <br />
//             {hospital.address}
//           </Popup>
//         </Marker>
//       ))}

//       <FitBounds hospitals={hospitals} userLocation={userLocation} />
//     </MapContainer>
//   );
// }

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

import { DEFAULT_CENTER } from "../constants/mapConstant";

// Red icon for the center
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Compute center point of hospitals
function computeCenter(hospitals) {
  const latSum = hospitals.reduce((sum, h) => sum + h.lat, 0);
  const lngSum = hospitals.reduce((sum, h) => sum + h.lng, 0);
  return {
    lat: latSum / hospitals.length,
    lng: lngSum / hospitals.length,
  };
}

// Adjust bounds to fit hospitals
function FitBounds({ hospitals }) {
  const map = useMap();

  useEffect(() => {
    if (hospitals.length === 0) return;
    const bounds = hospitals.map((h) => [h.lat, h.lng]);
    map.fitBounds(bounds);
  }, [hospitals, map]);

  return null;
}

export default function HospitalMap({ hospitals }) {
  const center = DEFAULT_CENTER;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Hospital markers */}
      {hospitals.map((hospital, index) => (
        <Marker key={index} position={[hospital.lat, hospital.lng]}>
          <Popup>
            <strong>{hospital.name}</strong>
            <br />
            {hospital.address}
          </Popup>
        </Marker>
      ))}

      {/* Center marker in red */}
      {center && (
        <Marker position={[center.lat, center.lng]} icon={redIcon}>
          <Popup>Center of Hospitals</Popup>
        </Marker>
      )}

      <FitBounds hospitals={hospitals} />
    </MapContainer>
  );
}
