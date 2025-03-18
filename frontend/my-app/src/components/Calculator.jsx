import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Calculator.css";

function Calculator() {
    const [pickupPincode, setPickupPincode] = useState("");
    const [weight, setWeight] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [dimensionUnit, setDimensionUnit] = useState("cm");
    const [declaredValue, setDeclaredValue] = useState("");
    const [shipmentType, setShipmentType] = useState("forward");
    const [paymentType, setPaymentType] = useState("prepaid");
    const [shippingMode, setShippingMode] = useState("air");
    const [result, setResult] = useState(null);

    const navigate = useNavigate();

    const validateForm = () => {
        
        if (!weight.match(/^\d+(\.\d{1,2})?$/)) {
            alert("Please enter a valid weight.");
            return false;
        }
        if (!length.match(/^\d+(\.\d{1,2})?$/) || !width.match(/^\d+(\.\d{1,2})?$/) || !height.match(/^\d+(\.\d{1,2})?$/)) {
            alert("Please enter valid dimensions.");
            return false;
        }
        if (!declaredValue.match(/^\d+(\.\d{1,2})?$/)) {
            alert("Please enter a valid declared value.");
            return false;
        }
        return true;
    };

    const calculateRate = () => {
        if (!validateForm()) {
            return;
        }

        let lengthInCm = dimensionUnit === "cm" ? parseFloat(length) : dimensionUnit === "inches" ? parseFloat(length) * 2.54 : parseFloat(length) * 30.48;
        let widthInCm = dimensionUnit === "cm" ? parseFloat(width) : dimensionUnit === "inches" ? parseFloat(width) * 2.54 : parseFloat(width) * 30.48;
        let heightInCm = dimensionUnit === "cm" ? parseFloat(height) : dimensionUnit === "inches" ? parseFloat(height) * 2.54 : parseFloat(height) * 30.48;

        let volumetricWeight = (lengthInCm * widthInCm * heightInCm) / 5000;
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
                <div className="row mt-3">
                    
                    <div className="col-md-4">
                        <label className="form-label" title="Enter the actual weight of the shipment in kilograms.">Actual Weight (kg):</label>
                        <input type="text" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4">
                        <label className="form-label" title="Select the unit of measurement for the dimensions.">Dimension Unit:</label>
                        <select className="form-select" value={dimensionUnit} onChange={(e) => setDimensionUnit(e.target.value)}>
                            <option value="cm">Centimeters</option>
                            <option value="inches">Inches</option>
                            <option value="feet">Feet</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label" title="Enter the length of the shipment.">Length:</label>
                        <input type="text" className="form-control" value={length} onChange={(e) => setLength(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label" title="Enter the width of the shipment.">Width:</label>
                        <input type="text" className="form-control" value={width} onChange={(e) => setWidth(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label" title="Enter the height of the shipment.">Height:</label>
                        <input type="text" className="form-control" value={height} onChange={(e) => setHeight(e.target.value)} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4">
                        <label className="form-label" title="Enter the declared value of the shipment in Indian Rupees. This is the value of the goods being shipped.">Declared Value (₹):</label>
                        <input type="text" className="form-control" value={declaredValue} onChange={(e) => setDeclaredValue(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label" title="Select the type of shipment.">Shipment Type:</label>
                        <select className="form-select" value={shipmentType} onChange={(e) => setShipmentType(e.target.value)}>
                            <option value="forward">Forward Shipment</option>
                            <option value="return">Return Shipment</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label" title="Select the payment type for the shipment.">Payment Type:</label>
                        <select className="form-select" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                            <option value="prepaid">Prepaid</option>
                            <option value="cod">Cash on Delivery (COD)</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label" title="Select the shipping mode for the shipment.">Shipping Mode:</label>
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

            {result && (
                <div className="card p-4 mt-4 shadow-lg summary-container">
                    <h4 className="text-center">Shipment Summary</h4>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                
                                <th>Weight (kg)</th>
                                <th>Length</th>
                                <th>Width</th>
                                <th>Height</th>
                                <th>Declared Value (₹)</th>
                                <th>Shipment Type</th>
                                <th>Payment Type</th>
                                <th>Shipping Mode</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                               
                                <td>{weight}</td>
                                <td>{length} {dimensionUnit}</td>
                                <td>{width} {dimensionUnit}</td>
                                <td>{height} {dimensionUnit}</td>
                                <td>{declaredValue}</td>
                                <td>{shipmentType}</td>
                                <td>{paymentType}</td>
                                <td>{shippingMode}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-4 text-center">
                <button 
                    className="btn btn-secondary btn-lg" 
                    onClick={() => {
                        if (result) {
                            navigate('/google-map');
                        } else {
                            alert("Please calculate the rate first.");
                        }
                    }}
                >
                    Specify Pickup Location
                </button>
            </div>
        </div>
    );
}

export default Calculator;