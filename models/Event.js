const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const eventSchema = new mongoose.Schema({
  event_id: {
    type: String,
    default: uuidv4, // auto-generate UUID
    unique: true
  },
  user_id: {
    type: String,
    required: true,
    index: true
  },
  event_type: {
    type: String,
    enum: ['view', 'click', 'location'],
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  payload: {
    type: mongoose.Schema.Types.Mixed, // flexible structure
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);
