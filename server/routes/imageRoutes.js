import express from 'express';
import multer from 'multer';
import { query } from '../db.mjs';
import AWS from 'aws-sdk';
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Instantiate an S3 client
const s3 = new AWS.S3();

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file; // The file is now stored in memory
    const userId = req.session.userId; // Ensure this is correctly retrieved

    // Set up S3 upload parameters
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME, // Your S3 Bucket name
      Key: `${userId}/${Date.now()}_${file.originalname}`, // File name to use in S3
      Body: file.buffer, // File buffer
      ContentType: file.mimetype, // File MIME type
    };

    // Upload the file to S3
    const s3UploadResult = await s3.upload(uploadParams).promise();

    // Use the S3 URL of the uploaded file
    const imageUrl = s3UploadResult.Location;

    // Save the image URL in your database
    const result = await query('INSERT INTO user_images (user_id, image_url, image_type) VALUES ($1, $2, $3) RETURNING *;', [userId, imageUrl, 'profile']);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error uploading image to S3', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});

export default router