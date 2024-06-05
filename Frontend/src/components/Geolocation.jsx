import React, { useEffect, useState, Fragment } from 'react';
import SidePanel from './SidePanel';
import Header from './Header';
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import axios from 'axios';

const Geolocation = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  const [markers, setMarkers] = useState([]); 
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/superadmin/fetchcoordinates', { withCredentials: true });
        console.log("Fetched data:", response.data); // Log the fetched data to check its structure
        // Transform the incoming data to fit the expected marker format
        const formattedMarkers = response.data.map(marker => ({
          id: marker.id, // Assuming there is an `id` field in the data
          name: marker.inventoryName,
          position: { lat: parseFloat(marker.latCoordinates), lng: parseFloat(marker.longCoordinates) }
        }));
        setMarkers(formattedMarkers);
      } catch (error) {
        console.error('Error fetching markers data:', error);
      }
    };

    fetchMarkers();
  }, []);


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
                        url: "https://res.cloudinary.com/deyfwd4ge/image/upload/v1716969589/final_marker_image_etqkm4.png",
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
