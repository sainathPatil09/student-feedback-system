import express from 'express'
import { facultyLogin, facultyRegister, loginFaculty } from '../controller/faculty.controller.js';

const router = express.Router()

router.post('/loginFaculty', loginFaculty);
router.post('/facultyRegister', facultyRegister);
router.post('/facultyLogin', facultyLogin);


export default router