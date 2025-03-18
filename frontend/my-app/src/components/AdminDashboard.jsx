// import React from "react";
// import './Dashboard.css';

// const AdminDashboard = () => {
//   return (
//     <div className="dashboard-page">
//       <div className="dashboard-container">
//         <h1 className="dashboard-title">Welcome to the Admin Dashboard</h1>
//         <div className="dashboard-section">
//           <h2>User Management</h2>
//           <p>View, add, edit, or remove users (admin, business, customer).</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Fleet Management</h2>
//           <p>Monitor vehicle status, routes, and assignments.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Order Management</h2>
//           <p>Track all orders, shipments, and deliveries.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Analytics and Reports</h2>
//           <p>View performance metrics, revenue, and operational efficiency.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Notification Center</h2>
//           <p>System alerts, pending approvals, and updates.</p>
//         </div>
//         <div className="dashboard-section">
//           <h2>Settings</h2>
//           <p>Configure company policies, user roles, and permissions.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import './Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to the Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <div className="dashboard-section">
          <h2>User Management</h2>
          <p>View, add, edit, or remove users (admin, business, customer).</p>
        </div>
        <div className="dashboard-section">
          <h2>Fleet Management</h2>
          <p>Monitor vehicle status, routes, and assignments.</p>
        </div>
        <div className="dashboard-section">
          <h2>Order Management</h2>
          <p>Track all orders, shipments, and deliveries.</p>
        </div>
        <div className="dashboard-section">
          <h2>Analytics and Reports</h2>
          <p>View performance metrics, revenue, and operational efficiency.</p>
        </div>
        <div className="dashboard-section">
          <h2>Notification Center</h2>
          <p>System alerts, pending approvals, and updates.</p>
        </div>
        <div className="dashboard-section">
          <h2>Settings</h2>
          <p>Configure company policies, user roles, and permissions.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
