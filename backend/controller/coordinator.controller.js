import { facultyModel } from "../model/faculty.model.js";
import { studentModel } from "../model/student.model.js";
import { accessKeyModel } from "../model/studentKey.model.js";
import csv from "csvtojson";
import xlsx from "xlsx";
import crypto from "crypto";
import { coordinatorModel } from "../model/coordinator.model.js";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

//coordinator will add facultyData
export const facultyData = async (req, res) => {
  //   console.log("This facultyData");
  try {
    const {
      fullName: facultyName,
      branch: facultyBranch,
      // role,
      year: facultyYear,
      div: facultyDiv,
      subject,
      email: facultyEmail,
      phNumber: facultyPhNumber,
    } = req.body;
    console.log(
      facultyName,
      facultyBranch,
      // role,
      facultyYear,
      facultyDiv,
      subject,
      facultyEmail,
      facultyPhNumber
    );

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

    // const savedStudents = await studentModel.insertMany(
    //   jsonArray.map((student) => ({
    //     fullName: student.Name,
    //     email: student.Email,
    //     branch: student.branch,
    //     studentYear: student.year,
    //     studentDiv: student.div,
    //     usn: student.usn,
    //     phNumber: student.phNumber,
    //     feedbackGiven: false,
    //   }))
    // );

    // // console.log(savedStudents);
    // res.send(savedStudents);

    // Filter out duplicates by checking if 'usn' exists
    const studentsToInsert = [];
    for (const student of jsonArray) {
      const exists = await studentModel.findOne({ usn: student.usn });
      if (!exists) {
        studentsToInsert.push({
          fullName: student.Name,
          email: student.Email,
          role: "Student",
          branch: student.branch,
          studentYear: student.year,
          studentDiv: student.div,
          usn: student.usn,
          phNumber: student.phNumber,
          feedbackGiven: false,
        });
      }
    }

    if (studentsToInsert.length > 0) {
      const savedStudents = await studentModel.insertMany(studentsToInsert);
      res.send(savedStudents);
    } else {
      res.send({ message: "No new students to add" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to import data" });
  }
};

//coordinator will add student manually
export const addStudentDataManual = async (req, res) => {
  try {
    const {
      fullName,
      email,
      branch,
      year: studentYear,
      div: studentDiv,
      usn,
      phNumber,
    } = req.body;
    // console.log(fullName, email, branch, studentYear, studentDiv, usn, phNumber)
    // Check if student already exists based on 'usn'
    const exists = await studentModel.findOne({ usn });
    if (exists) {
      return res
        .status(400)
        .send({ message: "Student with this USN already exists" });
    }

    // Create new student record
    const newStudent = new studentModel({
      fullName,
      email,
      role: "Student",
      branch,
      studentYear,
      studentDiv,
      usn,
      phNumber,
      feedbackGiven: false,
    });

    // Save to database
    const savedStudent = await newStudent.save();
    res.send(savedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to add student data" });
  }
};

export const generateAccessKey = async (req, res) => {
  try {
    // Generate a random access key
    const studentAccessKey = crypto.randomBytes(16).toString("hex");

    // Set validity period (e.g., 24 hours)
    const validUntil = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Save the key to the database
    const newKey = new accessKeyModel({
      key: studentAccessKey,
      validUntil,
    });
    await newKey.save();

    res
      .status(201)
      .json({ message: "Student access key generated", studentAccessKey });
  } catch (error) {
    console.error("Error generating access key:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// reset student feedbackGiven to false

export const resetFeedbackStatus = async (req, res) => {
  try {
    await studentModel.updateMany({}, { feedbackGiven: false });
    res.status(200).json({ message: "Feedback status reset successfully" });
  } catch (error) {
    console.log("Error during feedback status reset:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//coordinator login
export const coordinatorLogin = async (req, res) => {
  // coordinatorName,coordinatorEmail,coordinatorBranch,coordinatorPhNumber,coordinatorAccessKey,
  try {
    const {
      coordinatorName,
      coordinatorEmail,
      role,
      coordinatorBranch,
      coordinatorAccessKey,
    } = req.body;
    // console.log(coordinatorName,coordinatorEmail,coordinatorBranch,coordinatorAccessKey)

    if (
      !coordinatorName ||
      !coordinatorEmail ||
      !role ||
      !coordinatorBranch ||
      !coordinatorAccessKey
    ) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const coordinator = await coordinatorModel.findOne({
      coordinatorBranch,
      coordinatorEmail,
    });
    console.log(coordinator);
    if (!coordinator) {
      return res.status(400).json({
        message: `coordinator don't exist for ${coordinatorBranch} branch`,
      });
    }

    //check password by bcyrpt.js
    if (coordinator.coordinatorAccessKey !== coordinatorAccessKey) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    createTokenAndSaveCookie(coordinator._id, coordinator.role, res);

    res.status(200).json({
      message: "coordinator logged in successfully",
      coordinator: {
        _id: coordinator._id,
        email: coordinator.coordinatorEmail,
        role: coordinator.role,
        branch: coordinator.coordinatorBranch,
      },
    });
  } catch (error) {
    console.log("Error in coordinator Login ", error);
    return res.status(500).json({ error: "Server error" });
  }
};

//view Students

export const allStudents = async (req, res) => {
  try {
    const { branch, year: studentYear, div: studentDiv } = req.body;
    // console.log(branch, studentYear, studentDiv);

    const student = await studentModel.find({
      branch,
      studentYear,
      studentDiv,
    });
    res.status(200).json({ message: "all students", student });
  } catch (error) {
    console.log("Error in viewing allStudent ", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const allFaculty = async (req, res) => {
  try {
    const {
      branch: facultyBranch,
      year: facultyYear,
      div: facultyDiv,
    } = req.body;
    // console.log(facultyBranch, facultyYear, facultyDiv);

    const faculty = await facultyModel.find({
      facultyBranch,
      facultyYear,
      facultyDiv,
    });
    res.status(200).json({ message: "all faculty", faculty });
  } catch (error) {
    console.log("Error in viewing allFaculty ", error);
    return res.status(500).json({ error: "Server error" });
  }
};
