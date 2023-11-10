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

  app.get('/api/cocktails', async (req, res) => {
    try {
      const result = await query('SELECT * FROM cocktails;');
      res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving cocktails', error);
      res.status(500).json({ error: 'Error retrieving cocktails' });
    }
  });


  app.get('/api/cocktails/:id', async (req, res) => {
    const { id } = req.params;
  
    const sql = 'SELECT * FROM cocktails WHERE id = $1;';
    
    try {
      const result = await query(sql, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Cocktail not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error retrieving cocktail', error);
      res.status(500).json({ error: 'Error retrieving cocktail' });
    }
  });


  app.patch('/api/cocktails/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, type, country_id } = req.body;
  
    const sql = `
      UPDATE cocktails 
      SET title = $1, description = $2, type = $3, country_id = $4 
      WHERE id = $5 
      RETURNING *;
    `;
  
    try {
      const result = await query(sql, [title, description, type, country_id, id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Cocktail not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating cocktail', error);
      res.status(500).json({ error: 'Error updating cocktail' });
    }
  });


  app.delete('/api/cocktails/:id', async (req, res) => {
    const { id } = req.params;
  
    const sql = 'DELETE FROM cocktails WHERE id = $1 RETURNING *;';
    
    try {
      const result = await query(sql, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Cocktail not found' });
      }
      res.json({ message: 'Cocktail deleted successfully', cocktail: result.rows[0] });
    } catch (error) {
      console.error('Error deleting cocktail', error);
      res.status(500).json({ error: 'Error deleting cocktail' });
    }
  });
  

  


app.post('api/registration', (req, res) => {
    res.json({ message: "Register a new user"})
})

app.post('api/login', (req, res) => {
    res.json({ message: "Login a user"})
})

app.listen(PORT, () => {
    console.log(`listening to PORT ${PORT}`)
})