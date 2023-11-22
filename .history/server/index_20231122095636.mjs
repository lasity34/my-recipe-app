import express from "express"
import { query } from "./db.mjs";
import cors from 'cors';
import cocktailsRouter from './routes/cocktails.js'; 
import countriesRouter from './routes/countries.js';
const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'ttps://boozy-benders-frontend.onrender.com'
}));

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
  


app.post('/api/registration', (req, res) => {
    res.json({ message: "Register a new user"})
})

app.post('/api/login', (req, res) => {
    res.json({ message: "Login a user"})
})

app.listen(PORT, () => {
    console.log(`listening to PORT ${PORT}`)
})