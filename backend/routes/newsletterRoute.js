import express from 'express';
import { subscribe, listSubscribers } from '../controllers/newsletterController.js';
import adminAuth from '../middleware/adminAuth.js';

const newsletterRouter = express.Router();

newsletterRouter.post('/subscribe', subscribe);
newsletterRouter.get('/list', adminAuth, listSubscribers);

export default newsletterRouter;
