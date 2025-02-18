import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PickupLocationsPage.css';

const PickupLocationsPage = () => {
  const [countryCode, setCountryCode] = useState('');
  const [addressLocality, setAddressLocality] = useState('');
  const [pickupLocations, setPickupLocations] = useState([]);
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const countries = [
        { code: "IN", name: "India" },
        { code: "AT", name: "Austria" },
        { code: "BE", name: "Belgium" },
        { code: "BG", name: "Bulgaria" },
        { code: "CY", name: "Cyprus" },
        { code: "CZ", name: "Czechia" },
        { code: "DE", name: "Germany" },
        { code: "DK", name: "Denmark" },
        { code: "EE", name: "Estonia" },
        { code: "ES", name: "Spain" },
        { code: "FI", name: "Finland" },
        { code: "FR", name: "France" },
        { code: "GB", name: "United Kingdom" },
        { code: "GR", name: "Greece" },
        { code: "HR", name: "Croatia" },
        { code: "HU", name: "Hungary" },
        { code: "IT", name: "Italy" },
        { code: "LT", name: "Lithuania" },
        { code: "LU", name: "Luxembourg" },
        { code: "LV", name: "Latvia" },
        { code: "NL", name: "Netherlands" },
        { code: "NO", name: "Norway" },
        { code: "PL", name: "Poland" },
        { code: "PT", name: "Portugal" },
        { code: "RO", name: "Romania" },
        { code: "SE", name: "Sweden" },
        { code: "SI", name: "Slovenia" },
        { code: "SK", name: "Slovakia" },
      ];

  const fetchLocations = async (locality) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'https://api.dhl.com/location-finder/v1/find-by-address',
        {
          params: {
            countryCode: countryCode,
            addressLocality: locality,
          },
          headers: {
            'DHL-API-Key': import.meta.env.VITE_DHL_API_KEY,
          },
        }
      );
      if (response.data && Array.isArray(response.data.locations)) {
        setPickupLocations(response.data.locations);
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
    <div className="pickup-locations-page">
      <h1>Pickup Locations</h1>
      
      <label>
        Select Country:
        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>{country.name}</option>
          ))}
        </select>
      </label>
      
      <label>
        Enter Pickup Address:
        <input
          type="text"
          value={addressLocality}
          onChange={(e) => setAddressLocality(e.target.value)}
          placeholder="Enter pickup locality"
        />
      </label>
      <button onClick={() => fetchLocations(addressLocality)} disabled={!countryCode || !addressLocality}>
        Find Pickup Locations
      </button>
      
      <ul>
        {loading ? <p>Loading...</p> : pickupLocations.map((location, index) => (
          <li key={index}>
            <span>{location.addressLocality || location.name || 'Unknown Location'}</span>
            <button onClick={() => setSelectedPickup(location)}>Select</button>
          </li>
        ))}
      </ul>
      {selectedPickup && (
        <>
          <p><strong>Selected Pickup:</strong> {selectedPickup.addressLocality || selectedPickup.name}</p>
          <button onClick={() => navigate('/destination', { state: { selectedPickup } })}>
            &#x2192; {/* Unicode arrow character */}
          </button>
        </>
      )}
    </div>
  );
};

export default PickupLocationsPage;
