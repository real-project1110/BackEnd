const multer = require('multer');
const path = require('path');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3-transform');
const dotenv = require('dotenv');
const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

dotenv.config();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      const ext =
        path.extname(file.originalname) === '.webp' ? '.webp' : '.webp';
      cb(
        null,
        `original/${
          Math.floor(Math.random() * 10000).toString() + Date.now()
        }${ext}`,
      );
    },
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});
module.exports = upload;
