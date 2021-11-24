// Importing express package
import * as express from 'express';

import * as multer from 'multer'

import * as multerS3 from 'multer-s3-v3'

import * as AWS from 'aws-sdk';

import config from '../../config/config';

// Router-level middleware works in the same way as application-level middleware, 
// except it is bound to an instance of express.Router().
const router = express.Router();

// Get Order Controller
import RecordController from '../controllers/recordController'

// Creating object for OrdersController Class
const Controller = new RecordController()

AWS.config.update({
    region: config.AWS_REGION,
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_KEY
});

var s3 = new AWS.S3();

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.IMAGE_BUCKET,
        key: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});

// Getting trusted ticket from tableau server
router.post('/create/tabular/', Controller.add_tabular_record)

router.post('/create/image/', upload.single("file"), Controller.add_image_record)

export default router;