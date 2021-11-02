// Importing express package
import * as express from 'express';

// Router-level middleware works in the same way as application-level middleware, 
// except it is bound to an instance of express.Router().
const router = express.Router();

// Get Order Controller
import UserController from '../controllers/userController'

// Creating object for OrdersController Class
const Controller = new UserController()

// Getting trusted ticket from tableau server
router.post('/create/', Controller.create_user)

export default router;