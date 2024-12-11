// Import required modules
const express = require('express');
const historyRoutes = require('./routes/history'); // Import history routes

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use routes
app.use('/history', historyRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
