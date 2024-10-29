import express from 'express'
import { loginFaculty } from '../controller/faculty.controller.js';

const router = express.Router()

router.post('/loginFaculty', loginFaculty);


export default router