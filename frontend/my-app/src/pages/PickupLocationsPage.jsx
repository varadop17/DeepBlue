import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PickupLocationsPage.css';


const PickupLocationsPage = () => {
  const [countryCode, setCountryCode] = useState('');
  const [addressLocality, setAddressLocality] = useState('');
  const [pickupLocations, setPickupLocations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // List of countries
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

  const handleCountryChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddressLocality(e.target.value);
  };

  const fetchPickupLocations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        'https://api.dhl.com/location-finder/v1/find-by-address',
        {
          params: {
            countryCode: countryCode,
            addressLocality: addressLocality,
          },
          headers: {
            'DHL-API-Key': import.meta.env.VITE_DHL_API_KEY,
          },
        }
      );

      if (response.data && Array.isArray(response.data.locations)) {
        setPickupLocations(response.data.locations);
      } else {
        setError('No pickup locations found.');
      }
    } catch (err) {
      setError(err.response ? err.response.data.description : 'Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewMap = () => {
    navigate('/map');
  };

  return (
    <div>
      <h1>Pickup Locations</h1>

      {/* Country Dropdown */}
      <label>
        Select Country:
        <select value={countryCode} onChange={handleCountryChange}>
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </label>

      {/* Address Input */}
      <label>
        Enter Address Locality:
        <input
          type="text"
          value={addressLocality}
          onChange={handleAddressChange}
          placeholder="Enter address locality"
        />
      </label>

      {/* Fetch Button */}
      <button onClick={fetchPickupLocations} disabled={!countryCode || !addressLocality}>
        Find Pickup Locations
      </button>

      {/* Display Pickup Locations */}
      <ul>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : pickupLocations.length > 0 ? (
          pickupLocations.map((location, index) => (
            <li key={index}>{location.addressLocality || location.name || 'Unknown Location'}</li>
          ))
        ) : (
          <p>No pickup locations found.</p>
        )}
      </ul>

      {/* Navigate to Map */}
      <button onClick={handleViewMap} disabled={pickupLocations.length === 0}>
        View on Map
      </button>
    </div>
  );
};

export default PickupLocationsPage;
