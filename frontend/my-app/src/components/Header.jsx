// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="logo">
//         <img src="/routify_logo_final.png" alt="Routify Logo" className="logo-image" />
//         <Link to="/">Routify</Link>
//       </div>
//       <nav className="nav">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/services">Services</Link>
//         <Link to="/contact">Contact</Link>
//         <Link to="/login" className="btn-login">Login</Link>
//         {/* <Link to="/login" className="btn-login">Login</Link> */}
//         {/* <Link to="/dhl-data">DHL Data</Link> New Link */}
//       </nav>
//     </header>
//   );
// };

// export default Header;




// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Header.css';

// const Header = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check if the user is logged in
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//       setUsername(storedUsername);
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     navigate('/login'); // Redirect to login page after logout
//   };

//   return (
//     <header className="header">
//       <div className="logo">
//         <img src="/routify_logo_final.png" alt="Routify Logo" className="logo-image" />
//         <Link to="/">Routify</Link>
//       </div>

//       <nav className="nav">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/services">Services</Link>
//         <Link to="/contact">Contact</Link>

//         {/* Show Login button only if the user is not logged in */}
//         {!isLoggedIn && <Link to="/login" className="btn-login">Login</Link>}

//         {/* Show "Hello, User!" and Logout button when logged in */}
//         {isLoggedIn && (
//           <div className="user-info">
//             <span className="welcome-text">Hello, {username}!</span>
//             <button className="btn-logout" onClick={handleLogout}>Logout</button>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;




import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('userName');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/home');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/routify_logo_final.png" alt="Routify Logo" className="logo-image" />
        <Link to="/">Routify</Link>
      </div>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>

        {!isLoggedIn ? (
          <Link to="/login" className="btn-login">Login</Link>
        ) : (
          <div className="user-info">
            <span className="welcome-text">Hello, {username}!</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
