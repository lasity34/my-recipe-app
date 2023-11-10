import express from "express"
import { query } from "./db.mjs";

const app = express();
const PORT = 3001;

app.use(express.json());



app.get('/api', async (req, res) => {
    try {
      const result = await query('SELECT NOW()'); 
      res.json({ currentTime: result.rows[0].now });
    } catch (error) {
      console.error('Database connection error', error);
      res.status(500).json({ error: 'Database connection error' });
    }
  });

  app.post("/api/cocktails", (req, res) => {
      res.json({ message: "Create new recipe"})
  })
  
app.get("/api/cocktails", (req, res) => {
    res.json({ message: "List of recipes"})
})


app.post('api/registration', (req, res) => {
    res.json({ message: "Register a new user"})
})

app.post('api/login', (req, res) => {
    res.json({ message: "Login a user"})
})

app.listen(PORT, () => {
    console.log(`listening to PORT ${PORT}`)
})