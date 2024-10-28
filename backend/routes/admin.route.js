import express from 'express'
import { adminLogin, adminSignup, facultyData, studentData } from '../controller/admin.controller.js'
import multer from 'multer'

const router = express.Router()
const storage = multer.diskStorage({
    destination:(req, res, cb)=>{
      cb(null,"./uploads" )
    },
    filename:(req, file, cb)=>{
      cb(null, file.originalname)
    }
  })
  const upload = multer({
    storage,
  })

router.post("/adminLogin", adminLogin)
router.post("/adminSignup", adminSignup)
router.post("/assignFaculty", facultyData)
router.post("/importStudent", upload.single("csvFile"), studentData)

export default router