// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import LandingPage from './pages/LandingPage'
// import LoginPage from './components/LoginPage'

// function App() {
//   return(
//     <LandingPage/>
   
//   )
// }


// export default App


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPage"; // Landing page component
// import LoginPage from "./components/LoginPage"; // Login page component
// import SignUpPage from "./components/SignUpPage"; // Sign-Up page component

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import LandingPage from './pages/LandingPage';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/home" element={<LandingPage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login/>} />
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/" element={<h1>Welcome to FastTrack Logistics</h1>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import LandingPage from './pages/LandingPage';
// import AdminDashboard from './components/AdminDashboard';
// import BusinessDashboard from './components/BusinessDashboard';
// import UserDashboard from './components/UserDashboard';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/home" element={<LandingPage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/business-dashboard" element={<BusinessDashboard />} />
//         <Route path="/user-dashboard" element={<UserDashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import LandingPage from './pages/LandingPage';
// import AdminDashboard from './components/AdminDashboard';
// import BusinessDashboard from './components/BusinessDashboard';
// import UserDashboard from './components/UserDashboard';
// import Header from './components/Header';

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/home" element={<LandingPage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/business-dashboard" element={<BusinessDashboard />} />
//         <Route path="/user-dashboard" element={<UserDashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import LandingPage from './pages/LandingPage';
// import AdminDashboard from './components/AdminDashboard';
// import BusinessDashboard from './components/BusinessDashboard';
// import UserDashboard from './components/UserDashboard';
// import Header from './components/Header';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<><Header /><LandingPage /></>} />
//         <Route path="/home" element={<><Header /><LandingPage /></>} />
//         <Route path="/signup" element={<><Header /><Signup /></>} />
//         <Route path="/login" element={<><Header /><Login /></>} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/business-dashboard" element={<BusinessDashboard />} />
//         <Route path="/user-dashboard" element={<UserDashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import LandingPage from './pages/LandingPage';
// import AdminDashboard from './components/AdminDashboard';
// import BusinessDashboard from './components/BusinessDashboard';
// import UserDashboard from './components/UserDashboard';
// import QuotePage from './components/QuotePage';
// import Header from './components/Header';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<><Header /><LandingPage /></>} />
//         <Route path="/home" element={<><Header /><LandingPage /></>} />
//         <Route path="/signup" element={<><Header /><Signup /></>} />
//         <Route path="/login" element={<><Header /><Login /></>} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/business-dashboard" element={<BusinessDashboard />} />
//         <Route path="/user-dashboard" element={<UserDashboard />} />
//         <Route path="/quote" element={<QuotePage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


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
      </Routes>
    </Router>
  );
};

export default App;