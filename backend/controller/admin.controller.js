import { adminModel } from "../model/admin.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import csv from "csvtojson";
import xlsx from "xlsx";
import { facultyModel } from "../model/faculty.model.js";
import { studentModel } from "../model/student.model.js";
import { coordinatorModel } from "../model/coordinator.model.js";

// admin signup
export const adminSignup = async (req, res) => {
  // console.log("adminSignup route")
  try {
    const { fullName, email, branch, password, accessCode } = req.body;
    // console.log(fullName, email, branch, password, accessCode);

    if (!fullName || !email || !branch || !password || !accessCode) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    if (accessCode !== process.env.ACCESS_KEY_ADMIN) {
      return res.status(400).json({ message: "Invalid access key" });
    }

    const user = await adminModel.findOne({ branch });
    if (user) {
      return res
        .status(400)
        .json({ message: `Admin already exist for ${branch} branch` });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newAdmin = new adminModel({
      fullName,
      email,
      branch,
      password: hashPassword,
    });

    await newAdmin.save();

    if (newAdmin) {
      res.status(200).json({ message: "New Admin Created", newAdmin });
    }
  } catch (error) {
    console.log("Error in AdminSignup", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// admin login
export const adminLogin = async (req, res) => {
  console.log("this is adminLogin route");

  try {
    const { email, branch, password } = req.body;
    // console.log(fullName, email, branch)

    if (!email || !branch || !password) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const admin = await adminModel.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Admin logged in successfully",
      admin: {
        _id: admin._id,
        email: admin.email,
        branch: admin.branch,
      },
    });
  } catch (error) {
    console.log("Error in AdminLogin ", error);
    return res.status(500).json({ error: "Server error" });
  }
};

//admin will add facultyData
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

//admin will import studentData
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

export const registerCoordinator = async (req, res) => {
  // console.log(coordinatorName, coordinatorEmail, coordinatorBranch, coordinatorPhNumber)

  try {
    const {
      coordinatorName,
      coordinatorEmail,
      coordinatorBranch,
      coordinatorPhNumber,
      coordinatorAccessKey,
    } = req.body;

    if (
      !coordinatorName ||
      !coordinatorEmail ||
      !coordinatorBranch ||
      !coordinatorPhNumber ||
      !coordinatorAccessKey
    ) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const coordinator = await coordinatorModel.findOne({ coordinatorBranch });
    if (coordinator) {
      return res
        .status(400)
        .json({ message: `coordinator already exist for ${coordinatorBranch} branch` });
    }

    const newCoordinator = new coordinatorModel({
      coordinatorName,
      coordinatorEmail,
      coordinatorBranch,
      coordinatorPhNumber,
      coordinatorAccessKey,
    });

    await newCoordinator.save();

    if (newCoordinator) {
      res
        .status(200)
        .json({ message: "New Coordinator Created", newCoordinator });
    }
  } catch (error) {
    console.log("Error in registerCoordinator", error);
    return res.status(500).json({ error: "Server error" });
  }
};
