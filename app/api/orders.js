import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/user';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

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

const Order = mongoose.model('Order', orderSchema, 'client');

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const order = new Order(req.body);
      await order.save();
      res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
      console.error('Error saving order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
