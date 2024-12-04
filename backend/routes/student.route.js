import express from 'express'
import { fetchFaculty, getFacultyMappingForFeedback, loginStudent, registerStudent, sendFeedback, studentLogin, studentProfile, validiateKey, verifyOtp } from '../controller/student.controller.js'
import {protectedRoute} from '../middleware.js/protectedRoute.js'

const router = express.Router()

router.post('/studentLogin', studentLogin )
router.post('/registerStudent', registerStudent )
router.post('/loginStudent', loginStudent )
router.post('/verify-otp', verifyOtp )
router.get('/faculty-assigned/:userId', fetchFaculty)
router.post('/feedback', protectedRoute, sendFeedback )
router.post('/validate-Key', protectedRoute, validiateKey )
router.get('/student-profile/:studentId', protectedRoute, studentProfile )
router.post('/get-faculty-mappings', protectedRoute, getFacultyMappingForFeedback)

export default router