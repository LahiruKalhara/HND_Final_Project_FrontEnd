import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../../src/assets/logo.png';
import './Header.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';




const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="header">
      <div className="left" data-aos="fade-down">
        <img src={logo} alt="Milano Cineplex Logo" />
        <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>
        <ul className={menuOpen ? "nav-links open" : "nav-links"}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/movies" onClick={() => setMenuOpen(false)}>Movies</Link></li>
          <li><Link to="/booking" onClick={() => setMenuOpen(false)}>Booking</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
          {!user && (
            <li className="mobile-login"><Link to="/login" onClick={() => setMenuOpen(false)}>Login/SignUp</Link></li>
          )}
        </ul>
      </div>
      <div className="right" data-aos="fade-down">
        {!user ? (
          <p><Link to="/login">Login/SignUp</Link></p>
        ) : (
          <div className="user-icon-container">
            <FaUserCircle
              size={30}
              color="#00f7ff"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            />
            {dropdownOpen && (
              <div className="user-dropdown">
                <p className="dropdown-item">Hello, {user.userName}</p>
                <Link to="/booked-tickets" className="dropdown-item">Booked Tickets</Link>
                <p
                  className="dropdown-item"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </p>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
