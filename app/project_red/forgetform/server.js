// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/persone', {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Updated Schema Definition
const peopleSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phone: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
});

const People = mongoose.model('peoples', peopleSchema);

// Route to add a new user
app.post('/api/users', async (req, res) => {
    try {
        const { email, phone } = req.body;

        const newUser = await People.create({
            email,
            phone
        });

        res.json({
            success: true,
            message: 'Code send successfully',
            user: {
                email: newUser.email,
                phone: newUser.phone
            }
        });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Route to retrieve user details
app.post('/api/users', async (req, res) => {
    try {
        const { method, identifier } = req.body;

        const query = {};
        query[method] = identifier;

        const user = await People.findOne(query);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `No account found with this ${method}`
            });
        }

        res.json({
            success: true,
            user: {
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
