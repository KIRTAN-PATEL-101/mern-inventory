// MapTest.jsx
import React, { useState, Fragment } from 'react';
import {
  GoogleMap,
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

const MapTest = ({ onLocationSelect }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  const [marker, setMarker] = useState(null);

  const handleMapClick = (e) => {
    const loc = e.latLng.toJSON();
    setMarker(loc);
    onLocationSelect(loc);
  };

  return (

     <div style={{ height: "50%", width: "50%" }}>
      <div style={{height:'100vh',width:'100%'}}>
      {isLoaded ? (
         <GoogleMap
           center={{ lat: -1.8312, lng: -78.1834 }}
           zoom={7}
           onClick={handleMapClick}
           mapContainerStyle={{ width: "100%", height: "100vh" }}
         >
           <MarkerF
             position={marker}
             icon={{
               url:"https://res.cloudinary.com/deyfwd4ge/image/upload/v1716969589/final_marker_image_etqkm4.png",
               scaledSize: { width: 100, height: 100 }
             }}
           />
         </GoogleMap>
       ) : null}
      </div>
       
     </div>

  );
}

export default MapTest;
