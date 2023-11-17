import express from 'express';
import { query } from '../db.mjs';

const router = express.Router();

// GET all cocktails
router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT c.id, c.title, c.description, c.type, c.country_id, c.rating_average, c.image_url, 
             json_agg(json_build_object('name', i.name, 'quantity', ci.quantity)) as ingredients
      FROM cocktails c
      LEFT JOIN cocktail_ingredients ci ON c.id = ci.cocktail_id
      LEFT JOIN ingredients i ON ci.ingredient_id = i.id
      GROUP BY c.id;
    `;

    const result = await query(sql);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving cocktails', error);
    res.status(500).json({ error: 'Error retrieving cocktails' });
  }
});

// POST a new cocktail
router.post('/', async (req, res) => {
  const { title, description, type, country_name, rating_average, image_url } = req.body;

  const sql = `
    INSERT INTO cocktails (title, description, type, country_id, rating_average, image_url)
    VALUES (
      $1, 
      $2, 
      $3, 
      (SELECT id FROM countries WHERE name = $4), 
      $5, 
      $6
    )
    RETURNING *;
  `;

  try {
    const result = await query(sql, [title, description, type, country_name, rating_average, image_url]);
    if (result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    console.error('Error adding new cocktail', error);
    res.status(500).json({ error: 'Error adding new cocktail' });
  }
});

// GET a single cocktail by ID
router.get('/:id', async (req, res) => {
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

// PATCH (update) a cocktail
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, type, country_id, rating_average, image_url } = req.body;

  const sql = `
    UPDATE cocktails 
    SET title = $1, 
        description = $2, 
        type = $3, 
        country_id = $4,
        rating_average = $5,
        image_url = $6
    WHERE id = $7 
    RETURNING *;
  `;

  try {
    const result = await query(sql, [title, description, type, country_id, rating_average, image_url, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cocktail not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating cocktail', error);
    res.status(500).json({ error: 'Error updating cocktail' });
  }
});

// DELETE a cocktail
router.delete('/:id', async (req, res) => {
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

export default router;

