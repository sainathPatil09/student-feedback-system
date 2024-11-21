import { adminModel } from "../model/admin.model.js";
import bcrypt from "bcryptjs";
import path from 'path'
// import dotenv from "dotenv";
import { coordinatorModel } from "../model/coordinator.model.js";
import createTokenAndSaveCookie from "../jwt/generateToken.js";
import { facultyModel } from "../model/faculty.model.js";
import { Feedback } from "../model/feedback.model.js";

// admin signup
export const adminSignup = async (req, res) => {
  // console.log("adminSignup route")
  try {
    const {
      fullName,
      email,
      branch,
      role,
      password,
      accessKey: accessCode,
    } = req.body;
    console.log(fullName, email, branch, role, password, accessCode);

    if (!fullName || !email || !branch || !role || !password || !accessCode) {
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
      role,
      branch,
      password: hashPassword,
    });

    await newAdmin.save();

    if (newAdmin) {
      console.log(newAdmin);
      res.status(200).json({ message: "New Admin Created", newAdmin });
    }
  } catch (error) {
    console.log("Error in AdminSignup", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// admin login
export const adminLogin = async (req, res) => {
  // console.log("this is adminLogin route");

  try {
    const { email, role, branch, password } = req.body;
    // console.log(email, role, branch, password )

    if (!email || !role || !branch || !password) {
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

    createTokenAndSaveCookie(admin._id, admin.role, res);
    res.status(200).json({
      message: "Admin logged in successfully",
      admin: {
        _id: admin._id,
        email: admin.email,
        role: admin.role,
        branch: admin.branch,
      },
    });
  } catch (error) {
    console.log("Error in AdminLogin ", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const registerCoordinator = async (req, res) => {
  // console.log(coordinatorName, coordinatorEmail, coordinatorBranch, coordinatorPhNumber)

  try {
    const {
      coordinatorName,
      coordinatorEmail,
      role,
      coordinatorBranch,
      coordinatorPhNumber,
      coordinatorAccessKey,
    } = req.body;

    console.log(
      coordinatorName,
      coordinatorEmail,
      role,
      coordinatorBranch,
      coordinatorPhNumber,
      coordinatorAccessKey
    );

    if (
      (!coordinatorName || !coordinatorEmail || !role,
      !coordinatorBranch || !coordinatorPhNumber || !coordinatorAccessKey)
    ) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const coordinator = await coordinatorModel.findOne({ coordinatorBranch });
    if (coordinator) {
      return res.status(400).json({
        message: `coordinator already exist for ${coordinatorBranch} branch`,
      });
    }

    const newCoordinator = new coordinatorModel({
      coordinatorName,
      coordinatorEmail,
      role,
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

export const viewFeedback = async (req, res) => {
  try {
    const {
      year: facultyYear,
      div: facultyDiv,
      branch: facultyBranch,
    } = req.body;
    // console.log(facultyYear, facultyDiv, facultyBranch)
    // Fetch all faculty members for the given year and division
    const facultyList = await facultyModel
      .find({ facultyYear, facultyDiv, facultyBranch })
      .select("_id facultyName subject");
    // console.log(facultyList)
    const facultyIds = facultyList.map((faculty) => faculty._id);
    // console.log(facultyIds, "facultyIds")
    // Fetch feedback for all faculty in that list
    const feedback = await Feedback.find({ facultyId: { $in: facultyIds } });
    // .populate("studentId", "fullName")
    // .populate("facultyId", "name subject");

    // Calculate average ratings for each question per faculty
    const feedbackData = facultyList.map((faculty) => {
      const facultyFeedback = feedback.filter(
        (f) => f.facultyId._id.toString() === faculty._id.toString()
      );

      // Calculate averages for each question
      const questionAverages = {};
      facultyFeedback.forEach((f) => {
        f.responses.forEach(({ question, rating }) => {
          if (!questionAverages[question]) {
            questionAverages[question] = { total: 0, count: 0 };
          }
          // Convert rating to numerical value if needed
          const numericalRating = convertRatingToNumber(rating);
          questionAverages[question].total += numericalRating;
          questionAverages[question].count += 1;
        });
      });

      // Calculate average for each question
      const averages = Object.keys(questionAverages).map((question) => ({
        question,
        averageRating: (
          questionAverages[question].total / questionAverages[question].count
        ).toFixed(2),
      }));

      const totalRatings = averages.reduce(
        (sum, { averageRating }) => sum + parseFloat(averageRating),
        0
      );
      const overallAverageRating = (totalRatings / averages.length).toFixed(2);

      return {
        facultyId: faculty._id,
        facultyName: faculty.facultyName,
        subject: faculty.subject,
        averageRatings: averages,
        overallAverageRating,
      };
    });

    // console.log(feedbackData, "feedback")
    res.status(200).json(feedbackData);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Error fetching feedback" });
  }
};

function convertRatingToNumber(rating) {
  const ratingMap = {
    Poor: 1,
    Medium: 2,
    Good: 3,
    "Very good": 5,
  };
  return ratingMap[rating] || 0; // Defaults to 0 if rating is invalid
}

export const generatePDF = async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${req.protocol}://${req.get('host')}`+"/pdf", {
      waitUntil : "networkidel2"
    })

    
    page.setViewport({width: 1680, height:1050});
    const todayDate = new Date()
    const pdfn = await page.pdf({
      path: `${path.join(__dirname, '../uploads/files', todayDate.getTime()+".pdf")}`,
      formate:"A4"
    })

    await browser.close();

    const pdfURL = path.join(__dirname, '../uploads/files', todayDate.getTime()+".pdf")

    res.set({
      "Content-Type":"application/pdf",
      "content-Length" :pdfn.length
    })

    res.sendFile(pdfURL)

  } catch (error) {
    console.log(error + "error in generatingPDF")
  }
};
