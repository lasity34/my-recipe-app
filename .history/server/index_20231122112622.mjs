import express from "express"
import { query } from "./db.mjs";
import cors from 'cors';
import cocktailsRouter from './routes/cocktails.js'; 
import countriesRouter from './routes/countries.js';
import authRouter from './routes/authRoutes.js';
const app = express();
const PORT = 3001;

const corsOptions = {
  origin: (origin, callback) => {
    // List of allowed origins (both local and production)
    const allowedOrigins = ['http://localhost:5173', 'https://boozy-benders-frontend.onrender.com'];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

app.use(cors(corsOptions));
app.use(express.json());




app.use('/api/cocktails', cocktailsRouter);
app.use('/api/countries', countriesRouter); 

  app.get('/api/countries', async (req, res) => {
    try {
      const result = await query('SELECT * FROM countries;');
      res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving countries', error);
      res.status(500).json({ error: 'Error retrieving countries' });
    }
  });
  
  app.use('/api/auth', authRouter);





app.listen(PORT, () => {
    console.log(`listening to PORT ${PORT}`)
})