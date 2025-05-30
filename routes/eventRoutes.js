const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEventCounts,
  getEventCountsByType
} = require('../controllers/eventController');

// POST /events
router.post('/', createEvent);

// GET /analytics/event-counts
router.get('/event-counts', getEventCounts);

// GET /analytics/event-counts-by-type
router.get('/event-counts-by-type', getEventCountsByType);

module.exports = router;
