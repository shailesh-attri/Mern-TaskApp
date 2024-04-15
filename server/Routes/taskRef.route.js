import express from 'express';
import { taskRefController } from '../Controllers/taskRefController.js';
import verifyToken from '../middleware/verifyJwtToken.js';
const router = express.Router();

router.get('/getTask',verifyToken, taskRefController.getTask)


export default router