import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const port = 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' })); // Increased limit for image uploads

const mongoUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'user';
let db;

async function connectDB() {
  try {
    const client = await MongoClient.connect(mongoUrl);
    db = client.db(dbName);
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

// Products endpoints
app.get('/api/products', async (req, res) => {
  try {
    const collection = db.collection('clients');
    const products = await collection.find({ type: 'product' }).toArray();
    
    // Transform _id to id for frontend compatibility
    const transformedProducts = products.map(product => ({
      ...product,
      id: product._id.toString()
    }));
    
    res.json({ products: transformedProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const collection = db.collection('clients');
    const { name, price, description, images } = req.body;
    
    // Validate required fields
    if (!name || !price || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProduct = {
      type: 'product',
      name,
      price: Number(price),
      description,
      images: images || [],
      createdAt: new Date()
    };

    const result = await collection.insertOne(newProduct);
    res.status(201).json({
      ...newProduct,
      id: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Orders endpoints
app.post('/api/orders', async (req, res) => {
  try {
    const collection = db.collection('orders');
    const { customerInfo, orderDetails } = req.body;
    
    // Validate required fields
    if (!customerInfo || !orderDetails) {
      return res.status(400).json({ error: 'Missing required order information' });
    }

    const newOrder = {
      customerInfo,
      orderDetails,
      status: 'pending',
      createdAt: new Date()
    };

    const result = await collection.insertOne(newOrder);
    res.status(201).json({
      ...newOrder,
      id: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const collection = db.collection('clients');
    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Start server
async function startServer() {
  await connectDB();
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer().catch(console.error);

// Handle shutdown
process.on('SIGINT', async () => {
  try {
    if (db) {
      await db.client.close();
      console.log('MongoDB connection closed');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});