import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPickup, selectedDestination } = location.state || {};

  if (!selectedPickup || !selectedDestination) {
    return <div>No pickup or destination selected. Please go back and select them.</div>;
  }

  return (
    <div className="summary-page">
      <h1>Summary of Pickup and Destination</h1>
      <p><strong>Pickup Location:</strong> {selectedPickup.addressLocality || selectedPickup.name}</p>
      <p><strong>Destination Location:</strong> {selectedDestination.addressLocality || selectedDestination.name}</p>
      <button onClick={() => navigate('/')}>Back to Locations</button>
    </div>
  );
};

export default SummaryPage;
