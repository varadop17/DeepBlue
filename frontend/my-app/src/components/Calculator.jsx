import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [distance, setDistance] = useState('');
  const [weight, setWeight] = useState('');
  const [serviceType, setServiceType] = useState('standard');
  const [cost, setCost] = useState(null);

  const calculateCost = () => {
    let baseCost = 0;

    if (serviceType === 'standard') {
      baseCost = 5;
    } else if (serviceType === 'express') {
      baseCost = 10;
    }

    const distanceCost = distance * 0.5;
    const weightCost = weight * 0.2;

    const totalCost = baseCost + distanceCost + weightCost;
    setCost(totalCost.toFixed(2));
  };

  return (
    <div className="calculator-page">
      <div className="calculator-container">
        <h1 className="calculator-title">Logistics Cost Calculator</h1>
        <div className="form-group">
          <label>Distance (km)</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="form-input"
          >
            <option value="standard">Standard</option>
            <option value="express">Express</option>
          </select>
        </div>
        <button className="btn-primary" onClick={calculateCost}>Calculate</button>
        {cost !== null && (
          <div className="result">
            <h2>Estimated Cost: ${cost}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;