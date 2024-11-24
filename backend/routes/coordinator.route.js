import express from "express";
import multer from "multer";
import {
  addCourse,
  addStudentDataManual,
  addSubject,
  addValidFacultyId,
  addValidUSN,
  allFaculty,
  allStudents,
  coordinatorLogin,
  facultyData,
  generateAccessKey,
  resetFeedbackStatus,
  studentData,
} from "../controller/coordinator.controller.js";
import { protectedRouteCoordinator } from "../middleware.js/protectedRoute.js";
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

router.post("/assignFaculty", protectedRouteCoordinator, facultyData);
router.post(
  "/importStudent",
  protectedRouteCoordinator,
  upload.single("csvFile"),
  studentData
);
router.post("/generate-key", protectedRouteCoordinator, generateAccessKey);
router.post("/addStudent", protectedRouteCoordinator, addStudentDataManual);
router.post("/viewStudent", protectedRouteCoordinator, allStudents);
router.post("/viewFaculty", protectedRouteCoordinator, allFaculty);
router.put(
  "/resetFeedbackStatus",
  protectedRouteCoordinator,
  resetFeedbackStatus
);

router.post("/addSubject", protectedRouteCoordinator, addSubject);
router.post("/addCourse", protectedRouteCoordinator, addCourse);
router.post("/addValidUSN", protectedRouteCoordinator, addValidUSN);
router.post("/addValidFID", protectedRouteCoordinator, addValidFacultyId);
router.post("/coordinatorlogin", coordinatorLogin);
export default router;
