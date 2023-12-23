// src/index.ts
import bodyParser = require('body-parser');
import express = require('express');
import bcrypt from 'bcrypt';
import { Db, MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const port = 3000;

// Apply body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Apply cors middleware
app.use(cors());
const secretKey = 'secret_key'; // Secret key for JWT
const mongoUrl = 'mongodb://0.0.0.0:9000/LioriCA'; // MongoDB connection string with the database name

let db: Db;
const client = new MongoClient(mongoUrl, { useUnifiedTopology: true } as any); // Create a connection pool

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db();
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectToDatabase(); // Call this function to connect to the database

app.post('/register', async (req, res) => {
    const { id, name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Save the user to the database with hashed password
    const newUser = { name, email, password: hashedPassword, id };
    await db.collection('users').insertOne(newUser);

    const token = jwt.sign({ user: newUser }, secretKey, { expiresIn: '1h' }); // Create a JWT token

    res.json(token);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await db.collection('users').findOne({ email }); // Search for the user in the database

    // Verify the password using bcrypt
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' }); // Create a JWT token
        res.json(token);
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Close the connection when your application is shutting down
async function closeConnection() {
    try {
        await client.close();
        console.log('Connection to MongoDB closed');
    } catch (err) {
        console.error('Error closing connection to MongoDB:', err);
    }
}

// Call this function when your application is shutting down
process.on('SIGINT', async () => {
    await closeConnection();
    process.exit();
});
