// import React, { useState } from 'react';
// import './Calculator.css';

// const Calculator = () => {
//   const [distance, setDistance] = useState('');
//   const [weight, setWeight] = useState('');
//   const [serviceType, setServiceType] = useState('standard');
//   const [cost, setCost] = useState(null);

//   const calculateCost = () => {
//     let baseCost = 0;

//     if (serviceType === 'standard') {
//       baseCost = 5;
//     } else if (serviceType === 'express') {
//       baseCost = 10;
//     }

//     const distanceCost = distance * 0.5;
//     const weightCost = weight * 0.2;

//     const totalCost = baseCost + distanceCost + weightCost;
//     setCost(totalCost.toFixed(2));
//   };

//   return (
//     <div className="calculator-page">
//       <div className="calculator-container">
//         <h1 className="calculator-title">Logistics Cost Calculator</h1>
//         <div className="form-group">
//           <label>Distance (km)</label>
//           <input
//             type="number"
//             value={distance}
//             onChange={(e) => setDistance(e.target.value)}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label>Weight (kg)</label>
//           <input
//             type="number"
//             value={weight}
//             onChange={(e) => setWeight(e.target.value)}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label>Service Type</label>
//           <select
//             value={serviceType}
//             onChange={(e) => setServiceType(e.target.value)}
//             className="form-input"
//           >
//             <option value="standard">Standard</option>
//             <option value="express">Express</option>
//           </select>
//         </div>
//         <button className="btn-primary" onClick={calculateCost}>Calculate</button>
//         {cost !== null && (
//           <div className="result">
//             <h2>Estimated Cost: ${cost}</h2>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Calculator;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./calculator.css";

function Calculator() {
    const [pickupPincode, setPickupPincode] = useState("");
    const [deliveryPincode, setDeliveryPincode] = useState("");
    const [weight, setWeight] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [declaredValue, setDeclaredValue] = useState("");
    const [shipmentType, setShipmentType] = useState("forward");
    const [paymentType, setPaymentType] = useState("prepaid");
    const [shippingMode, setShippingMode] = useState("air");
    const [result, setResult] = useState(null);

    const calculateRate = () => {
        if (!weight || !dimensions) {
            alert("Please enter weight and dimensions.");
            return;
        }

        let [length, width, height] = dimensions.split("x").map(Number);
        let volumetricWeight = (length * width * height) / 5000;
        let chargeableWeight = Math.max(parseFloat(weight), volumetricWeight).toFixed(2);

        let baseRate = shippingMode === "air" ? 50 : 30;
        let estimatedCost = (baseRate * chargeableWeight).toFixed(2);
        let deliveryTime = shippingMode === "air" ? "1-3 Days" : "4-7 Days";

        setResult({ chargeableWeight, estimatedCost, deliveryTime });
    };

    return (
        <div className="container mt-5 calculator-container">
            <h2 className="text-center mb-4">Routify Shipment Rate Calculator</h2>
            <div className="card p-4 shadow-lg">
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">Pickup Pincode:</label>
                        <input type="text" className="form-control" value={pickupPincode} onChange={(e) => setPickupPincode(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Delivery Pincode:</label>
                        <input type="text" className="form-control" value={deliveryPincode} onChange={(e) => setDeliveryPincode(e.target.value)} />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-4">
                        <label className="form-label">Actual Weight (kg):</label>
                        <input type="number" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Dimensions (LxWxH in cm):</label>
                        <input type="text" className="form-control" value={dimensions} placeholder="e.g. 10x10x10" onChange={(e) => setDimensions(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Declared Value (₹):</label>
                        <input type="number" className="form-control" value={declaredValue} onChange={(e) => setDeclaredValue(e.target.value)} />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-4">
                        <label className="form-label">Shipment Type:</label>
                        <select className="form-select" value={shipmentType} onChange={(e) => setShipmentType(e.target.value)}>
                            <option value="forward">Forward Shipment</option>
                            <option value="return">Return Shipment</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Payment Type:</label>
                        <select className="form-select" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                            <option value="prepaid">Prepaid</option>
                            <option value="cod">Cash on Delivery (COD)</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Shipping Mode:</label>
                        <select className="form-select" value={shippingMode} onChange={(e) => setShippingMode(e.target.value)}>
                            <option value="air">Air</option>
                            <option value="surface">Surface</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <button className="btn btn-primary btn-lg" onClick={calculateRate}>Calculate Shipping Cost</button>
                </div>
            </div>

            {result && (
                <div className="card p-4 mt-4 shadow-lg result-container">
                    <h4 className="text-center">Estimated Shipping Rate</h4>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>Courier</th>
                                <th>Chargeable Weight (kg)</th>
                                <th>Estimated Cost (₹)</th>
                                <th>Estimated Delivery Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Routify</td>
                                <td>{result.chargeableWeight}</td>
                                <td>{result.estimatedCost}</td>
                                <td>{result.deliveryTime}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Calculator;
