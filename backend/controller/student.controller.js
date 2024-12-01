import createTokenAndSaveCookie from "../jwt/generateToken.js";
import { facultyModel } from "../model/faculty.model.js";
import { Feedback } from "../model/feedback.model.js";
import { studentModel } from "../model/student.model.js";
import { accessKeyModel } from "../model/studentKey.model.js";
import otpGenerator from "otp-generator";
import sendEmail from "../utils/sendEmail.js";
import { validStudentModel } from "../model/validStudent.model.js";
import { courseModel } from "../model/course.model.js";
import { subjectModel } from "../model/subject.model.js";
import { studentModelA } from "../model/studentA.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const studentLogin = async (req, res) => {
  try {
    const {
      fullName,
      email,
      branch,
      role,
      studentYear,
      studentDiv,
      usn,
      studentAccessKey,
    } = req.body;
    console.log(
      fullName,
      email,
      branch,
      role,
      studentYear,
      studentDiv,
      usn,
      studentAccessKey
    );

    // Check if student exists in the database
    const student = await studentModel.findOne({
      // email,
      // branch,
      // role,
      studentYear,
      studentDiv,
      usn,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Fetch the latest key
    const latestKey = await accessKeyModel.findOne().sort({ createdAt: -1 });

    // Check if the key is valid
    if (
      !latestKey ||
      latestKey.key !== studentAccessKey ||
      latestKey.validUntil < new Date()
    ) {
      return res.status(401).json({ message: "Invalid or expired access key" });
    }

    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    console.log(otp);

    const otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiry
    await studentModel.findOneAndUpdate(
      { email },
      { otp, otpExpiresAt },
      { new: true }
    );

    await sendEmail(email, "Your OTP Code", `Your OTP code is: ${otp}`);

    console.log("Email sent");
    res.status(200).json({ message: "OTP sent to registered email" });
  } catch (error) {
    console.log("Error in StudentLogin ", error);
    return res.status(500).json({ error: "Server error" });
  }
  // res.send("Ok")
};

export const sendFeedback = async (req, res) => {
  // console.log("in sendFeedback route")
  // res.send("OK");
  try {
    const { studentId, feedback, feedbackDate } = req.body;
    // console.log(studentId, feedback, feedbackDate)

    const student = await studentModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the student has already given feedback
    if (student.feedbackGiven) {
      return res.status(202).json({ message: "Feedback already submitted" });
    }

    const feedbackPromises = feedback.map(({ facultyId, responses }) => {
      const feedbackEntry = new Feedback({
        studentId,
        facultyId,
        responses,
        feedbackDate,
      });
      return feedbackEntry.save();
    });

    // console.log(feedbackPromises, "feedbackPromises")
    const data = await Promise.all(feedbackPromises);
    await studentModel.findByIdAndUpdate(studentId, { feedbackGiven: true });
    // console.log(data)
    if (data) {
      res.status(200).json({ message: "Feedback submitted successfully" });
    }
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Error saving feedback" });
  }
};

export const fetchFaculty = async (req, res) => {
  const { userId } = req.params;

  try {
    const student = await studentModel.findOne({ _id: userId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const faculty = await facultyModel.find({
      facultyYear: student.studentYear,
      facultyDiv: student.studentDiv,
    });
    res.status(200).json({ faculty });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  console.log(otp, "this is otp");

  try {
    const student = await studentModel.findOne({ otp });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if OTP is valid and not expired
    if (student.otp !== otp || student.otpExpiresAt < Date.now()) {
      return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    // OTP is correct, clear it from the database
    student.otp = null;
    student.otpExpiresAt = null;
    await student.save();

    // Create and send token to log in
    createTokenAndSaveCookie(student._id, student.role, res);

    // Return success message with student data
    res.status(200).json({ message: "Login successful", student });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      usn,
      branch,
      scheme,
      sem,
      div,
      electives,
      phNumber,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !role ||
      !usn ||
      !branch ||
      !scheme ||
      !sem ||
      !div ||
      !electives ||
      !phNumber
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const validStudent = await validStudentModel.findOne({ usn });
    if (!validStudent) {
      return res.status(400).json({ message: "Invalid USN" });
    }

    // Fetch the course for the given scheme, branch, and sem
    const course = await courseModel
      .findOne({ scheme, branch, sem })
      .populate("subjects");
    if (!course) {
      return res.status(400).json({
        message: "No course found for the given scheme, branch, and sem",
      });
    }
    console.log(course, "course")
    // Fetch core and elective subjects
    const coreSubjects = course.subjects.filter(
      (subject) => subject.subjectType === "Core"
    );
    console.log(coreSubjects, "coreSubject");
    console.log(electives);
    const electiveSubjects = await subjectModel.find({
      subjectName: { $in: electives },
      branch,
      sem,
      subjectType: "Elective",
    });
    console.log(electiveSubjects);
    // Validate total subjects
    const totalSelectedSubjects = coreSubjects.length + electiveSubjects.length;
    if (totalSelectedSubjects !== course.totalSubject) {
      return res.status(400).json({
        message: `Total subjects (${totalSelectedSubjects}) do not match the required total subjects (${course.totalSubject}) for the course`,
      });
    }

    // Combine core and elective subjects
    // const allSubjects = [
    //   ...coreSubjects.map((subject) => subject._id),
    //   ...electives,
    // ];

    const existingStudent = await studentModelA.findOne({ scheme, usn });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student already registered with this USN" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Register the student
    const newStudent = new studentModelA({
      name,
      email,
      password: hashedPassword,
      role: role,
      usn,
      branch,
      scheme,
      sem,
      div,
      phNumber,
      coreSubjects: coreSubjects.map((subject) => subject._id),
      electiveSubjects: electiveSubjects.map((subject) => subject._id),
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student registered successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering student" });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, usn, password } = req.body;
    console.log(email, usn, password);

    if (!email || !usn || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const student = await studentModelA.findOne({ email, usn });
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    createTokenAndSaveCookie(student._id, student.role, res);

    res.status(200).json({ message: "Student Login Successfully", student });
  } catch (error) {
    console.error("Error during faculty login:", error.message);
    res.status(500).json({ message: "Error logging in." });
  }
};
