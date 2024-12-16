const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user') // Connect to the `user` database
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define the Mongoose schema and model for the `user` collection
const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  product: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema, 'user'); // Explicitly map to the 'user' collection

// API endpoint for handling orders
app.post('/api/orders', async (req, res) => {
  try {
    console.log('Incoming Request Body:', req.body);

    const { name, email, address, phone, product } = req.body;

    // Validation
    if (!name || !email || !address || !phone || !product) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create and save the order to MongoDB
    const newOrder = new Order({ name, email, address, phone, product });
    const savedOrder = await newOrder.save();

    console.log('Order saved to MongoDB:', savedOrder);

    // Send success response
    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
