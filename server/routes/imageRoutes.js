import express from 'express';
import multer from 'multer';;
import AWS from 'aws-sdk';
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Instantiate an S3 client
const s3 = new AWS.S3();

router.post('/upload', upload.any, async (req, res) => {
  try {
    const file = req.file; // The file is now stored in memory
    const userId = req.session.userId;
  
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Set up S3 upload parameters
    const imageType = req.body.imageType; // You would pass 'profile' or 'background' as imageType
    console.log(imageType)
    const key = `${userId}/${imageType}-image.${file.originalname.split('.').pop()}`;

    
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // Upload the file to S3
    await s3.upload(uploadParams).promise();

    res.json({ message: 'Upload successful' });
  } catch (error) {
    console.error('Error uploading image to S3', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});


// Endpoint to generate a pre-signed GET URL for an image
router.get('/:userId/:imageName', async (req, res) => {
  const userId = req.session.userId;
  const { imageName } = req.params;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const getObjectParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${userId}/${imageName}`,
      Expires: 60 * 5, // URL expires in 5 minutes
    };


    const presignedGetUrl = await s3.getSignedUrlPromise('getObject', getObjectParams);

    res.json({ url: presignedGetUrl });
  } catch (error) {
    console.error('Error generating pre-signed URL', error);
    res.status(500).json({ error: 'Error generating pre-signed URL' });
  }
});





export default router