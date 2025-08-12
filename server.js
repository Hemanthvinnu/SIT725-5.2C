const express = require("express");
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 3004;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/myprojectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB');
});

// Routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/api', projectRoutes);

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
