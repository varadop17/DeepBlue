import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import BusinessDashboard from './components/BusinessDashboard';
import UserDashboard from './components/UserDashboard';
import QuotePage from './components/QuotePage';
import Calculator from './components/Calculator';
import Header from './components/Header';
import DHLDataPage from './service/DHLDataPage'; // Import the new component
import PickupLocationsPage from './pages/PickupLocationsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><LandingPage /></>} />
        <Route path="/home" element={<><Header /><LandingPage /></>} />
        <Route path="/signup" element={<><Header /><Signup /></>} />
        <Route path="/login" element={<><Header /><Login /></>} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/business-dashboard" element={<BusinessDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/dhl-data" element={<DHLDataPage />} /> {/* Add the new route */}
        <Route path="/pickup" element={<PickupLocationsPage />} />  {/* Define the route here */}
      </Routes>
      
    </Router>
  );
};

export default App;
