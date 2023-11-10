const router = express.Router();

// GET all cocktails


// GET a single cocktail by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query('SELECT * FROM cocktails WHERE id = $1;', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cocktail not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error retrieving cocktail', error);
    res.status(500).json({ error: 'Error retrieving cocktail' });
  }
});



