import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
import fetch from 'node-fetch';
import * as store from 'node-cache';
import config from '../../config/config';

AWS.config.update({
    region: config.AWS_REGION,
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_KEY
});

let documentClient = new AWS.DynamoDB.DocumentClient();

export default class UserController {
    // Create user
    public create_user = async (req: Request, res: Response) => {
        let params = req.body;
        let myCache = new store();

        let groupType = '';
        if (params.organisation == 'self') {
            groupType = 'self';
        } else {
            groupType = 'org';
        }

        try {
            await fetch('http://localhost:8080/api/user/userId/' + params.email)
                .then((res) => res.json())
                .then((data) => {
                    myCache.mset([
                        { key: 'userId', val: data.data, ttl: 10000 }
                    ]);
                });

            let userExistsId = myCache.mget(['userId']).userId;

            if (userExistsId != '') {
                await res.send({
                    status: 200,
                    data: 'Email already exists',
                    message: 'OK'
                });
            } else {
                // Create unique userid
                const userId = uuid();
                const groupId = uuid();

                let params1 = {
                    TableName: 'user_data',
                    Item: {
                        PK: `USR#${userId}`,
                        SK: `#METADATA#${userId}`,
                        firstName: params.firstName,
                        lastName: params.lastName,
                        dob: params.dob,
                        state: params.state,
                        city: params.city,
                        organisation: params.organisation || 'self',
                        phoneNumber: params.phoneNumber,
                        gender: params.gender,
                        ethnicty: params.ethnicty
                    }
                };

                let params2 = {
                    TableName: 'user_data',
                    Item: {
                        PK: `AUTH#${params.email}`,
                        SK: `#METADATA#${params.email}`,
                        password: params.password,
                        userId: userId,
                        organisationType: groupType
                    }
                };

                let params3 = {
                    TableName: 'user_data',
                    Item: {
                        PK: `USR#${userId}`,
                        SK: `GRP#${groupType}#${groupId}`,
                        name: params.organisation
                    }
                };

                await documentClient.put(params1, function (err, data) {
                    if (err) console.log(err);
                });

                await documentClient.put(params2, function (err, data) {
                    if (err) console.log(err);
                });

                await documentClient.put(params3, function (err, data) {
                    if (err) console.log(err);
                });

                await res.send({
                    status: 200,
                    data: 'Created User Successfully',
                    message: 'OK'
                });
            }
        } catch (err) {
            res.status(500).json({
                message: err
            });
        }
    };

    // Get userId by email
    public get_userId_by_email = async (req: Request, res: Response) => {
        let email = req.params.email;

        try {
            var params = {
                TableName: 'user_data',
                Key: {
                    PK: 'AUTH#' + email,
                    SK: '#METADATA#' + email
                }
            };

            var documentClient = new AWS.DynamoDB.DocumentClient();

            documentClient.get(params, function (err, data) {
                if (err) console.log(err);
                else {
                    let userId = '';
                    if (data.Item) {
                        userId = data.Item.userId;
                    }
                    res.send({
                        status: 200,
                        data: userId,
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

    // Get userId by email
    public get_userData_by_email = async (req: Request, res: Response) => {
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
                Key: {
                    PK: 'USR#' + userId,
                    SK: '#METADATA#' + userId
                }
            };

            var documentClient = new AWS.DynamoDB.DocumentClient();

            documentClient.get(params, function (err, data) {
                if (err) console.log(err);
                else {
                    let data_res = {
                        firstName: data.Item.firstName,
                        lastName: data.Item.lastName,
                        phoneNumber: data.Item.phoneNumber,
                        city: data.Item.city,
                        state: data.Item.state,
                        dob: data.Item.dob,
                        organisation: data.Item.organisation,
                        gender: data.Item.gender,
                        ethnicty: data.Item.ethnicty
                    }

                    res.send({
                        status: 200,
                        data: data_res,
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

    // public get_user_by_email = async (req: Request, res: Response) => {
    //     let email = req.params.email;

    //     try {
    //         var params = {
    //             TableName: 'user_data',
    //             IndexName: 'Filter-By-Email',
    //             KeyConditionExpression: '#PK = :PK',
    //             ExpressionAttributeNames: { '#PK': 'email' },
    //             ExpressionAttributeValues: {
    //                 ':PK': email
    //             }
    //         };

    //         var documentClient = new AWS.DynamoDB.DocumentClient();

    //         documentClient.query(params, function (err, data) {
    //             if (err) console.log(err);
    //             else {
    //                 let userId = ''
    //                 if(data['Count'] == 0){
    //                     userId = ''
    //                 }
    //                 else{
    //                     userId = data['Items'][0]['PK']
    //                 }
    //                 res.send({
    //                     status: 200,
    //                     data: userId,
    //                     message: 'OK'
    //                 });
    //             }
    //         });
    //     } catch (err) {
    //         res.status(500).json({
    //             message: err
    //         });
    //     }
    // };
}
