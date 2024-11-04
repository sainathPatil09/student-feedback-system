import express from 'express'
import { fetchFaculty, sendFeedback, studentLogin } from '../controller/student.controller.js'
import {protectedRoute} from '../middleware.js/protectedRoute.js'

const router = express.Router()

router.post('/studentLogin', studentLogin )
router.get('/faculty-assigned/:userId', fetchFaculty)
router.post('/feedback', protectedRoute, sendFeedback )

export default router