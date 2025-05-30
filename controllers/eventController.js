const Event = require('../models/Event');

const createEvent = async (req, res) => {
  try {
    const { user_id, event_type, payload } = req.body;

    // Validate basic fields
    if (!user_id || !event_type || !payload) {
      return res.status(400).json({ error: 'user_id, event_type and payload are required' });
    }

    if (!['view', 'click', 'location'].includes(event_type)) {
      return res.status(400).json({ error: 'Invalid event_type' });
    }

    // Validate payload based on event_type
    if (event_type === 'view' && !payload.url) {
      return res.status(400).json({ error: 'Payload must include url for view events' });
    }

    if (event_type === 'location') {
      const { latitude, longitude } = payload;
      if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
      }
    }

    const event = new Event({ user_id, event_type, payload });
    await event.save();

    return res.status(202).json({ message: 'Event accepted' });

  } catch (err) {
    console.error('Error in createEvent:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getEventCounts = async (req, res) => {
  try {
    const { event_type, start_date, end_date } = req.query;

    const query = {};

    if (event_type) {
      if (!['view', 'click', 'location'].includes(event_type)) {
        return res.status(400).json({ error: 'Invalid event_type' });
      }
      query.event_type = event_type;
    }

    if (start_date || end_date) {
      query.timestamp = {};
      if (start_date) query.timestamp.$gte = new Date(start_date);
      if (end_date) query.timestamp.$lte = new Date(end_date);
    }

    const count = await Event.countDocuments(query);

    res.status(200).json({ total_events: count });
  } catch (err) {
    console.error('Error in getEventCounts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getEventCountsByType = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const match = {};

    if (start_date || end_date) {
      match.timestamp = {};
      if (start_date) match.timestamp.$gte = new Date(start_date);
      if (end_date) match.timestamp.$lte = new Date(end_date);
    }

    const result = await Event.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$event_type",
          count: { $sum: 1 }
        }
      }
    ]);

    const formatted = {};
    result.forEach(item => {
      formatted[item._id] = item.count;
    });

    res.status(200).json(formatted);
  } catch (err) {
    console.error('Error in getEventCountsByType:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Add these to your exports
module.exports = {
  createEvent,
  getEventCounts,
  getEventCountsByType
};



// module.exports = { createEvent };
