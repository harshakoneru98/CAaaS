import { Request, Response } from 'express';
import * as AWS from 'aws-sdk';
import fetch from 'node-fetch';
import * as store from 'node-cache';
import config from '../../config/config';

AWS.config.update({
    region: config.AWS_REGION,
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_KEY
});

export default class GroupController {
    // Get userId by email
    public get_groupId_by_email = async (req: Request, res: Response) => {
        let email = req.params.email;

        let myCache = new store();

        try {

            await fetch('http://localhost:8080/api/user/userId/' + email)
                .then((res) => res.json())
                .then((data) => {
                    myCache.mset([
                        { key: 'userId', val: data.data, ttl: 10000 }
                    ]);
                });

            let userId = myCache.mget(['userId']).userId;

            var params = {
                TableName: 'user_data',
                KeyConditionExpression: "#PK = :PK and begins_with(#SK, :SK)",
                ExpressionAttributeNames: {"#PK": "PK", "#SK": "SK"},
                ExpressionAttributeValues: {
                    ":PK": "USR#" + userId,
                    ":SK": "GRP#"
                }
            };

            var documentClient = new AWS.DynamoDB.DocumentClient();

            documentClient.query(params, function (err, data) {
                if (err) console.log(err);
                else {
                    res.send({
                        status: 200,
                        data: data?.Items[0]?.SK.split('#')[2],
                        message: 'OK'
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
