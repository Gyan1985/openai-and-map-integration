import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "./map.css";

interface MapProviderProps {
  origin?: google.maps.DirectionsResult;
}

function MapProvider({ origin }: MapProviderProps) {
  // eslint-disable-next-line
  const [map, setMap] = useState();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: ["places", "marker", "routes"],
  });
  const position: google.maps.LatLngLiteral = {
    lat: 7.2905715,
    lng: 80.6337262,
  };

  if (!isLoaded) {
    return <div>loading</div>;
  }

  return (
    <div className="map-wrapper">
      <div className="container">
        <div
          style={{
            height: "100vh",
            maxWidth: "1200px",
            width: "100%",
            position: "absolute",
          }}
        >
          <GoogleMap
            zoom={15}
            center={position}
            mapContainerStyle={{ width: "100%", height: "90vh" }}
            options={{
              zoomControl: false,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map: any) => setMap(map)}
          >
            <Marker position={position} />
            {origin && <DirectionsRenderer directions={origin} />}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}

export default MapProvider;
