import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const s3 = new aws.S3({
  region: 'ap-northeast-2',
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const multerUploader = multerS3({
  s3,
  bucket: 'mintubee',
  acl: 'public-read',
});

const uploadFiles = multer({
  dest: 'uploads/videos/',
  limits: {
    fileSize: 10000000,
  },
  storage: multerUploader,
});

export {uploadFiles};
