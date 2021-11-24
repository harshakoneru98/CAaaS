import * as dotenv from 'dotenv'
dotenv.config()

export default {
    PORT: process.env.PORT || '8080',
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_REGION: process.env.AWS_REGION,
    Python_Path: process.env.Python_Path,
    TABLE_BUCKET: process.env.TABLE_BUCKET,
    IMAGE_BUCKET: process.env.IMAGE_BUCKET,
    DATABASE_NAME: process.env.DATABASE_NAME,
  };
