// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './LandingPage.css';
// import Header from '../components/Header';

// function LandingPage() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   const handleGetStarted = () => {
//     navigate('/signup');
//   };

//   const handleGetQuote = () => {
//     navigate('/quote');
//   };

//   const handleCalculator = () => {
//     navigate('/calculator');
//   };

//   const handlePickupLocations = () => {
//     navigate('/pickup');
//   };

//   const handleGoogleMapPage = () => {
//     navigate('/google-map');
//   };

//   return (
//     <main>
//       <Header />
//       <section className="hero">
//         <div className="hero-content">
//           <h1 className="welcome"> Welcome to the Future of Smart Logistics! 🚀</h1>
//           <p className="welcome">"Optimize Routes. Cut Costs. Deliver Faster."</p>
// <p className="welcome">
// Seamlessly plan, track, and optimize fleet routes with AI-powered precision. Reduce delays, save fuel, and maximize profits—because every mile counts.

// 🔹 Real-Time Traffic Insights | 🔹 AI-Driven Optimization | 🔹 Cost-Efficient Deliveries

// Powering Smarter Logistics, One Route at a Time. 🚛💨</p>
          
//           <div className="hero-buttons">
//             <button className="btn-primary" onClick={handleGetStarted}>Get Started</button>
//             {/* <button className="btn-secondary" onClick={handleGetQuote}>Get a Quote</button> */}
//             <button className="btn-primary" onClick={handleCalculator}>Calculator</button>
//             {/* <button className="btn-secondary" onClick={logout}>Logout</button>
//             <button className="btn-secondary" onClick={handlePickupLocations}>Pickup Locations</button> */}
//             <button className="btn-primary" onClick={handleGoogleMapPage}>Map</button>
//           </div>
//         </div>
//       </section>
//       <section className="content">
//       </section>
//       <footer>
//         <p>&copy; 2025 Routify Company. All rights reserved.</p>
//       </footer>
//     </main>
//   );
// };

// export default LandingPage;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LandingPage.css';
// import Header from '../components/Header.jsx';

// function LandingPage() {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     // Get userName from localStorage
//     const storedUser = localStorage.getItem('userName');
//     if (storedUser) {
//       setUserName(storedUser);
//     }
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   return (
//     <main>
//       <Header />
//       <section className="hero">
//         <div className="hero-content">
//           <h1 className="welcome">Welcome to the Future of Smart Logistics! 🚀</h1>
//           <p className="welcome">"Optimize Routes. Cut Costs. Deliver Faster."</p>

//           <div className="hero-buttons">
//             <button className="btn-primary" onClick={() => navigate('/signup')}>Get Started</button>
//             <button className="btn-primary" onClick={() => navigate('/calculator')}>Calculator</button>
//             <button className="btn-primary" onClick={() => navigate('/google-map')}>Map</button>
//           </div>
//         </div>
//       </section>
      
//       <section className="user-info">
//         <p className="hello-user">Hello, {userName}!</p>
//         <button className="btn-secondary" onClick={logout}>Logout</button>
//       </section>

//       <footer>
//         <p>&copy; 2025 Routify Company. All rights reserved.</p>
//       </footer>
//     </main>
//   );
// }

// export default LandingPage;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Header from '../components/Header.jsx';

const LandingPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <main>
      <Header />
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to the Future of Smart Logistics! 🚀</h1>
          <p>"Optimize Routes. Cut Costs. Deliver Faster."</p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/signup')}>Get Started</button>
            <button onClick={() => navigate('/calculator')}>Calculator</button>
            <button onClick={() => navigate('/google-map')}>Map</button>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Routify Company. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default LandingPage;
