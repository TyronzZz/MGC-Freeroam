const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// In-memory storage (replace with a real database like MySQL, MongoDB, etc.)
const users = [];

// Register route
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const userExists = users.find(user => user.username === username || user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'Username or email already exists.' });
    }

    // Add new user (in production, hash passwords)
    users.push({ username, email, password });
    res.status(201).json({ message: 'Registration successful.' });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find the user
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.status(200).json({ message: 'Login successful.' });
    } else {
        res.status(400).json({ message: 'Invalid credentials.' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
