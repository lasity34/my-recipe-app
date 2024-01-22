import express from 'express';
import bcrypt from 'bcrypt';
import { query } from '../db.mjs';

const router = express.Router();

// Middleware for checking if the user is an admin

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);

    // Retrieve new user information for session
    const result = await query('SELECT * FROM users WHERE username = $1', [username]);
    const newUser = result.rows[0];

    // Set session information
    if (newUser) {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
    }

    res.status(201).json({ message: 'User successfully registered', username: username });
  } catch (error) {
    console.error('Signup error', error.message, error.stack);

    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0]; // Assuming the query returns an array of rows

    if (user && bcrypt.compareSync(password, user.password)) {
      // User is authenticated, store user data in the session
      req.session.userId = user.id; // Store user ID in session
      req.session.username = user.username; // Store username in session
      req.session.role = user.role; // Store user role in session

      // Return user data including their role
      res.json({ message: 'Logged in successfully', username: user.username, role: user.role });
    } else {
      // Invalid credentials, send an error response
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    // Log and send an error response
    console.error('Login error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Assuming you're using express-session or a similar package for session handling
router.get('/check-auth', (req, res) => {
  if (req.session && req.session.userId) {
    res.json({
      isLoggedIn: true,
      username: req.session.username,
      role: req.session.role,
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});

export const logoutUser = async () => {
  return axios.post(`${BASE_URL}/auth/logout`)
      .then(response => response.data)
      .catch(error => {
          console.log("Error during logout:", error);
          throw error;
      });
};



export default router;
