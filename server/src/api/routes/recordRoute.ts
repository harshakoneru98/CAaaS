// Importing express package
import * as express from 'express';

// Router-level middleware works in the same way as application-level middleware, 
// except it is bound to an instance of express.Router().
const router = express.Router();

// Get Order Controller
import RecordController from '../controllers/recordController'

// Creating object for OrdersController Class
const Controller = new RecordController()

// Getting trusted ticket from tableau server
router.post('/create/tabular/', Controller.add_tabular_record)

export default router;