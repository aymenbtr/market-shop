const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection with updated options
mongoose.connect('mongodb://localhost:27017/persone')
.then(() => console.log('Successfully connected to MongoDB.'))
.catch(err => console.error('Connection error:', err));

// Define Person Schema
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String
}, { collection: 'people' });

const Person = mongoose.model('Person', personSchema);

// Routes

// Get all people
app.get('/api/people', async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one person by ID
app.get('/api/people/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (person) {
            res.json(person);
        } else {
            res.status(404).json({ message: 'Person not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new person
app.post('/api/people', async (req, res) => {
    const person = new Person({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const newPerson = await person.save();
        res.status(201).json(newPerson);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update person
app.put('/api/people/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(person);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete person
app.delete('/api/people/:id', async (req, res) => {
    try {
        await Person.findByIdAndDelete(req.params.id);
        res.json({ message: 'Person deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});