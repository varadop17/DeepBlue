// import React from "react";
// import './Dashboard.css';

// const UserDashboard = () => {
//   return (
//     <div className="dashboard-page">
//       <div className="dashboard-container">
//         <h1 className="dashboard-title">Welcome to the User Dashboard</h1>
//         <div className="dashboard-section">
//           <h2>Place Orders</h2>
//           <p>Easily create new orders or shipments.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Order Tracking</h2>
//           <p>Track live status and location of shipments.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Order History</h2>
//           <p>View past orders and details.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Payment Management</h2>
//           <p>Make payments and download invoices.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Support Center</h2>
//           <p>Raise complaints or seek assistance.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Profile Management</h2>
//           <p>Update personal details and preferences.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;


import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import './Dashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to the User Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <div className="dashboard-section">
          <h2>Place Orders</h2>
          <p>Easily create new orders or shipments.</p>
        </div>
        <div className="dashboard-section">
          <h2>Order Tracking</h2>
          <p>Track live status and location of shipments.</p>
        </div>
        <div className="dashboard-section">
          <h2>Order History</h2>
          <p>View past orders and details.</p>
        </div>
        <div className="dashboard-section">
          <h2>Payment Management</h2>
          <p>Make payments and download invoices.</p>
        </div>
        <div className="dashboard-section">
          <h2>Support Center</h2>
          <p>Raise complaints or seek assistance.</p>
        </div>
        <div className="dashboard-section">
          <h2>Profile Management</h2>
          <p>Update personal details and preferences.</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;