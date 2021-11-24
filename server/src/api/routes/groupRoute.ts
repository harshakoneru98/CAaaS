// Importing express package
import * as express from 'express';

// Router-level middleware works in the same way as application-level middleware, 
// except it is bound to an instance of express.Router().
const router = express.Router();

// Get Order Controller
import GroupController from '../controllers/groupController'

// Creating object for OrdersController Class
const Controller = new GroupController()

// Getting trusted ticket from tableau server
router.get('/groupId/:email', Controller.get_groupId_by_email)

router.post('/data/', Controller.get_groupData_by_email)

export default router;