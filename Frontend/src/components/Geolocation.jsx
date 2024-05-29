import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SidePanel from './SidePanel';
import Header from './Header';

const Geolocation = () => {
  useEffect(() => {
    const map = L.map('map').setView([23.0225, 72.5714], 7); // Initial map view (latitude, longitude, zoom level)

    L.tileLayer(
      'https://apis.mappls.com/advancedmaps/v1/4cac37b1b0b5045af133bc58ef9eb1b7/bhuvan_imagery/{z}/{x}/{y}.png'
    ).addTo(map);

    // Example markers data
    const markers = [
      { position: [22.3072, 73.1812], label: 'Vadodara' },
      { position: [22.6916, 72.8634], label: 'Nadiad' },
      { position: [21.1702, 72.8311], label: 'Surat' },
      { position: [22.3039, 70.8022], label: 'Rajkot' },
      // Add more markers as needed
    ];

    markers.forEach((marker) => {
      L.marker(marker.position).addTo(map).bindPopup(marker.label);
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: '288px', overflow: 'auto' }}>
          <SidePanel />
        </div>
        <div id="map" style={{ flex: 1, height: '100%' }}></div>
      </div>
    </div>
  );
}

export default Geolocation;
