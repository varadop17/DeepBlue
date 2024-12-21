// import React from "react";
// import './Dashboard.css';

// const BusinessDashboard = () => {
//   return (
//     <div className="dashboard-page">
//       <div className="dashboard-container">
//         <h1 className="dashboard-title">Welcome to the Business Dashboard</h1>
//         <div className="dashboard-section">
//           <h2>Order Management</h2>
//           <p>Create, track, and manage orders.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Shipment Tracking</h2>
//           <p>Real-time tracking of shipments.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Inventory Management</h2>
//           <p>Monitor stock, supplies, and warehouse status.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Reports and Analytics</h2>
//           <p>Insights into shipment performance and delays.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Payment and Billing</h2>
//           <p>View invoices and transaction history.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Support Center</h2>
//           <p>Contact admin or raise support tickets.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessDashboard;


import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import './Dashboard.css';

const BusinessDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to the Business Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <div className="dashboard-section">
          <h2>Order Management</h2>
          <p>Create, track, and manage orders.</p>
        </div>
        <div className="dashboard-section">
          <h2>Shipment Tracking</h2>
          <p>Real-time tracking of shipments.</p>
        </div>
        <div className="dashboard-section">
          <h2>Inventory Management</h2>
          <p>Monitor stock, supplies, and warehouse status.</p>
        </div>
        <div className="dashboard-section">
          <h2>Reports and Analytics</h2>
          <p>Insights into shipment performance and delays.</p>
        </div>
        <div className="dashboard-section">
          <h2>Payment and Billing</h2>
          <p>View invoices and transaction history.</p>
        </div>
        <div className="dashboard-section">
          <h2>Support Center</h2>
          <p>Contact admin or raise support tickets.</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;