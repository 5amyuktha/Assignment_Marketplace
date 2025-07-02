import React, { useState, useEffect } from 'react';
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

function BrowseTasks() {
  const [announcements, setAnnouncements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/announcements')
      .then(res => res.json())
      .then(data => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load announcements');
        setLoading(false);
      });
  }, []);

  const handleCardClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAnnouncement(null);
  };

  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="browse-tasks-root">
      <div className="container">
        <h2 className="browse-title">Browse Tasks</h2>
        <input
          className="browse-search"
          type="text"
          placeholder="Search by title or subject..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {loading ? (
          <div>Loading tasks...</div>
        ) : error ? (
          <div className="error-text">{error}</div>
        ) : (
          <div className="announcements-grid">
            {filteredAnnouncements.length === 0 && (
              <div className="no-tasks">No tasks found.</div>
            )}
            {filteredAnnouncements.map((announcement) => (
              <div
                className="announcement-card"
                key={announcement.id}
                onClick={() => handleCardClick(announcement)}
              >
                <div className="announcement-icon">{subjectIcons[announcement.subject] || '📄'}</div>
                <h4 className="announcement-title">{announcement.title}</h4>
                <p className="announcement-summary">{announcement.summary}</p>
                <div className="announcement-meta">
                  <div><span className="meta-label">Deadline:</span> {announcement.deadline}</div>
                  <div><span className="meta-label">Price:</span> {announcement.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default BrowseTasks; 