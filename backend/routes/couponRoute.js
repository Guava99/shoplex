import express from 'express';
import { validateCoupon, createCoupon, listCoupons, deleteCoupon } from '../controllers/couponController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const couponRouter = express.Router();

couponRouter.post('/validate', authUser, validateCoupon);
couponRouter.post('/create', adminAuth, createCoupon);
couponRouter.get('/list', adminAuth, listCoupons);
couponRouter.post('/delete', adminAuth, deleteCoupon);

export default couponRouter;
