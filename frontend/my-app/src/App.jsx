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
import reactLogo from "./assets/react.svg"; // React logo for Vite
import viteLogo from "/vite.svg"; // Vite logo
import "./App.css"; // Custom styles
import LandingPage from "./pages/LandingPage"; // Landing page component
import LoginPage from "./components/LoginPage"; // Login page component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Vite and React logos for branding (can remove if unnecessary) */}
        <header className="App-header">
          <img src={reactLogo} className="App-logo" alt="React Logo" />
          <img src={viteLogo} className="App-logo" alt="Vite Logo" />
        </header>
        {/* React Router for Navigation */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
