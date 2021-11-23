import { Request, Response } from 'express';
import { parse } from 'json2csv';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import config from '../../config/config';
import * as store from 'node-cache';
import fetch from 'node-fetch';
import { PythonShell } from 'python-shell';

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
        let myCache = new store();
        let req_params = req.body;
        var s3 = new AWS.S3();
        const recordId = uuid();
        let groupType;

        if (req_params.level == 'personal') {
            groupType = 'self';
        } else {
            groupType = 'org';
        }

        try {
            await fetch(
                'http://localhost:8080/api/group/groupId/' + req_params.email
            )
                .then((res) => res.json())
                .then((data) => {
                    myCache.mset([
                        { key: 'groupId', val: data.data, ttl: 10000 }
                    ]);
                });

            let groupId = myCache.mget(['groupId']).groupId;

            var params = {
                Bucket: 'caaas-image',
                Key: req_params.fileName
            };

            await s3.waitFor(
                'objectExists',
                params,
                async function (err, data) {
                    if (err) {
                        console.log(err, err.stack); // an error occurred
                    } else {
                        let url = s3.getSignedUrl('getObject', params);

                        let options = {
                            pythonPath: config.Python_Path,
                            scriptPath: 'src/api/controllers',
                            args: [url, req_params.fileName]
                        };

                        await PythonShell.run(
                            'deploy.py',
                            options,
                            async function (err, results) {
                                if (err) {
                                    throw err;
                                }

                                let params1 = {
                                    TableName: 'user_data',
                                    Item: {
                                        PK: `GRP#${groupId}`,
                                        SK: `REC#image#${recordId}`,
                                        name: req_params.fileName,
                                        size:
                                            Math.round(
                                                (req_params.size * 10) / 1024
                                            ) / 10,
                                        lastModified: req_params.lastModified,
                                        url: url,
                                        score: Math.floor(results[0] * 100)
                                    }
                                };

                                var documentClient =
                                    new AWS.DynamoDB.DocumentClient();

                                await documentClient.put(
                                    params1,
                                    function (err, data) {
                                        if (err) console.log(err);
                                        else{
                                            res.send({
                                                status: 200,
                                                data: 'Created Record Successfully. Please find your risk score in Check Scores section',
                                                message: 'OK'
                                            });
                                        }
                                    }
                                );
                            }
                        );
                    }
                }
            );
        } catch (err) {
            res.status(500).json({
                message: err
            });
        }
    };
}
