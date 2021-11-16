import { Request, Response } from 'express';
import { parse } from 'json2csv';
import * as AWS from 'aws-sdk';
import config from '../../config/config';

AWS.config.update({
    region: config.AWS_REGION,
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_KEY
});

export default class RecordController {
    // Adding Tabular Record
    public add_tabular_record = async (req: Request, res: Response) => {
        let bodyParams = req.body;
        let fields = [
            'gender',
            'age',
            'hypertension',
            'heart_disease',
            'even_married',
            'work_type',
            'Residence_type',
            'avg_glucose_level',
            'bmi',
            'smoking_status'
        ];
        let opts = { fields };

        var s3 = new AWS.S3();

        try {
            console.log(bodyParams);
            const csv = parse(bodyParams, opts);
            console.log(csv);
            var base64data = Buffer.from(csv, 'binary');

            var params = {
                Body: base64data,
                Bucket: 'caaas-tabular',
                Key: bodyParams.email + 'sample.csv',
            };
            s3.putObject(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    console.log(data);
                }
            });
        } catch (err) {
            res.status(500).json({
                message: err
            });
        }
    };
}
