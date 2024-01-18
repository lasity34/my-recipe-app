import express from 'express';
import bcrypt from 'bcrypt';
import { query } from '../db.mjs';

const router = express.Router();

// Middleware for authentication (simplified example)
const authenticateUser = async (req, res, next) => {
  const { username, password } = req.body;
  // Retrieve user from database
  const user = await query('SELECT * FROM users WHERE username = $1', [username]);
  if (user && bcrypt.compareSync(password, user.password)) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Middleware for checking if the user is an admin
const checkAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
};


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await query('SELECT * FROM users WHERE username = $1', [username]);
    
    const user = result.rows[0]; // Assuming the query returns an array of rows
    console.log(user)
    if (user && bcrypt.compareSync(password, user.password)) {
      // User is authenticated, return user data including their role
      res.json({ username: user.username, role: user.role });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for users
router.get('/users', authenticateUser, async (req, res) => {
  try {
    const result = await query('SELECT * FROM users;');
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving users', error);
    res.status(500).json({ error: 'Error retrieving users' });
  }
});

// Route for admins
router.get('/admins', authenticateUser, checkAdmin, async (req, res) => {
  try {
    const result = await query('SELECT * FROM users WHERE role = \'admin\';');
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving admins', error);
    res.status(500).json({ error: 'Error retrieving admins' });
  }
});



router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
