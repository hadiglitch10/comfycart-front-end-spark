const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON request body

// Routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
// Test route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Set up server to listen on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
