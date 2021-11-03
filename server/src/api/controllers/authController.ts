import { Request, Response } from 'express';
import * as AWS from 'aws-sdk';
import config from '../../config/config';

AWS.config.update({
    region: config.AWS_REGION,
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_KEY
});

let documentClient = new AWS.DynamoDB.DocumentClient();

export default class AuthController {
    // Create user
    public check_login = async (req: Request, res: Response) => {
        let bodyParams = req.body;
        try {
            var params = {
                TableName: 'user_data',
                Key: {
                    PK: 'AUTH#' + bodyParams.email,
                    SK: '#METADATA#' + bodyParams.email
                }
            };

            documentClient.get(params, function (err, data) {
                if (err) console.log(err);
                else {
                    if (data.Item && (data.Item.organisationType == bodyParams.organisationType) && (bodyParams.password == data.Item.password)) {
                        res.send({
                            status: 200,
                            data: 'Valid',
                            message: 'OK'
                        });
                    }else{
                        res.send({
                            status: 200,
                            data: 'Invalid',
                            message: 'OK'
                        });
                    }
                }
            });
        } catch (err) {
            res.status(500).json({
                message: err
            });
        }
    };
}
