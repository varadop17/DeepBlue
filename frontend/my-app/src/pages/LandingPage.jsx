// import React from 'react';
// import './LandingPage.css';

// function LandingPage() {
//   return (
//     <div className="landing-page">
//       <header className="header">
//         <h1>Optimising Fleet Routes</h1>
//         <p>For a Logistic Company</p>
//       </header>
//       <main className="main-content">
//         <section className="intro">
//           <h2>Welcome to Our Project</h2>
//           <p>
//             Our goal is to optimize fleet routes to improve efficiency and reduce costs for logistic companies.
//           </p>
//         </section>
//         <section className="features">
//           <h2>Features</h2>
//           <ul>
//             <li>Real-time route optimization</li>
//             <li>Cost reduction strategies</li>
//             <li>Improved delivery times</li>
//             <li>Comprehensive analytics</li>
//           </ul>
//         </section>
//         <section className="contact">
//           <h2>Contact Us</h2>
//           <p>Email: info@logisticcompany.com</p>
//         </section>
//       </main>
//       <footer className="footer">
//         <p>&copy; 2023 Logistic Company. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default LandingPage;

// import React from "react";
// import "./LandingPage.css";

// const LandingPage = () => {
//   return (
//     <div className="landing-page">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="navbar-left">
//           <img src="logo.png" alt="ROUTIFY Logo" className="logo" />
//           <span className="website-name">ROUTIFY</span>
//         </div>
//         <div className="navbar-center">
//           <a href="#home" className="nav-item">Home</a>
//           <a href="#services" className="nav-item">Services</a>
//           <a href="#about" className="nav-item">About</a>
//           <a href="#contact" className="nav-item">Contact</a>
//         </div>
//         <div className="navbar-right">
//           <button className="login-button">Login</button>
//         </div>
//       </nav>

//       {/* Main Section */}
//       <div className="main-section">
//         <img src="delivery-image1.png" alt="Delivery" className="main-image" />
//         <div className="buttons-container">
//           <button className="action-button book-delivery">Book Your Delivery</button>
//           <button className="action-button track-shipment">Track Your Shipment</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;



import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src="logo.png" alt="ROUTIFY Logo" className="logo" />
          <span className="website-name">ROUTIFY</span>
        </div>
        <div className="navbar-center">
          <a href="#home" className="nav-item">Home</a>
          <a href="#services" className="nav-item">Services</a>
          <a href="#about" className="nav-item">About</a>
          <a href="#contact" className="nav-item">Contact</a>
        </div>
        <div className="navbar-right">
          <button className="login-button">Login</button>
        </div>
      </nav>

      {/* Main Section */}
      <div className="main-section">
        <img src="delivery-image.jpg" alt="Delivery" className="main-image" />
        <div className="buttons-container">
          <button className="action-button book-delivery">Book Your Delivery</button>
          <button className="action-button track-shipment">Track Your Shipment</button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section" id="features">
        <h2>Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Optimized Routing</h3>
            <p>Find the fastest and most efficient routes for your deliveries.</p>
          </div>
          <div className="feature-item">
            <h3>Real-time Tracking</h3>
            <p>Track your shipments in real-time to ensure timely delivery.</p>
          </div>
          <div className="feature-item">
            <h3>Cost Efficiency</h3>
            <p>Reduce fuel and operational costs with optimized routes.</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 ROUTIFY. All rights reserved.</p>
          <p>
            <a href="#privacy-policy" className="footer-link">Privacy Policy</a> |{" "}
            <a href="#terms-of-service" className="footer-link">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
