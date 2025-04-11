import express from 'express';  
import { sendEmailToUser } from '../controllers/send_email.controller.js'; 



const router = express.Router();    



router.post('/send-email', sendEmailToUser);


export default router;