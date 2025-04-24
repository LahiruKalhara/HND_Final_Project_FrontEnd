import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Hero.css";
import { Link } from 'react-router-dom';

const Hero = () => {
  useEffect(() => {

    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="hero">
      <div className="glowing-lines">
        <span data-aos="fade-up"></span>
        <span data-aos="fade-up"></span>
        <span data-aos="fade-up"></span>
        <span data-aos="fade-up"></span>
        <span data-aos="fade-up"></span>
        <span data-aos="fade-up"></span>
      </div>

      <div className="hero-content" data-aos="fade-up">
        <h1 data-aos="fade-up" >
          Welcome to <span>Milano Cineplex</span>
        </h1>
        <p data-aos="fade-up">Experience the Future of Cinema with Ultra HD & Immersive Sound</p>
        <button className="hero-btn" data-aos="fade-up">
          <Link to="/booking" style={{ textDecoration: 'none', color: 'inherit' }}>
            Book Now
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
