import { adminModel } from "../model/admin.model.js";
import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
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
