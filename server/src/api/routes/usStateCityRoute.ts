// Importing express package
import * as express from 'express';

// Router-level middleware works in the same way as application-level middleware, 
// except it is bound to an instance of express.Router().
const router = express.Router();

// Get Order Controller
import USStateCityController from '../controllers/usStateCityController'

// Creating object for OrdersController Class
const Controller = new USStateCityController()

// Getting trusted ticket from tableau server
router.get('/', Controller.get_state_cities)

export default router;