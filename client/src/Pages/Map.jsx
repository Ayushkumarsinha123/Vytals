import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map({ userLocation }) {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-[25%] bg-black/80 text-white flex items-center justify-center"></div>
      <div className="w-[75%]">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
