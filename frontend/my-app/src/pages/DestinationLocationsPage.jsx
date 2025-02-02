import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './DestinationLocationsPage.css';

const DestinationLocationsPage = () => {
  const [destinationLocality, setDestinationLocality] = useState('');
  const [destinationLocations, setDestinationLocations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPickup } = location.state || {};

  const fetchLocations = async (locality) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'https://api.dhl.com/location-finder/v1/find-by-address',
        {
          params: {
            countryCode: 'IN', // Use the appropriate country code
            addressLocality: locality,
          },
          headers: {
            'DHL-API-Key': import.meta.env.VITE_DHL_API_KEY,
          },
        }
      );
      if (response.data && Array.isArray(response.data.locations)) {
        setDestinationLocations(response.data.locations);
      } else {
        setError('No locations found.');
      }
    } catch (err) {
      setError(err.response ? err.response.data.description : 'Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="destination-locations-page">
      <h1>Destination Locations</h1>
      
      <label>
        Enter Destination Address:
        <input
          type="text"
          value={destinationLocality}
          onChange={(e) => setDestinationLocality(e.target.value)}
          placeholder="Enter destination locality"
        />
      </label>
      <button onClick={() => fetchLocations(destinationLocality)} disabled={!destinationLocality}>
        Find Destination Locations
      </button>
      
      <ul>
        {loading ? <p>Loading...</p> : destinationLocations.map((location, index) => (
          <li key={index}>
            <span>{location.addressLocality || location.name || 'Unknown Location'}</span>
            <button onClick={() => setSelectedDestination(location)}>Select</button>
          </li>
        ))}
      </ul>
      {selectedDestination && (
        <>
          <p><strong>Selected Destination:</strong> {selectedDestination.addressLocality || selectedDestination.name}</p>
          <div className="summary-section">
            <h2>Summary</h2>
            <p><strong>Pickup Location:</strong> {selectedPickup.addressLocality || selectedPickup.name}</p>
            <p><strong>Destination Location:</strong> {selectedDestination.addressLocality || selectedDestination.name}</p>
            <button onClick={() => navigate('/map')}>View Route on Map</button>
          </div>
        </>
      )}
    </div>
  );
};

export default DestinationLocationsPage;
