import express from 'express';
import { query } from '../db.mjs';

const router = express.Router();

// GET all cocktails
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM cocktails;');
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


// POST a new cocktail
router.post('/', async (req, res) => {
  const { title, description, type, country_name, rating_average, image_url, ingredients } = req.body;

  const cocktailSql = `
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
    const cocktailResult = await query(cocktailSql, [title, description, type, country_name, rating_average, image_url]);

    if (cocktailResult.rows.length === 0) {
      throw new Error('Unable to create cocktail');
    }

    const cocktailId = cocktailResult.rows[0].id;

    // Insert each ingredient
    for (let ingredient of ingredients) {
      const ingredientSql = `
        INSERT INTO cocktail_ingredients (cocktail_id, ingredient_id, quantity)
        VALUES ($1, (SELECT id FROM ingredients WHERE name = $2), $3);
      `;
      await query(ingredientSql, [cocktailId, ingredient.name, ingredient.quantity]);
    }

    res.status(201).json(cocktailResult.rows[0]);
  } catch (error) {
    console.error('Error adding new cocktail', error);
    res.status(500).json({ error: 'Error adding new cocktail' });
  }
});


// GET a single cocktail by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT c.id, c.title, c.description, c.type, c.country_id, c.rating_average, c.image_url, 
           json_agg(json_build_object('name', i.name, 'quantity', ci.quantity)) as ingredients
    FROM cocktails c
    LEFT JOIN cocktail_ingredients ci ON c.id = ci.cocktail_id
    LEFT JOIN ingredients i ON ci.ingredient_id = i.id
    WHERE c.id = $1
    GROUP BY c.id;
  `;

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
  const { title, description, type, country_id, ingredients } = req.body;

  const updateCocktailSql = `
    UPDATE cocktails 
    SET title = $1, description = $2, type = $3, country_id = $4 
    WHERE id = $5 
    RETURNING *;
  `;

  try {
    const cocktailResult = await query(updateCocktailSql, [title, description, type, country_id, id]);
    if (cocktailResult.rows.length === 0) {
      return res.status(404).json({ error: 'Cocktail not found' });
    }

    // Update ingredients (add your logic here to handle ingredient updates)

    res.json(cocktailResult.rows[0]);
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

