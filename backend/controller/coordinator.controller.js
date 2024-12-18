import { facultyModel } from "../model/faculty.model.js";
import { studentModel } from "../model/student.model.js";
import { accessKeyModel } from "../model/studentKey.model.js";
import csv from "csvtojson";
import xlsx from "xlsx";
import crypto from "crypto";
import { coordinatorModel } from "../model/coordinator.model.js";
import createTokenAndSaveCookie from "../jwt/generateToken.js";
import { subjectModel } from "../model/subject.model.js";
import { courseModel } from "../model/course.model.js";
import { validStudentModel } from "../model/validStudent.model.js";
import { validFacultyModel } from "../model/validFaculty.model.js";
import { facultyModelA } from "../model/facultyA.model.js";
import { mappingModel } from "../model/mapping.model.js";

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
    const { fullName, email, branch, studentYear, studentDiv, usn, phNumber } =
      req.body;
    console.log(
      fullName,
      email,
      branch,
      studentYear,
      studentDiv,
      usn,
      phNumber
    );
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

// *****************************************************

// add subject
export const addSubject = async (req, res) => {
  try {
    const {
      scheme,
      subjectName,
      subjectCode,
      branch,
      sem,
      subjectType,
      credits,
      totalSubjects
    } = req.body;

    console.log(scheme, subjectName, subjectCode, branch, sem, subjectType, credits, totalSubjects);

    if (
      !scheme ||
      !subjectName ||
      !subjectCode ||
      !branch ||
      !sem ||
      !subjectType ||
      !credits
    ) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const exists = await subjectModel.findOne({ scheme, subjectCode });
    if (exists) {
      return res.status(400).send({ message: "This subject already exists" });
    }

    const newSubject = new subjectModel({
      scheme,
      subjectName,
      subjectCode,
      branch,
      sem,
      subjectType,
      credits,
    });

    const savedSubject = await newSubject.save();


    let course = await courseModel.findOne({ scheme, branch, sem });

    if (!course) {
      // Create a new course if it doesn't exist
      course = new courseModel({
        scheme,
        branch,
        sem,
        subjects: [],
        totalSubject: totalSubjects, // Initialize totalSubjects as 0
      });
      await course.save()
    }
    console.log(course)
    course.subjects.push(savedSubject._id);
    const savedCourse = await course.save();
    // res.send(savedSubject);
    res.status(201).json({
      message: "Subject added successfully and course updated",
      subject: savedSubject,
      course: savedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to add subject" });
  }
};

//check course is present or not
export const checkCourse = async (req, res)=>{
  try {
    const { scheme, branch, sem } = req.query;
    const course = await courseModel.findOne({ scheme, branch, sem });
    res.json({ exists: !!course });
  } catch (error) {
    console.error("Error checking course:", error);
    res.status(500).json({ error: "Failed to check course" });
  }
}

// add course
export const addCourse = async (req, res) => {
  try {
    const { scheme, branch, sem, subjects, totalSubject } = req.body;
    console.log(scheme, branch, sem, subjects, totalSubject);

    if (!scheme || !branch || !sem || !subjects || !totalSubject) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    // Find subjects by name
    const sub = await subjectModel.find({ subjectName: { $in: subjects } });
    console.log(sub.length);
    if (sub.length !== subjects.length) {
      return res
        .status(400)
        .send({ message: "Some subjects do not exist in the database" });
    }

    // Extract subject IDs
    const subjectIds = sub.map((subject) => subject._id);

    // Check if course exists
    const exists = await courseModel.findOne({ scheme, branch, sem });
    if (exists) {
      return res.status(400).send({ message: "This course already exists" });
    }

    // Create course
    const newCourse = await courseModel.create({
      scheme,
      branch,
      sem,
      totalSubject,
      subjects: subjectIds,
    });

    // Populate subjects before sending the response
    const populatedCourse = await courseModel
      .findById(newCourse._id)
      .populate("subjects", "subjectName"); // Only include subjectName

    res.status(201).send({
      message: "Course created successfully",
      course: populatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to add course" });
  }
};

// fetch subjects of selected sem
export const fetchSubject = async (req, res) => {
  const { scheme, branch, sem } = req.query;

  try {
    if (!scheme || !branch || !sem) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    const subjects = await subjectModel.find({ scheme, branch, sem });
    console.log("subjects");
    console.log(subjects);
    // If no subjects are found, return an empty array
    if (!subjects || subjects.length === 0) {
      return res
        .status(404)
        .json({ message: "No subjects found for this semester" });
    }

    const coreSubjects = subjects.filter(
      (subject) => subject.subjectType === "Core"
    );
    const electiveSubjects = subjects.filter(
      (subject) => subject.subjectType === "Elective"
    );

    // Return subjects
    res.status(200).json({
      core: coreSubjects,
      electives: electiveSubjects,
    });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//fetch faculty for branch
export const fetchFaculty = async (req, res)=>{
  const {branch } = req.query;

  try {
    if (!branch) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const faculty = await facultyModelA.find({ branch });

    res.status(200).json({faculty});
  } catch (error) {
    
  }
}

export const addValidUSN = async (req, res) => {
  try {
    const { usn, branch, scheme, sem, div } = req.body;

    if (!usn || !branch || !scheme || !sem || !div) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const exist = await validStudentModel.findOne({ usn, sem });
    if (exist) {
      return res.status(400).json({ message: "Usn already exists" });
    }

    const validUsn = new validStudentModel({
      usn,
      branch,
      scheme,
      sem,
      div,
    });

    await validUsn.save();

    res
      .status(201)
      .json({ message: "Usn added successfully", validUSN: validUsn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in adding valid USN" });
  }
};

export const addValidFacultyId = async (req, res) => {
  try {
    const { fId, branch } = req.body;

    if (!fId || !branch) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const exist = await validFacultyModel.findOne({ fId, branch });
    if (exist) {
      return res.status(400).json({ message: "faculty id already exists" });
    }

    const validFaculty = new validFacultyModel({
      fId,
      branch,
    });

    await validFaculty.save();

    res.status(201).json({
      message: "Faculty id added successfully",
      validFaculty: validFaculty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in adding valid Faculty id" });
  }
};

// mapping of faculty

export const facultyMapping = async (req, res) => {
  try {
    const { scheme, sem, div, branch, subject, facultyId } = req.body;
    console.log(scheme, sem, div, branch, subject, facultyId)

    if (!scheme || !sem || !div || !branch || !subject || !facultyId) {
      return res.status(400).json({ error: "please fill required fileds" });
    }
    // Check if mapping already exists
    const existingMapping = await mappingModel.findOne({
      scheme,
      sem,
      div,
      branch,
      subject,
    });

    if (existingMapping) {
      return res.status(409).json({
        error: "Mapping already exists for the given details.",
      });
    }

    // Create a new mapping document
    const newMapping = new mappingModel({
      scheme,
      sem,
      div,
      branch,
      subject,
      facultyId,
    });

    // Save the mapping to the database
    await newMapping.save();

    // Respond with success message
    return res.status(201).json({
      message: "Mapping created successfully!",
      mapping: newMapping,
    });
  } catch (error) {
    console.error("Error creating faculty mapping:", error);

    // Respond with error message
    return res.status(500).json({
      error:
        "An error occurred while creating the mapping. Please try again later.",
    });
  }
};
