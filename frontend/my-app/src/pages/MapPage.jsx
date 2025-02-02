import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { useNavigate, useLocation } from 'react-router-dom';
import './MapPage.css';

const MapPage = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [map, setMap] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPickup, selectedDestination } = location.state || {};

  useEffect(() => {
    // Get the user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    // Initialize the map
    if (currentPosition && !map) {
      const mapInstance = L.map('map').setView(
        [currentPosition.latitude, currentPosition.longitude],
        13
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapInstance);

      // Add user location marker
      L.marker([currentPosition.latitude, currentPosition.longitude])
        .addTo(mapInstance)
        .bindPopup('Your location')
        .openPopup();

      setMap(mapInstance);
    }
  }, [currentPosition, map]);

  // Function to add a marker
  const addMarker = (latLng, title, message) => {
    const marker = L.marker(latLng).addTo(map)
      .bindPopup(message)
      .openPopup();
    return marker;
  };

  useEffect(() => {
    // Add pickup marker
    if (map && selectedPickup) {
      const pickupLatLng = [selectedPickup.latitude, selectedPickup.longitude];
      addMarker(pickupLatLng, 'Pickup Location', selectedPickup.addressLocality || selectedPickup.name);
      map.setView(pickupLatLng, 13); // Center map on pickup location
    }
  }, [map, selectedPickup]);

  useEffect(() => {
    // Add destination marker
    if (map && selectedDestination) {
      const destinationLatLng = [selectedDestination.latitude, selectedDestination.longitude];
      addMarker(destinationLatLng, 'Destination Location', selectedDestination.addressLocality || selectedDestination.name);
      map.setView(destinationLatLng, 13); // Center map on destination location
    }
  }, [map, selectedDestination]);

  return (
    <div className="map-container">
      <h1>Map View</h1>
      <h2>Summary</h2>
      <p><strong>Pickup Location:</strong> {selectedPickup?.addressLocality || selectedPickup?.name}</p>
      <p><strong>Destination Location:</strong> {selectedDestination?.addressLocality || selectedDestination?.name}</p>
      <div id="map" className="map-wrapper"></div>
      <button className="back-button" onClick={() => navigate('/pickup')}>
        Go Back to Pickup Locations
      </button>
    </div>
  );
};

export default MapPage;



