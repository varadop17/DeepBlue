// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LandingPage.css';
// import Header from '../components/Header';

// function LandingPage() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear()
//     window.location.reload()
//   }


//   const handleGetStarted = () => {
//     navigate('/signup');
//   };

//   const handleGetQuote = () => {
//     navigate('/quote');
//   };

//   const handleCalculator = () => {
//     navigate('/calculator');
//   };

//   return (
//     <main>
//       <Header />
//       <section className="hero">
//         <div className="hero-content">
//           <h1>Route Optimization</h1>
//           <p>Your trusted partner for smarter and efficient delivery solutions. Optimize routes to save time and reduce costs.</p>
          
//           <div className="hero-buttons">
//             <button className="btn-primary" onClick={handleGetStarted}>Get Started</button>
//             <button className="btn-secondary" onClick={handleGetQuote}>Get a Quote</button>
//             <button className="btn-secondary" onClick={handleCalculator}>Calculator</button>
//             <button className="btn-secondary" onClick={logout}>Logout</button>
//           </div>
//         </div>
//       </section>
//       <section className="content">
//         <section className="stats">
//           <div className="stat">
//             <img src="truck.jpg" alt="Truck 1" />
//             <p>32 Vehicles</p>
//           </div>
//           <div className="stat">
//             <img src="delivery.jpg" alt="Delivery" />
//             <p>24/7 Delivery</p>
//           </div>
//           <div className="stat">
//             <img src="customer.jpg" alt="Customer" />
//             <p>1000+ Happy Customers</p>
//           </div>
//         </section>
//         <section className="services">
//           <h2>Our Services</h2>
//           <div className="service">
//             <h3>Fast Delivery</h3>
//             <p>We ensure quick and reliable delivery services to meet your needs.</p>
//           </div>
//           <div className="service">
//             <h3>Real-time Tracking</h3>
//             <p>Track your shipments in real-time with our advanced tracking system.</p>
//           </div>
//           <div className="service">
//             <h3>Cost-effective Solutions</h3>
//             <p>Optimize your logistics costs with our efficient route planning.</p>
//           </div>
//         </section>
//         <section className="testimonials">
//           <h2>What Our Clients Say</h2>
//           <div className="testimonial">
//             <p>"The best logistics company we've ever worked with. Highly recommend!"</p>
//             <p>- John Doe, CEO of ABC Corp</p>
//           </div>
//           <div className="testimonial">
//             <p>"Their route optimization saved us a lot of time and money."</p>
//             <p>- Jane Smith, Logistics Manager at XYZ Ltd</p>
//           </div>
//         </section>
//       </section>
//       <footer>
//         <p>&copy; 2023 Logistics Company. All rights reserved.</p>
//       </footer>
//     </main>
//   );
// }

// export default LandingPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Header from '../components/Header';

function LandingPage() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  }

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleGetQuote = () => {
    navigate('/quote');
  };

  const handleCalculator = () => {
    navigate('/calculator');
  };

  const handlePickupLocations = () => {
    navigate('/pickup');  // New function to navigate to PickupLocationsPage
  };

  return (
    <main>
      <Header />
      <section className="hero">
        <div className="hero-content">
          <h1>Route Optimization</h1>
          <p>Your trusted partner for smarter and efficient delivery solutions. Optimize routes to save time and reduce costs.</p>
          
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>Get Started</button>
            <button className="btn-secondary" onClick={handleGetQuote}>Get a Quote</button>
            <button className="btn-secondary" onClick={handleCalculator}>Calculator</button>
            <button className="btn-secondary" onClick={logout}>Logout</button>
            <button className="btn-secondary" onClick={handlePickupLocations}>Pickup Locations</button> {/* New button */}
          </div>
        </div>
      </section>
      <section className="content">
        <section className="stats">
          <div className="stat">
            <img src="truck.jpg" alt="Truck 1" />
            <p>32 Vehicles</p>
          </div>
          <div className="stat">
            <img src="delivery.jpg" alt="Delivery" />
            <p>24/7 Delivery</p>
          </div>
          <div className="stat">
            <img src="customer.jpg" alt="Customer" />
            <p>1000+ Happy Customers</p>
          </div>
        </section>
        <section className="services">
          <h2>Our Services</h2>
          <div className="service">
            <h3>Fast Delivery</h3>
            <p>We ensure quick and reliable delivery services to meet your needs.</p>
          </div>
          <div className="service">
            <h3>Real-time Tracking</h3>
            <p>Track your shipments in real-time with our advanced tracking system.</p>
          </div>
          <div className="service">
            <h3>Cost-effective Solutions</h3>
            <p>Optimize your logistics costs with our efficient route planning.</p>
          </div>
        </section>
        <section className="testimonials">
          <h2>What Our Clients Say</h2>
          <div className="testimonial">
            <p>"The best logistics company we've ever worked with. Highly recommend!"</p>
            <p>- John Doe, CEO of ABC Corp</p>
          </div>
          <div className="testimonial">
            <p>"Their route optimization saved us a lot of time and money."</p>
            <p>- Jane Smith, Logistics Manager at XYZ Ltd</p>
          </div>
        </section>
      </section>
      <footer>
        <p>&copy; 2023 Logistics Company. All rights reserved.</p>
      </footer>
    </main>
  );
}

export default LandingPage;
