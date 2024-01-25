import AWS from 'aws-sdk';
import 'dotenv/config';
// Configure AWS with your access key and secret key
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Use environment variables
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'YOUR_S3_BUCKET_REGION' // e.g., us-east-1
});
