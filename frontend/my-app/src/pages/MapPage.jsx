import React, { useState, useEffect } from 'react';
import L from 'leaflet'; // Import Leaflet
import { useNavigate } from 'react-router-dom';
import './MapPage.css';

const MapPage = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Get the user's current location if available
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (currentPosition) {
      // Initialize the map with the user's current location
      const mapInstance = L.map('map').setView([currentPosition.latitude, currentPosition.longitude], 13);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapInstance);

      // Custom location marker icon using location.png
      const locationIcon = L.icon({
        iconUrl: '/location.png', // Path to the image
        iconSize: [32, 32], // Size of the marker
        iconAnchor: [16, 32], // Anchor point (adjusted to place marker at the bottom)
        popupAnchor: [0, -32], // Position of the popup relative to the marker
      });

      // Add a marker for the user's location with custom icon
      const userMarker = L.marker([currentPosition.latitude, currentPosition.longitude], { icon: locationIcon }).addTo(mapInstance)
        .bindPopup('Your location')
        .openPopup();

      // Set map and marker state
      setMap(mapInstance);
      setMarker(userMarker);
    }
  }, [currentPosition]);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSearchAddress = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Geocoding the address using OpenStreetMap's Nominatim API
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0]; // Get the first result (best match)

        // If the map and marker exist, update their position
        if (map && marker) {
          map.setView([lat, lon], 13); // Center the map on the new location
          marker.setLatLng([lat, lon]); // Move the marker to the new position
        } else {
          const newMarker = L.marker([lat, lon], { icon: locationIcon }).addTo(map)
            .bindPopup(address)
            .openPopup();
          setMarker(newMarker);
        }
      } else {
        setErrorMessage('Address not found. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching geocode data:', err);
      setErrorMessage('Failed to fetch data. Please try again later.');
    }
  };

  return (
    <div className="map-container">
      <h1>Search Location on Map</h1>
      <div className="address-input-container">
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="Enter address"
        />
        <button onClick={handleSearchAddress}>Search</button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div id="map"></div> {/* Map container */}

      <button className="back-button" onClick={() => navigate('/pickup')}>Go Back to Pickup Locations</button>
    </div>
  );
};

export default MapPage;
