import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import CreateAnnouncement from './CreateAnnouncement';
import BrowseTasks from './BrowseTasks';
import About from './About';
import Footer from './Footer';
import GlobalFloatingBalls from './GlobalFloatingBalls';
import './App.css';

const subjectIcons = {
  Mathematics: '🧮',
  'Computer Science': '💻',
  History: '📚',
  Seminar: '🎤',
  Physics: '🔬',
  Design: '🎨',
  English: '📝',
};

const services = [
  { icon: '👍', title: 'User Friendly', short: 'Intuitive navigation for all users. Simple posting and bidding process. No technical skills required.', full: 'Our platform is designed with a user-friendly interface, making it simple for anyone to post or bid on tasks. You can easily navigate, create announcements, and place bids without any technical knowledge. The clean design ensures a smooth experience for everyone.' },
  { icon: '✅', title: 'Quality Assurance', short: 'High quality work guaranteed. Verified taskers and reviews. Consistent results every time.', full: 'We ensure that all work delivered meets high standards of quality and professionalism. Our review system and verification process help you find the best people for your tasks, so you can trust the results.' },
  { icon: '⚡', title: 'Fast Delivery', short: 'Quick turnaround times for tasks. Real-time notifications for updates. Get your work done on time.', full: 'Get your tasks completed quickly with our efficient community of taskers. You receive instant updates and can track progress, ensuring deadlines are always met.' },
  { icon: '🔒', title: 'Secure Payments', short: 'Safe and secure transactions. Payments held until job is done. No hidden fees or surprises.', full: 'All payments are processed securely, ensuring your money is safe until the job is done. We use trusted payment gateways and escrow to protect both parties.' },
  { icon: '🕑', title: '24/7 Support', short: 'Help whenever you need it. Friendly support team available. Fast response to your queries.', full: 'Our support team is available around the clock to assist you with any issues or questions. We pride ourselves on quick, helpful responses.' },
  { icon: '🛠', title: 'Custom Solutions', short: 'Tailored to your needs. Flexible task options. Adaptable to any project size.', full: 'We offer custom solutions to fit your unique requirements, no matter the task. Whether it\'s a one-time job or a recurring project, we can help.' },
  { icon: '📈', title: 'Scalability', short: 'Grows with your needs. Handle small or large projects. No limits on tasks or bids.', full: 'Our platform can handle tasks of any size, from small assignments to large projects. As your needs grow, we scale with you.' },
  { icon: '💡', title: 'Innovation', short: 'Always improving features. Latest technology for efficiency. Stay ahead with new tools.', full: 'We continuously update our platform with the latest features and technologies. You benefit from ongoing improvements and new capabilities.' },
  { icon: '💸', title: 'Cost Effective', short: 'Affordable pricing for all. Transparent fees and no surprises. Best value for your money.', full: 'Get the best value for your money with competitive pricing and no hidden fees. Our transparent system ensures you know exactly what you\'re paying for.' },
  { icon: '🤝', title: 'Trusted Community', short: 'Work with verified users. Ratings and reviews for trust. Safe and supportive environment.', full: 'All users are verified and reviewed to ensure a safe and trustworthy environment. You can check ratings and feedback before working with anyone.' },
  { icon: '🔗', title: 'Easy Integration', short: 'Connect with your favorite tools. Simple API for developers. Seamless workflow integration.', full: 'Easily integrate our platform with your favorite tools and services. Our API and integrations make it easy to connect and automate your workflow.' },
  { icon: '📊', title: 'Analytics & Reports', short: 'Track your progress easily. Visual reports and insights. Make data-driven decisions.', full: 'Get detailed analytics and reports to monitor your tasks and performance. Use insights to improve your workflow and results.' },
  { icon: '📱', title: 'Mobile Ready', short: 'Use on any device. Responsive design for phones and tablets. Access your tasks anywhere.', full: 'Access our platform from your phone, tablet, or computer, anytime, anywhere. The responsive design ensures a great experience on all devices.' },
  { icon: '☁️', title: 'Cloud Hosting', short: 'Reliable cloud infrastructure. Secure data storage. Always available and up-to-date.', full: 'Your data is securely hosted on the cloud for maximum reliability and uptime. Enjoy peace of mind knowing your information is safe and accessible.' },
  { icon: '🎯', title: 'Dedicated Support', short: 'Personalized help for you. Fast issue resolution. Friendly and knowledgeable team.', full: 'Get personalized support from our dedicated team whenever you need it. We\'re here to help you succeed and resolve any issues quickly.' },
];

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidLoading, setBidLoading] = useState(false);
  const [bidError, setBidError] = useState(null);
  const [bidForm, setBidForm] = useState({ bidder_name: '', bid_amount: '', message: '' });
  const [bidSuccess, setBidSuccess] = useState(null);
  const [serviceModal, setServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/announcements')
      .then(res => res.json())
      .then(data => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load announcements');
        setLoading(false);
      });
  }, []);

  // Fetch bids when modal opens
  useEffect(() => {
    if (modalOpen && selectedAnnouncement) {
      setBidLoading(true);
      setBidError(null);
      setBidSuccess(null);
      fetch(`http://localhost:5000/api/announcements/${selectedAnnouncement.id}`)
        .then(res => res.json())
        .then(data => {
          setBids(data.bids || []);
          setBidLoading(false);
        })
        .catch(() => {
          setBidError('Failed to load bids');
          setBidLoading(false);
        });
    }
  }, [modalOpen, selectedAnnouncement]);

  const handleCardClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAnnouncement(null);
    setBids([]);
    setBidForm({ bidder_name: '', bid_amount: '', message: '' });
    setBidSuccess(null);
    setBidError(null);
  };

  const handleBidChange = (e) => {
    setBidForm({ ...bidForm, [e.target.name]: e.target.value });
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setBidError(null);
    setBidSuccess(null);
    if (!bidForm.bidder_name || !bidForm.bid_amount) {
      setBidError('Name and amount are required');
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/announcements/${selectedAnnouncement.id}/bids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bidForm),
      });
      if (!res.ok) throw new Error('Failed to place bid');
      setBidSuccess('Bid placed successfully!');
      setBidForm({ bidder_name: '', bid_amount: '', message: '' });
      // Refresh bids
      const data = await res.json();
      setBids(prev => [data, ...prev]);
    } catch (err) {
      setBidError('Failed to place bid. Please try again.');
    }
  };

  return (
    <Router>
      <GlobalFloatingBalls />
      <div className="app-root">
        <header className="main-header">
          <div className="container header-content">
            <h1 className="logo">
              <span role="img" aria-label="assignment">📝</span>
              <span className="logo-gradient">Assignment Marketplace</span>
            </h1>
            <nav className="nav-links">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
              <NavLink to="/create" className={({ isActive }) => isActive ? 'active' : ''}>Create Announcement</NavLink>
              <NavLink to="/browse" className={({ isActive }) => isActive ? 'active' : ''}>Browse Tasks</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/create" element={<CreateAnnouncement />} />
          <Route path="/browse" element={<BrowseTasks />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={
            <>
              <section className="hero-section">
                <div className="container">
                  <h2 className="hero-title">Get Your Work Done Effortlessly</h2>
                  <p className="hero-desc">
                    Too lazy to do your assignments or tasks? Create an announcement, let others place their bids, and get your work done quickly and professionally. Join our trusted community today!
                  </p>
                  <Link to="/create" className="cta-btn">Create Announcement</Link>
                </div>
              </section>
              <section className="services-section">
                <div className="container">
                  <h3 className="section-title">Our Business Solutions</h3>
                  <p className="services-desc">We provide comprehensive technology and business process solutions to help you thrive in today&apos;s digital landscape.</p>
                  <div className="services-grid-fixed">
                    {services.map((service, idx) => (
                      <div className="service-card" key={idx}>
                        <div className="service-icon">{service.icon}</div>
                        <h4 className="service-title">{service.title}</h4>
                        <p className="service-short">{service.short}</p>
                        <button className="service-readmore" onClick={() => { setSelectedService(service); setServiceModal(true); }}>Read More</button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          } />
        </Routes>
        {serviceModal && selectedService && (
          <div className="modal-overlay" onClick={() => setServiceModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setServiceModal(false)}>&times;</button>
              <div className="modal-icon" style={{ fontSize: '2.5rem' }}>{selectedService.icon}</div>
              <h4 className="modal-title">{selectedService.title}</h4>
              <div className="modal-details">
                <p>{selectedService.full}</p>
              </div>
            </div>
          </div>
        )}
        {modalOpen && selectedAnnouncement && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={handleCloseModal}>&times;</button>
              <div className="modal-icon">{subjectIcons[selectedAnnouncement.subject] || '📄'}</div>
              <h4 className="modal-title">{selectedAnnouncement.title}</h4>
              <div className="modal-details">
                <p><span className="meta-label">Subject:</span> {selectedAnnouncement.subject}</p>
                <p><span className="meta-label">Summary:</span> {selectedAnnouncement.summary}</p>
                <p><span className="meta-label">Details:</span> {selectedAnnouncement.details}</p>
                <p><span className="meta-label">Deadline:</span> {selectedAnnouncement.deadline}</p>
                <p><span className="meta-label">Price:</span> {selectedAnnouncement.price}</p>
                <p><span className="meta-label">Contact:</span> {selectedAnnouncement.contact}</p>
              </div>
              <div className="bids-section">
                <h5>Bids</h5>
                {bidLoading && <div>Loading bids...</div>}
                {bidError && <div className="error-text">{bidError}</div>}
                {bids.length === 0 && !bidLoading && <div>No bids yet.</div>}
                <ul className="bids-list">
                  {bids.map(bid => (
                    <li key={bid.id} className={bid.is_accepted ? 'bid-accepted' : ''}>
                      <div><b>{bid.bidder_name}</b> bid <b>{bid.bid_amount}</b></div>
                      {bid.message && <div className="bid-message">{bid.message}</div>}
                      <div className="bid-meta">{new Date(bid.created_at).toLocaleString()} {bid.is_accepted && <span className="accepted-badge">Accepted</span>}</div>
                    </li>
                  ))}
                </ul>
                <form className="bid-form" onSubmit={handleBidSubmit}>
                  <h6>Place a Bid</h6>
                  <input type="text" name="bidder_name" placeholder="Your Name" value={bidForm.bidder_name} onChange={handleBidChange} />
                  <input type="text" name="bid_amount" placeholder="Bid Amount" value={bidForm.bid_amount} onChange={handleBidChange} />
                  <input type="text" name="message" placeholder="Message (optional)" value={bidForm.message} onChange={handleBidChange} />
                  <button type="submit">Place Bid</button>
                  {bidSuccess && <div className="success-message">{bidSuccess}</div>}
                  {bidError && <div className="error-text">{bidError}</div>}
                </form>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
