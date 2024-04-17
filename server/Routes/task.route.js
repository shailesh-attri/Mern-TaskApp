import express from 'express';
import { taskController } from '../Controllers/taskController.js';
import verifyToken from '../middleware/verifyJwtToken.js';
const router = express.Router();

router.post('/createTask',verifyToken,taskController.createTask)
router.put('/updateTask/:id', taskController.updateTask)
router.delete('/deleteTask/:id', taskController.deleteTask)
router.patch('/markImportant/:id', taskController.markImportant)
router.patch('/markCompleted/:id', taskController.markCompleted)

export default router