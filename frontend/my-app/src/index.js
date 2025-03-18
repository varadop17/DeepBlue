// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './index.css';
// import LandingPage from './LandingPage'; // Import LandingPage component
// import Signup from './Signup'; // Import Signup component
// import Login from './Login'; // Import Login component

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// );


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LandingPage from './LandingPage'; // Import LandingPage component
import Signup from './Signup'; // Import Signup component
import Login from './Login'; // Import Login component
import AdminDashboard from './AdminDashboard'; // Import AdminDashboard component
import BusinessDashboard from './BusinessDashboard'; // Import BusinessDashboard component
import UserDashboard from './UserDashboard'; // Import UserDashboard component

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/business-dashboard" element={<BusinessDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);