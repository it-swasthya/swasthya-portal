import express from 'express';
import { registerUser, loginUser, logoutUser,checkMeLoggedin,refreshTokenHandler } from '../controllers/auth.controller.js';
import {authenticate} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me',authenticate,checkMeLoggedin)
router.get('/refresh', refreshTokenHandler);


export default router;
