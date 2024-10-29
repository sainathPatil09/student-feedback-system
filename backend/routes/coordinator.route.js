import express from "express";
import multer from "multer";
import { facultyData, studentData } from "../controller/coordinator.controller.js";
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

router.post("/assignFaculty", facultyData);
router.post("/importStudent", upload.single("csvFile"), studentData);
export default router