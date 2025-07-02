import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const imageUrls = [
  'https://plus.unsplash.com/premium_photo-1723780968446-ea2535cd1c30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXNzaW5nbWVudCUyMHdyaXRpbmd8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1710010966055-da0bcafdbd8c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXNzaW5nbWVudCUyMHdyaXRpbmd8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1710010966147-35c53f427a9b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXNzaW5nbWVudCUyMHdyaXRpbmd8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1630032866155-f87ec4d047bd?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFzc2luZ21lbnQlMjB3cml0aW5nfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1733819109723-92a56f6872a5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const initialForm = {
  title: '',
  subject: '',
  summary: '',
  details: '',
  deadline: '',
  price: '',
  contact: '',
};

const fieldIcons = {
  title: '📝',
  subject: '📚',
  summary: '💡',
  details: '🗒️',
  deadline: '📅',
  price: '💰',
  contact: '📞',
};

function CreateAnnouncement() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % imageUrls.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.summary.trim()) newErrors.summary = 'Summary is required';
    if (!form.details.trim()) newErrors.details = 'Details are required';
    if (!form.deadline.trim()) newErrors.deadline = 'Deadline is required';
    if (!form.price.trim()) newErrors.price = 'Price is required';
    if (!form.contact.trim()) newErrors.contact = 'Contact is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const res = await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to create announcement');
      setSubmitted(true);
      setForm(initialForm);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setErrorMsg('Failed to create announcement. Please try again.');
    }
  };

  return (
    <div className="create-announcement-root">
      <div className="create-announcement-card carousel-panel">
        <div className="carousel-img-wrapper">
          <img
            src={imageUrls[carouselIdx]}
            alt="Assignment visual"
            className="carousel-img"
            key={carouselIdx}
          />
          <div className="carousel-gradient-overlay" />
        </div>
        <div className="carousel-content">
          <h3 className="carousel-title">Share Your Task!</h3>
          <p className="carousel-desc">Let the community help you get things done faster and easier. Fill out the form and get bids from talented people!</p>
          <ul className="carousel-benefits">
            <li>✅ Get expert help fast</li>
            <li>✅ Fair, competitive bidding</li>
            <li>✅ Confidential & secure</li>
          </ul>
        </div>
        <div className="why-card">
          <div className="why-title">Why Assignment Marketplace?</div>
          <div className="why-point"><span className="why-icon">🕒</span> Fast turnaround: Get bids in minutes</div>
          <div className="why-point"><span className="why-icon">🛡️</span> Secure & private: Your info is safe</div>
          <div className="why-point"><span className="why-icon">🏆</span> Quality guaranteed: Rated, reviewed taskers</div>
        </div>
      </div>
      <div className="create-announcement-form-col">
        <h2 className="form-title"><span className="form-title-icon">📝</span> Create New Announcement</h2>
        <div className="form-intro">Fill out the details below and get bids from talented people!</div>
        {submitted && (
          <div className="success-message">🎉 Announcement created successfully!</div>
        )}
        {errorMsg && <div className="error-text">{errorMsg}</div>}
        <form className="announcement-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label>{fieldIcons.title} Title<span className="required">*</span></label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className={errors.title ? 'input-error' : ''} />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label>{fieldIcons.subject} Subject<span className="required">*</span></label>
            <input type="text" name="subject" value={form.subject} onChange={handleChange} className={errors.subject ? 'input-error' : ''} />
            {errors.subject && <span className="error-text">{errors.subject}</span>}
          </div>
          <div className="form-group">
            <label>{fieldIcons.summary} Summary<span className="required">*</span></label>
            <input type="text" name="summary" value={form.summary} onChange={handleChange} className={errors.summary ? 'input-error' : ''} />
            {errors.summary && <span className="error-text">{errors.summary}</span>}
          </div>
          <div className="form-group">
            <label>{fieldIcons.details} Details<span className="required">*</span></label>
            <textarea name="details" value={form.details} onChange={handleChange} className={errors.details ? 'input-error' : ''} rows={4} />
            {errors.details && <span className="error-text">{errors.details}</span>}
          </div>
          <div style={{ display: 'flex', gap: '1.2rem', width: '100%' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>{fieldIcons.deadline} Deadline<span className="required">*</span></label>
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className={errors.deadline ? 'input-error' : ''} />
              {errors.deadline && <span className="error-text">{errors.deadline}</span>}
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>{fieldIcons.price} Price<span className="required">*</span></label>
              <input type="text" name="price" value={form.price} onChange={handleChange} className={errors.price ? 'input-error' : ''} />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>
          </div>
          <div className="form-group">
            <label>{fieldIcons.contact} Contact<span className="required">*</span></label>
            <input type="text" name="contact" value={form.contact} onChange={handleChange} className={errors.contact ? 'input-error' : ''} />
            {errors.contact && <span className="error-text">{errors.contact}</span>}
          </div>
          <button type="submit" className="submit-btn">Create Announcement 🚀</button>
        </form>
      </div>
    </div>
  );
}

export default CreateAnnouncement; 