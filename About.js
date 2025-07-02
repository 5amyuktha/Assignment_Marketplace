import React from 'react';
import './App.css';

const expertise = [
  'Assignment Posting & Bidding',
  'User Verification & Trust',
  'Real-Time Notifications',
  'Secure Payment Integration',
  'Responsive Web Design',
  'Task Analytics & Reporting',
  'Mobile Ready Platform',
  'Custom Assignment Solutions',
  '24/7 Support',
];

const stats = [
  { label: 'Years in Service', value: '2+' },
  { label: 'Assignments Completed', value: '2000+' },
  { label: 'Trusted Taskers', value: '500+' },
  { label: 'User Satisfaction', value: '98%' },
];

function About() {
  return (
    <div className="about-root">
      <div className="container">
        <h2 className="about-headline">Empowering Students & Professionals</h2>
        <p className="about-subheadline">
          Assignment Marketplace is dedicated to connecting people who need help with assignments and tasks to a trusted community of skilled individuals. We make it easy, safe, and efficient to get your work done in today's fast-paced world.
        </p>
        <div className="about-grid">
          <div className="about-expertise-card">
            <h3 className="about-card-title">Our Expertise</h3>
            <ul className="about-expertise-list">
              {expertise.map((item, idx) => (
                <li key={idx}><span className="about-blue-check">✔</span> {item}</li>
              ))}
            </ul>
          </div>
          <div className="about-card">
            <h3 className="about-card-title">Our Mission</h3>
            <p>To deliver a seamless, secure, and user-friendly platform that helps people get their assignments and tasks done efficiently, while empowering skilled individuals to earn and grow.</p>
          </div>
          <div className="about-card">
            <h3 className="about-card-title">Our Vision</h3>
            <p>To be the leading online marketplace for assignment help and task outsourcing, trusted for quality, speed, and reliability.</p>
          </div>
          <div className="about-card">
            <h3 className="about-card-title">Our Values</h3>
            <p>Integrity, innovation, and customer satisfaction guide everything we do. We believe in building a supportive, transparent, and growth-oriented community.</p>
          </div>
        </div>
        <div className="about-stats-row">
          {stats.map((stat, idx) => (
            <div className="about-stat-card" key={idx}>
              <div className="about-stat-value">{stat.value}</div>
              <div className="about-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About; 