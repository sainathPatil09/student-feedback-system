import express from 'express'
import { studentLogin } from '../controller/student.controller.js'

const router = express.Router()

router.post('/studentLogin', studentLogin )

export default router