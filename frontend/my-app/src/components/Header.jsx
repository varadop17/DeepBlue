import React from 'react';
import './Header.css'; // Create this file for styling if needed

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">MyApp</h1>
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
