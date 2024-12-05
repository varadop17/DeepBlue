import React from 'react';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>Optimising Fleet Routes</h1>
        <p>For a Logistic Company</p>
      </header>
      <main className="main-content">
        <section className="intro">
          <h2>Welcome to Our Project</h2>
          <p>
            Our goal is to optimize fleet routes to improve efficiency and reduce costs for logistic companies.
          </p>
        </section>
        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>Real-time route optimization</li>
            <li>Cost reduction strategies</li>
            <li>Improved delivery times</li>
            <li>Comprehensive analytics</li>
          </ul>
        </section>
        <section className="contact">
          <h2>Contact Us</h2>
          <p>Email: info@logisticcompany.com</p>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2023 Logistic Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;