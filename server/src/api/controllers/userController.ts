import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
import config from '../../config/config';

AWS.config.update({region: config.AWS_REGION, accessKeyId : config.AWS_ACCESS_KEY, secretAccessKey: config.AWS_SECRET_KEY})

let documentClient = new AWS.DynamoDB.DocumentClient();

export default class UserController {
    // Create user
    public create_user = async (req: Request, res: Response) => {
        let params = req.body

        let groupType = ''
        if (params.organisation == 'self'){
            groupType = 'self'
        }else {
            groupType = 'org'
        }

        try {
            // Create unique userid
            const userId = uuid();
            const groupId = uuid();
            const authId = uuid();

            let params1 = {
                TableName : 'user_data',
                Item: {
                   PK: `USR#${userId}`,
                   SK: `#METADATA#${userId}`,
                   firstName: params.firstName,
                   lastName: params.lastName,
                   dob: params.dob,
                   state: params.state,
                   city: params.city,
                   phoneNumber: params.phoneNumber,
                   gender: params.gender,
                   ethnicity: params.ethnicity
                }
              };

              let params2 = {
                TableName : 'user_data',
                Item: {
                   PK: `USR#${userId}`,
                   SK: `AUTH#${authId}`,
                   email: params.email,
                   password: params.password
                }
              };

              let params3 = {
                TableName : 'user_data',
                Item: {
                   PK: `USR#${userId}`,
                   SK: `GRP#${groupType}#${groupId}`,
                   name: params.organisation
                }
              };
            
              await documentClient.put(params1, function(err, data) {
                if (err) console.log(err);
              });  

              await documentClient.put(params2, function(err, data) {
                if (err) console.log(err);
              }); 

              await documentClient.put(params3, function(err, data) {
                if (err) console.log(err);
              }); 
        } catch (err) {
            res.status(500).json({
                message: err
            });
        }
    };
}