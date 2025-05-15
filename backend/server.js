const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ibnss123:MhECGPHHIYavrUJl@cluster0.4sdmqsq.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

// Connect to DB
connectDB();

// Routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', userRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Set up server to listen on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
