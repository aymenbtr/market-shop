import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const MONGODB_URI = 'mongodb://127.0.0.1:27017/user';
// Or if using MongoDB Atlas:
// const MONGODB_URI = 'mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/user';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Order Schema
const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: String,
    email: String,
    address: String,
    phone: String,
  },
  orderDetails: {
    items: [
      {
        productName: String,
        price: Number,
        id: Number,
      },
    ],
    totalAmount: Number,
  },
  orderDate: Date,
  status: String,
});

// Explicitly use 'client' as the collection name
const Order = mongoose.model('Order', orderSchema, 'client');

// POST endpoint for orders
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
