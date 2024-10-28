import express from 'express'
import { adminLogin, adminSignup, facultyData } from '../controller/admin.controller.js'


const router = express.Router()

router.post("/adminLogin", adminLogin)
router.post("/adminSignup", adminSignup)
router.post("/assignFaculty", facultyData)

export default router