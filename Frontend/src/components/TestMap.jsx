// MapTest.jsx
import React, { useState, Fragment } from 'react';
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

const MapTest = ({handleLocationSelect}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  const [marker, setMarker] = useState(null);

  const handleMapClick = (e) => {
    const loc = e.latLng.toJSON();
    setMarker(loc);
    console.log(loc);
    handleLocationSelect(loc);
  };

  return (

     <div style={{ height: "50%", width: "50%",justifyContent:"center",display:"flex" }}>
      <div style={{height:'100vh',width:'100%',justifyContent:"center",display:"flex",}}> 

        {isLoaded ? (
          <GoogleMap
            center={{ lat: -1.8312, lng: -78.1834 }}
            zoom={7}
            onClick={handleMapClick}
            mapContainerStyle={{ width: "80%", height: "50vh",display:"flex",justifyContent:"center" }}
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
