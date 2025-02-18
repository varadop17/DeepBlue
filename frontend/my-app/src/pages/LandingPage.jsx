// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LandingPage.css';
// import Header from '../components/Header';

// function LandingPage() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     window.location.reload();
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

//   const handlePickupLocations = () => {
//     navigate('/pickup');  // New function to navigate to PickupLocationsPage
//   };

//   const handleGoogleMapPage = () => {
//     navigate('/google-map');  // New function to navigate to GoogleMapPage
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
//             <button className="btn-secondary" onClick={handlePickupLocations}>Pickup Locations</button> {/* New button */}
//             <button className="btn-secondary" onClick={handleGoogleMapPage}>Map</button> {/* New button */}
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


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './LandingPage.css';
// import Header from '../components/Header';

// function LandingPage() {
//   const navigate = useNavigate();
//   const [address, setAddress] = useState('');
//   const [coordinates, setCoordinates] = useState(null);

//   const logout = () => {
//     localStorage.clear();
//     window.location.reload();
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

//   const handlePickupLocations = () => {
//     navigate('/pickup');
//   };

//   const handleGoogleMapPage = () => {
//     navigate('/google-map');
//   };

//   const handleGeocode = async () => {
//     const apiKey = 'AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA';
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//     try {
//       const response = await axios.get(url);
//       const location = response.data.results[0].geometry.location;
//       setCoordinates(location);
//       alert(`Coordinates: ${location.lat}, ${location.lng}`);
//     } catch (error) {
//       console.error('Error fetching geocode:', error);
//       alert('Failed to fetch coordinates. Please try again.');
//     }
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
//             <button className="btn-secondary" onClick={handlePickupLocations}>Pickup Locations</button>
//             <button className="btn-secondary" onClick={handleGoogleMapPage}>Map</button>
//           </div>
//         </div>
//       </section>
//       <section className="content">
//         <section className="geocode">
//           <h2>Geocode Address</h2>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="Enter address"
//           />
//           <button className="btn-secondary" onClick={handleGeocode}>Get Coordinates</button>
//           {coordinates && (
//             <p>Coordinates: {coordinates.lat}, {coordinates.lng}</p>
//           )}
//         </section>
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



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './LandingPage.css';
// import Header from '../components/Header';

// function LandingPage() {
//   const navigate = useNavigate();
//   const [origin, setOrigin] = useState('');
//   const [destination, setDestination] = useState('');
//   const [distance, setDistance] = useState(null);

//   const logout = () => {
//     localStorage.clear();
//     window.location.reload();
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

//   const handlePickupLocations = () => {
//     navigate('/pickup');
//   };

//   const handleGoogleMapPage = () => {
//     navigate('/google-map');
//   };

//   const handleDistanceMatrix = async () => {
//     const apiKey = 'AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA';
//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

//     try {
//       const response = await axios.get(url);
//       const distanceData = response.data.rows[0].elements[0].distance.text;
//       setDistance(distanceData);
//       alert(`Distance: ${distanceData}`);
//     } catch (error) {
//       console.error('Error fetching distance matrix:', error);
//       alert('Failed to fetch distance. Please try again.');
//     }
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
//             <button className="btn-secondary" onClick={handlePickupLocations}>Pickup Locations</button>
//             <button className="btn-secondary" onClick={handleGoogleMapPage}>Map</button>
//           </div>
//         </div>
//       </section>
//       <section className="content">
//         <section className="distance-matrix">
//           <h2>Calculate Distance</h2>
//           <input
//             type="text"
//             value={origin}
//             onChange={(e) => setOrigin(e.target.value)}
//             placeholder="Enter origin"
//           />
//           <input
//             type="text"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//             placeholder="Enter destination"
//           />
//           <button className="btn-secondary" onClick={handleDistanceMatrix}>Get Distance</button>
//           {distance && (
//             <p>Distance: {distance}</p>
//           )}
//         </section>
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


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css';
import Header from '../components/Header';

function LandingPage() {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(null);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

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
    navigate('/pickup');
  };

  const handleGoogleMapPage = () => {
    navigate('/google-map');
  };

  const handleDistanceMatrix = async () => {
    const apiKey = 'AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA';
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const distanceData = response.data.rows[0].elements[0].distance.text;
      setDistance(distanceData);
      alert(`Distance: ${distanceData}`);
    } catch (error) {
      console.error('Error fetching distance matrix:', error);
      alert('Failed to fetch distance. Please try again.');
    }
  };

  const handleGeocode = async () => {
    const apiKey = 'AIzaSyByngCvU0KITYYtIITq4CKlZTnruya53UA';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const location = response.data.results[0].geometry.location;
      setCoordinates(location);
      alert(`Coordinates: ${location.lat}, ${location.lng}`);
    } catch (error) {
      console.error('Error fetching geocode:', error);
      alert('Failed to fetch coordinates. Please try again.');
    }
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
            <button className="btn-secondary" onClick={handlePickupLocations}>Pickup Locations</button>
            <button className="btn-secondary" onClick={handleGoogleMapPage}>Map</button>
          </div>
        </div>
      </section>
      <section className="content">
        <section className="distance-matrix">
          <h2>Calculate Distance</h2>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter origin"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
          />
          <button className="btn-secondary" onClick={handleDistanceMatrix}>Get Distance</button>
          {distance && (
            <p>Distance: {distance}</p>
          )}
        </section>
        <section className="geocode">
          <h2>Geocode Address</h2>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
          />
          <button className="btn-secondary" onClick={handleGeocode}>Get Coordinates</button>
          {coordinates && (
            <p>Coordinates: {coordinates.lat}, {coordinates.lng}</p>
          )}
        </section>
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