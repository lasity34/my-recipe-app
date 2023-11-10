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

  app.post("/api/cocktails", async (req, res) => {
      
    const {title, description, type, country_id} = req.body;

    const sql = `
        INSERT INTO cocktails (title, description, type, country_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    try {
        const result = await query(sql, [title, description, type, country_id]);
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error('Error adding new cocktail', error);
        res.status(500).json({ error: 'Error adding new cocktail' });
      }


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