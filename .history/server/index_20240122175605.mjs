import express from "express"
import cors from 'cors';
import session from 'express-session';
import 'dotenv/config';

import cocktailsRouter from './routes/cocktails.js'; 
import authRouter from './routes/authRoutes.js';

const app = express();
const PORT = 3001;

const sessionConfig = {
  secret: process.env.SESSION_SECRET_KEY, // Use a strong secret key
  resave: false,
  saveUninitialized: false, // Change to false to avoid setting up session on unauthenticated requests
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day (in milliseconds)
    secure: process.env.NODE_ENV === "production", // Use environment variable to set this based on development or production
    httpOnly: true, // Mitigates XSS attacks by not allowing JS to access the cookie
    sameSite: 'Lax' // Can be 'Strict' or 'Lax', adds CSRF protection
  }
};

app.use(session(sessionConfig));

const corsOptions = {
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000', // Frontend running on port 3000
    'https://boozy-benders-frontend.onrender.com'
  ],
  credentials: true, // Enable credentials to allow sending cookies with CORS requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
};

app.use(cors(corsOptions));
app.use(express.static('build'));
app.use(express.json());

app.use('/api/cocktails', cocktailsRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
});
