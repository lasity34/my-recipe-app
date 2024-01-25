import express from 'express';
import multer from 'multer';
import { query } from '../db.mjs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // This saves files to a local 'uploads' folder

// POST route for uploading an image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file; // The uploaded file information
    // You would typically upload the file to your cloud storage here
    // and get a URL for the uploaded file
    const imageUrl = 'URL_FROM_CLOUD_STORAGE';

    // Assuming you have the user_id somehow (e.g., from a session or token)
    const userId = req.session.userId;

    // Save the image information in your database
    const result = await query('INSERT INTO user_images (user_id, image_url, image_type) VALUES ($1, $2, $3) RETURNING *;', [userId, imageUrl, 'profile']); // Adjust 'profile' as needed

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error uploading image', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});
