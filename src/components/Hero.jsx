import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="glowing-lines">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="hero-content">
        <h1>Welcome to <span>Milano Cineplex</span></h1>
        <p>Experience the Future of Cinema with Ultra HD & Immersive Sound</p>
        <button className="hero-btn">Book Now</button>
      </div>
    </div>
  );
};

export default Hero;
