import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../src/assets/logo.png';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header">
      <div className="left">
        <img src={logo} alt="Milano Cineplex Logo" />
        <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "nav-links open" : "nav-links"}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/movies" onClick={() => setMenuOpen(false)}>Movies</Link></li>
          <li><Link to="/booking" onClick={() => setMenuOpen(false)}>Booking</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
          <li className="mobile-login"><Link to="/login" onClick={() => setMenuOpen(false)}>Login/SignUp</Link></li>
        </ul>
      </div>
      <div className="right">
        <p><Link to="/login">Login/SignUp</Link></p>
      </div>
    </div>
  );
};

export default Header;
