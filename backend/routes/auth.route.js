import express from 'express'
import getUserFromToken from '../controller/auth.controller.js';

const router = express.Router()

router.get('/auth-User', getUserFromToken);

export default router