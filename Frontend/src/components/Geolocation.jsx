import React, { useEffect } from 'react';
import SidePanel from './SidePanel';
import Header from './Header';
import { Fragment, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

const markers = [
  {
    id: 1,
    name: "Supermaxi Cuenca",
    position: { lat: -2.7365242789079964, lng: -78.98378709785905 },
  },
  {
    id: 2,
    name: "Don angel Super Market",
    position: { lat: -2.4944813725124737, lng: -79.64236990153547 },
  },
  {
    id: 3,
    name: "Supermarket Tia",
    position: { lat: -1.550256390538846, lng: -79.86209645541977 }, 
  },
  {
    id: 4,
    name: "Supermarket Santa Maria",
    position: { lat: -1.1459977902023128, lng: -78.60225731084184 },  
  },
  {
    id: 5,
    name: "Supermaxi Riboamba",
    position: { lat: -1.5221124942235291, lng: -78.35757981816752 }, 
  },
  {
    id: 6,
    name: "SAN JUAN SUPERMARKET",
    position: { lat: -0.4399100204653157, lng: -78.4978879570266 }, 
  },
];



const Geolocation = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleMapClick = (e) => {
    console.log("map clicked");
    const loc = e.latLng.toJSON();
    console.log(loc);
    console.log(typeof loc);
    setActiveMarker(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: '288px', overflow: 'auto' }}>
          <SidePanel />
        </div>
        <Fragment>
      <div className="container">
        
        <div style={{ height: "100vh", width: "100%" }}>
          {isLoaded ? (
            <GoogleMap
              center={{ lat: -1.8312, lng: -78.1834 }}
              zoom={7}
              onClick={(e) => handleMapClick(e)}
              mapContainerStyle={{ width: "100%", height: "100vh" }}
            >
              {markers.map(({ id, name, position }) => (
                <MarkerF
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                  icon={{
                    url:"https://res.cloudinary.com/deyfwd4ge/image/upload/v1716969589/final_marker_image_etqkm4.png",
                    scaledSize: { width: 100, height: 100 }
                  }}
                >
                  {activeMarker === id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <p>{name}</p>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          ) : null}
        </div>
      </div>
    </Fragment>

      </div>
    </div>
  );
}

export default Geolocation;
