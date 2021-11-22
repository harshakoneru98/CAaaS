import { Request, Response } from 'express';
import { parse } from 'json2csv';
import * as AWS from 'aws-sdk';
import config from '../../config/config';
import {PythonShell} from 'python-shell';

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
                Key: bodyParams.email + '$sample.csv'
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

    // Adding Image Record
    public add_image_record = async (req: Request, res: Response) => {
        let fileName = req.body.fileName;
        let size = req.body.size;
        let lastModified = req.body.lastModified

        var s3 = new AWS.S3();

        try {

            var params = {
                Bucket: 'caaas-tabular',
                Key: fileName
            };

            s3.waitFor('objectExists', params, async function (err, data) {
                if (err) {
                    console.log(err, err.stack); // an error occurred
                } else {
                    let url = s3.getSignedUrl('getObject', params);

                    let options = {
                        pythonPath: config.Python_Path,
                        scriptPath: 'src/api/controllers',
                        args: [url, fileName]
                      };

                      PythonShell.run('deploy.py', options, function (err, results) {
                        if (err) {
                            throw err;
                        }
                        console.log('Results : ', Math.floor(results[0]*100))

                        let dataOutput = {
                            name: fileName,
                            size: Math.round(size * 10 / 1024) / 10,
                            lastModified: lastModified,
                            url: url,
                            score: Math.floor(results[0]*100)
                        }

                        console.log(dataOutput)

                        res.send({
                            status: 200,
                            data: results,
                            message: 'OK'
                        });
                      });

                    
                }
            });
        } catch (err) {
            res.status(500).json({
                message: err
            });
        }
    };
}
