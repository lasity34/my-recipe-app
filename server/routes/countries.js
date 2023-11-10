import express from 'express';
import { query } from '../db.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM countries ORDER BY name;');
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving countries', error);
    res.status(500).json({ error: 'Error retrieving countries' });
  }
});

export default router;
