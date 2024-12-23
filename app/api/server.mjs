import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with retry logic
const connectWithRetry = () => {
  mongoose.connect('mongodb://localhost:27017/user', {
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

// Order Schema
const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: String,
    email: String,
    address: String,
    phone: String
  },
  orderDetails: {
    items: [{
      productName: String,
      price: Number,
      id: Number
    }],
    totalAmount: Number
  },
  orderDate: Date,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Client', orderSchema);

// Routes
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ success: true, orderId: order._id });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle process termination gracefully
process.on('SIGTERM', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});
