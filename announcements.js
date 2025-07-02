const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM announcements ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single announcement with its bids
router.get('/:id', async (req, res) => {
  try {
    const annResult = await pool.query('SELECT * FROM announcements WHERE id = $1', [req.params.id]);
    if (annResult.rows.length === 0) return res.status(404).json({ error: 'Announcement not found' });
    const bidsResult = await pool.query('SELECT * FROM bids WHERE announcement_id = $1 ORDER BY created_at DESC', [req.params.id]);
    res.json({ ...annResult.rows[0], bids: bidsResult.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new announcement
router.post('/', async (req, res) => {
  const { title, subject, summary, details, deadline, price, contact } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO announcements (title, subject, summary, details, deadline, price, contact) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [title, subject, summary, details, deadline, price, contact]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new bid for an announcement
router.post('/:id/bids', async (req, res) => {
  const { bidder_name, bid_amount, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO bids (announcement_id, bidder_name, bid_amount, message) VALUES ($1,$2,$3,$4) RETURNING *',
      [req.params.id, bidder_name, bid_amount, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept a bid
router.patch('/bids/:bidId/accept', async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE bids SET is_accepted = TRUE WHERE id = $1 RETURNING *',
      [req.params.bidId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Bid not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 