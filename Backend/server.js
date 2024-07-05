const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL)
.then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('MongoDB connection error:', error);
});

// Routes
const imageRoutes = require('./routes/images');
app.use( imageRoutes); // Make sure to mount the routes correctly

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
