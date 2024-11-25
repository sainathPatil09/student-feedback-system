import express from 'express'
import { fetchFaculty, loginStudent, registerStudent, sendFeedback, studentLogin, verifyOtp } from '../controller/student.controller.js'
import {protectedRoute} from '../middleware.js/protectedRoute.js'

const router = express.Router()

router.post('/studentLogin', studentLogin )
router.post('/registerStudent', registerStudent )
router.post('/loginStudent', loginStudent )
router.post('/verify-otp', verifyOtp )
router.get('/faculty-assigned/:userId', fetchFaculty)
router.post('/feedback', protectedRoute, sendFeedback )

export default router