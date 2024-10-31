import express from 'express'
import { sendFeedback, studentLogin } from '../controller/student.controller.js'
import protectedRoute from '../middleware.js/protectedRoute.js'

const router = express.Router()

router.post('/studentLogin', studentLogin )
router.post('/feedback', protectedRoute, sendFeedback )

export default router