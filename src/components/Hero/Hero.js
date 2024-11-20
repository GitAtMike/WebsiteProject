import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Community Driven Recipes</h1>
        <h5 className="hero-subtitle">Save, submit, and rate.</h5>
        <button className="btn">Explore</button>
      </div>
    </div>
  );
};

export default Hero;
