// Express application which will make handling requests

// For more reference on express middleware refer
// https://expressjs.com/en/guide/using-middleware.html

// Importing express package
import * as express from 'express';

// Executing the function stored in express variable
// And storing the result into app variable 
export const app = express();

// HTTP request logger middleware for node.js
import * as morgan from 'morgan'

// BodyParser - Node.js body parsing middleware.
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
import * as bodyParser from 'body-parser'

import userRoutes from './api/routes/userRoute'
import authRoutes from './api/routes/authRoute'
import groupRoutes from './api/routes/groupRoute'
import recordRoutes from './api/routes/recordRoute'

app.use(morgan('dev'))

// Making Uploads folder static - Publically available
app.use('/uploads', express.static('uploads'))

// BodyParsing URLEncoded and JSON Formats
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handling CORS Errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
})

// Routes which should handle requests
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/record', recordRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found')
    // res.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status = error.status || 500
    res.json({
        error: {
            message: error.message
        }
    })
})

