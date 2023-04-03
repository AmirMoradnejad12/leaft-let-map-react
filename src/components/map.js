import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  Tooltip,
} from "react-leaflet";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/leaflet.css";
import "./map.scss";
import mylocationIcon from "../images/mylocation.svg";

function ZoomTOPoint({ position }) {
  const map = useMap();
  if (position) {
    map.flyTo(position, 18);
  }
  return null;
}

export default function Map({ center }) {
  let defaultCenter = center;
  const [position, setPosition] = useState(null);
  const zoom = 9;
  let getUserLocation = async () => {
    if (navigator.geolocation) {
      console.log("navigator.geolocation", navigator.geolocation);
      // get GPS position
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // set the user location
          console.log("first l", {
            position,
          });
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          alert(
            "This browser has no permission to access your location. If you want to find your location please reset the location setting on this browser."
          );
        }
      );
    } else {
      alert("Your divice not suport this!!");
    }
  };

  const handleMapClick = (e) => {
    console.log(e.latlng);
    setPosition(e.latlng);
    return <ZoomTOPoint position={position} />;
  };

  function MapClick() {
    useMapEvents({
      click: (e) => {
        handleMapClick(e);
      },
    });
    return null;
  }

  const myIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [32, 32],
  });

  return (
    <>
      <button
        className="location__btn"
        onClick={getUserLocation}
        title="show my location"
      >
        <img src={mylocationIcon} alt="my location" />
      </button>
      <MapContainer
        center={[defaultCenter.lat, defaultCenter.lng]}
        zoom={zoom}
        style={{ height: "100vh" }}
      >
        <MapClick />
        <ZoomTOPoint position={position} />
        {/* <LocationMarker /> */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="<attribution>"
        />
        <Marker position={position || defaultCenter} icon={myIcon}>
          <Tooltip permanent>
            Latitude:{position?.lat.toFixed(5) || defaultCenter.lat.toFixed(5)}
            <br />
            Longitude:{position?.lng.toFixed(5) || defaultCenter.lng.toFixed(5)}
          </Tooltip>
        </Marker>
      </MapContainer>
    </>
  );
}
