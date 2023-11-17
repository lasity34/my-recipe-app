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

router.post('/with-ingredients', async (req, res) => {
  const { title, description, type, country_name, rating_average, image_url, ingredients } = req.body;

  try {
    // Get country ID
    const countryResult = await query('SELECT id FROM countries WHERE name = $1', [country_name]);
    if (countryResult.rows.length === 0) {
      return res.status(404).json({ error: 'Country not found' });
    }
    const country_id = countryResult.rows[0].id;

    // Insert the cocktail
    const cocktailSql = `
      INSERT INTO cocktails (title, description, type, country_id, rating_average, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const cocktailResult = await query(cocktailSql, [title, description, type, country_id, rating_average, image_url]);
    if (cocktailResult.rows.length === 0) {
      throw new Error('Failed to insert cocktail');
    }
    const cocktailId = cocktailResult.rows[0].id;

    // Insert ingredients
    for (const ingredient of ingredients) {
      const ingredientResult = await query('SELECT id FROM ingredients WHERE name = $1', [ingredient.name]);
      if (ingredientResult.rows.length === 0) {
        throw new Error(`Ingredient not found: ${ingredient.name}`);
      }
      const ingredientId = ingredientResult.rows[0].id;

      const cocktailIngredientsSql = `
        INSERT INTO cocktail_ingredients (cocktail_id, ingredient_id, quantity)
        VALUES ($1, $2, $3);
      `;
      await query(cocktailIngredientsSql, [cocktailId, ingredientId, ingredient.quantity]);
    }

    // Fetch the newly created cocktail
    const fetchCocktailSql = `
      SELECT c.id, c.title, c.description, c.type, co.name AS country_name, c.rating_average, c.image_url, 
             json_agg(json_build_object('name', i.name, 'quantity', ci.quantity)) as ingredients
      FROM cocktails c
      LEFT JOIN cocktail_ingredients ci ON c.id = ci.cocktail_id
      LEFT JOIN ingredients i ON ci.ingredient_id = i.id
      LEFT JOIN countries co ON c.country_id = co.id
      WHERE c.id = $1
      GROUP BY c.id, co.name;
    `;
    const newCocktail = await query(fetchCocktailSql, [cocktailId]);
    if (newCocktail.rows.length > 0) {
      res.status(201).json(newCocktail.rows[0]);
    } else {
      throw new Error('New cocktail details could not be fetched');
    }
  } catch (error) {
    res.status(500).json({ error: 'Error adding new cocktail', details: error.message });
  }
});






// GET a single cocktail by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sql = `
  SELECT 
  c.id, 
  c.title, 
  c.description, 
  c.type, 
  (SELECT co.name FROM countries co WHERE co.id = c.country_id) AS country_name, 
  c.rating_average, 
  c.image_url, 
  json_agg(json_build_object('name', i.name, 'quantity', ci.quantity)) as ingredients
FROM cocktails c
LEFT JOIN cocktail_ingredients ci ON c.id = ci.cocktail_id
LEFT JOIN ingredients i ON ci.ingredient_id = i.id
GROUP BY c.id, c.title, c.description, c.type, c.country_id, c.rating_average, c.image_url;
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

