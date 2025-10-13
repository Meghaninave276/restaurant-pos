import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HeroSection.css";

// 🔹 Import images
import hero1 from "../../assets/img/heroSection-img/hero-Img01.jpg";
import hero2 from "../../assets/img/heroSection-img/hero-Img02.jpg";
import hero3 from "../../assets/img/heroSection-img/hero-Img03.jpeg";

export default function HeroSection() {
  const images = [hero1, hero2, hero3];
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // 🔁 Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero-container">
      {/* 🔹 Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}

      {/* 🔹 Overlay */}
      <div className="overlay"></div>

      {/* 🔹 Hero Content */}
      <div className="hero-content text-center">
        <h1>Maharaja Palace</h1>
        <p>Experience Royal Dining Like Never Before</p>
        <button className="btn-start" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>

      {/* 🔹 Features Section */}
      <div className="features-section container">
        <div className="row justify-content-center g-4">
          <div className="col-10 col-sm-8 col-md-4 col-lg-3 feature-card">
            <div className="icon">🍽️</div>
            <h4>Fast Order Entry</h4>
            <p>Take dine-in and takeaway orders seamlessly.</p>
          </div>
          <div className="col-10 col-sm-8 col-md-4 col-lg-3 feature-card">
            <div className="icon">🧾</div>
            <h4>Billing Made Simple</h4>
            <p>Generate accurate bills instantly with one click.</p>
          </div>
          <div className="col-10 col-sm-8 col-md-4 col-lg-3 feature-card">
            <div className="icon">📊</div>
            <h4>Detailed Analytics</h4>
            <p>Track sales and performance with smart reports.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
