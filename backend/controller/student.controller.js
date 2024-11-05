import createTokenAndSaveCookie from "../jwt/generateToken.js";
import { facultyModel } from "../model/faculty.model.js";
import { Feedback } from "../model/feedback.model.js";
import { studentModel } from "../model/student.model.js";
import { accessKeyModel } from "../model/studentKey.model.js";

export const studentLogin = async (req, res) => {
  try {
    const {
      fullName,
      email,
      branch,
      year: studentYear,
      div: studentDiv,
      usn,
      studentAccessKey,
    } = req.body;
    // console.log(fullName, email, branch,studentYear, studentDiv, usn, studentAccessKey )

    // Check if student exists in the database
    const student = await studentModel.findOne({
      email,
      usn,
      branch,
      studentYear,
      studentDiv,
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

    createTokenAndSaveCookie(student._id, res);
    //filter faculty data of student year and div
    const facultyList = await facultyModel.find({
      facultyYear: studentYear,
      facultyDiv: studentDiv,
    });

    res.status(200).json({ message: "Login successful", student, facultyList });
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
