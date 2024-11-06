import express from "express";
import multer from "multer";
import { addStudentDataManual, coordinatorLogin, facultyData, generateAccessKey, resetFeedbackStatus, studentData } from "../controller/coordinator.controller.js";
import { protectedRouteCoordinator} from "../middleware.js/protectedRoute.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage,
});

router.post("/assignFaculty",protectedRouteCoordinator, facultyData);
router.post("/importStudent", protectedRouteCoordinator, upload.single("csvFile"), studentData);
router.post('/generate-key', protectedRouteCoordinator, generateAccessKey);
router.post('/addStudent', protectedRouteCoordinator, addStudentDataManual);
router.put('/resetFeedbackStatus',protectedRouteCoordinator, resetFeedbackStatus )
router.post('/coordinatorlogin', coordinatorLogin )
export default router