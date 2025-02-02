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
import DHLDataPage from './service/DHLDataPage';
import PickupLocationsPage from './pages/PickupLocationsPage';
import MapPage from './pages/MapPage'; // Import the new MapPage component
import DestinationLocationsPage from './pages/DestinationLocationsPage'; // Import the new DestinationLocationsPage component

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
        <Route path="/dhl-data" element={<DHLDataPage />} />
        <Route path="/pickup" element={<PickupLocationsPage />} />
        <Route path="/destination" element={<DestinationLocationsPage />} /> {/* New route for the combined page */}
        <Route path="/map" element={<><Header /><MapPage /></>} /> {/* Route for the map page */}
      </Routes>
    </Router>
  );
};

export default App;
