// MapTest.jsx
import React, { useState, Fragment, useEffect } from 'react';
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

const MapTest = ({handleLocationSelect,setIsMapModalOpen, location}) => {
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
  const closeMapModal = () => {
    // setLocation(kirtan);
    setIsMapModalOpen(false);
};

useEffect(() => {
  if(location){
    setMarker(location);
  }
}, [])

  return (

     <div style={{ height: "50%", width: "50%",justifyContent:"center",display:"flex" }}>
      <div style={{height:'100vh',width:'100%',justifyContent:"center",display:"flex",zIndex:"51"}}> 
        <button onClick={closeMapModal} className="absolute mt-2 mr-2 text-black hover:text-gray-900 z-9999 cursor-pointer" style={{top:"46%", right:"28%"}}>
          <svg className="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

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
