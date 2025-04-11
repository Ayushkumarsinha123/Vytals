import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

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
  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hospitals.map((hospital, index) => (
        <Marker key={index} position={[hospital.lat, hospital.lng]}>
          <Popup>
            <strong>{hospital.name}</strong>
            <br />
            {hospital.address}
          </Popup>
        </Marker>
      ))}

      <FitBounds hospitals={hospitals} />
    </MapContainer>
  );
}
