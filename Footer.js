import React, { useEffect, useRef } from 'react';
import './App.css';

const dotsCount = 18;
const dotsColors = ['#3b82f6', '#60a5fa', '#2563eb', '#93c5fd'];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function Footer() {
  const dotsRef = useRef([]);

  useEffect(() => {
    let animId;
    const animate = () => {
      dotsRef.current.forEach(dot => {
        if (!dot) return;
        let x = parseFloat(dot.dataset.x);
        let y = parseFloat(dot.dataset.y);
        let dx = parseFloat(dot.dataset.dx);
        let dy = parseFloat(dot.dataset.dy);
        x += dx;
        y += dy;
        if (x < 0 || x > 100) dot.dataset.dx = -dx;
        if (y < 0 || y > 100) dot.dataset.dy = -dy;
        dot.style.left = `${x}%`;
        dot.style.top = `${y}%`;
        dot.dataset.x = x;
        dot.dataset.y = y;
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <footer className="footer-root">
      {/* Footer Content */}
      <div className="footer-content">
        <div className="footer-col">
          <h3 className="footer-title">Contact Us</h3>
          <div className="footer-contact-item">📧 nakirikantisamyuktha@gmail.com</div>
          <div className="footer-contact-item">📧 gunduvinay@gmail.com</div>
        </div>
        <div className="footer-col">
          <h3 className="footer-title">Address</h3>
          <div className="footer-contact-item">123, Main Street, Hyderabad, India</div>
          <div className="footer-contact-item">Phone: +91-9876543210</div>
        </div>
      </div>
      <div className="footer-bottom">© 2025 Assignment Marketplace. All rights reserved.</div>
      {/* SVG Waves at the very bottom */}
      <div className="footer-waves">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="footer-wave-svg">
          <path d="M0,80 C360,160 1080,0 1440,80 L1440,120 L0,120 Z" fill="#3b82f6" fillOpacity="0.18" />
          <path d="M0,100 C400,0 1040,200 1440,60 L1440,120 L0,120 Z" fill="#3b82f6" fillOpacity="0.28" />
          <path d="M0,90 C400,60 1040,120 1440,90 L1440,120 L0,120 Z" fill="#3b82f6" fillOpacity="0.45" />
        </svg>
        {/* Floating Dots (footer only, will move global dots to App.js) */}
        <div className="footer-dots">
          {Array.from({ length: dotsCount }).map((_, i) => (
            <div
              key={i}
              ref={el => dotsRef.current[i] = el}
              className="footer-dot"
              style={{
                left: `${random(5, 95)}%`,
                top: `${random(10, 80)}%`,
                background: dotsColors[i % dotsColors.length],
                width: `${random(10, 22)}px`,
                height: `${random(10, 22)}px`,
                opacity: random(0.18, 0.38),
              }}
              data-x={random(5, 95)}
              data-y={random(10, 80)}
              data-dx={random(-0.08, 0.08)}
              data-dy={random(-0.06, 0.06)}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer; 