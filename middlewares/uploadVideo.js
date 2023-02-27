import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const uploadFiles = multer({
  dest: 'uploads/videos',
  limits: {
    fileSize: 10000000,
  },
});

export {uploadFiles};
