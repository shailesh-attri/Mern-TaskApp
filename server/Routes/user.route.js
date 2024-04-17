import express from 'express';
import { userController } from '../Controllers/userController.js';
import verifyToken from '../middleware/verifyJwtToken.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/register', userController.register)
router.post('/login', userController.login)
router.patch('/changeAvatar',verifyToken,upload.single('dpImage'), userController.changeAvatar)
router.get('/getUser',verifyToken, userController.getUser)


export default router