const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/events', eventRoutes);
app.use('/analytics', eventRoutes); // same route file handles both

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
