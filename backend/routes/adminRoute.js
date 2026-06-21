import express from 'express'
import { getAnalytics } from '../controllers/adminController.js'
import adminAuth from '../middleware/adminAuth.js'

const adminRouter = express.Router()

adminRouter.get('/analytics', adminAuth, getAnalytics)

export default adminRouter
