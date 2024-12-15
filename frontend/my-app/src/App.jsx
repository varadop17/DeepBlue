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


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Landing page component
import LoginPage from "./components/LoginPage"; // Login page component
import SignUpPage from "./components/SignUpPage"; // Sign-Up page component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
