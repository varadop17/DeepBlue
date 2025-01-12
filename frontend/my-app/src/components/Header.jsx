// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';

// function Header() {
//   return (
//     <header className="header">
//       <div className="logo">
//         <Link to="/">Logistics Company</Link>
//       </div>
//       <nav className="nav">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/services">Services</Link>
//         <Link to="/contact">Contact</Link>
//         <Link to="/login" className="btn-login">Login</Link>
//       </nav>
//     </header>
//   );
// }

// export default Header;


import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
      <img src="/routify_logo_final.png" alt="Routify Logo" className="logo-image" />

      {/* Adjust the path as necessary */}
      <Link to="/">Routify</Link>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login" className="btn-login">Login</Link>
        <Link to="/dhl-data">DHL Data</Link> {/* New Link */}

      </nav>
    </header>
  );
};

export default Header;