import { facultyModel } from "../model/faculty.model.js";
import { studentModel } from "../model/student.model.js";
import { accessKeyModel } from "../model/studentKey.model.js";
import csv from "csvtojson";
import xlsx from "xlsx";
import crypto from 'crypto'



//coordinator will add facultyData
export const facultyData = async (req, res) => {
    //   console.log("This facultyData");
    try {
      const {
        facultyName,
        facultyBranch,
        facultyYear,
        facultyDiv,
        subject,
        facultyEmail,
        facultyPhNumber,
      } = req.body;
      // console.log(fullName, email, branch, password, accessCode);
  
      if (
        !facultyName ||
        !facultyBranch ||
        !facultyYear ||
        !facultyDiv ||
        !subject ||
        !facultyEmail ||
        !facultyPhNumber
      ) {
        return res.status(400).json({ message: "Please fill required fields" });
      }
      const existingFaculty = await facultyModel.findOne({
        facultyYear,
        facultyDiv,
        subject,
        facultyBranch,
      });
  
      if (existingFaculty) {
        return res.status(409).json({
          message: "Faculty for this year, division, and subject already exists",
        });
      }
  
      // If not present, create and save the new faculty data
      const newFaculty = new facultyModel({
        facultyName,
        facultyBranch,
        facultyYear,
        facultyDiv,
        subject,
        facultyEmail,
        facultyPhNumber,
      });
  
      await newFaculty.save();
      return res
        .status(201)
        .json({ message: "Faculty added successfully", faculty: newFaculty });
    } catch (error) {
      console.error("Error in facultyData:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  //coordinator will import studentData
  export const studentData = async (req, res) => {
    // const jsonArray=await csv().fromFile(req.file.path);
    // console.log(jsonArray)
    // res.send(jsonArray)
  
    try {
      const filePath = req.file.path;
  
      let jsonArray;
      if (req.file.mimetype === "text/csv") {
        // Parse CSV file
        jsonArray = await csv().fromFile(filePath);
      } else if (
        req.file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // Parse Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        jsonArray = xlsx.utils.sheet_to_json(worksheet);
      } else {
        return res.status(400).send({ error: "Unsupported file format" });
      }
  
      const savedStudents = await studentModel.insertMany(
        jsonArray.map((student) => ({
          fullName: student.Name,
          email: student.Email,
          branch: student.branch,
          studentYear: student.year,
          studentDiv: student.div,
          usn: student.usn,
          phNumber: student.phNumber,
        }))
      );
  
      // console.log(savedStudents);
      res.send(savedStudents);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to import data" });
    }
  };


  export const generateAccessKey = async (req, res) => {
    try {
        // Generate a random access key
        const studentAccessKey = crypto.randomBytes(16).toString('hex');
        
        // Set validity period (e.g., 24 hours)
        const validUntil = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Save the key to the database
        const newKey = new accessKeyModel({
            key: studentAccessKey,
            validUntil
        });
        await newKey.save();

        res.status(201).json({ message: "Student access key generated", studentAccessKey });
    } catch (error) {
        console.error("Error generating access key:", error);
        res.status(500).json({ message: "Server error" });
    }
};