import { adminModel } from "../model/admin.model.js";
import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
import { coordinatorModel } from "../model/coordinator.model.js";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

// admin signup
export const adminSignup = async (req, res) => {
  // console.log("adminSignup route")
  try {
    const { fullName, email, branch,role, password, accessKey:accessCode } = req.body;
    console.log(fullName, email, branch,role, password, accessCode);

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
      console.log(newAdmin)
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
    const { email,role, branch, password } = req.body;
    // console.log(fullName, email, branch)

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

    createTokenAndSaveCookie(admin._id,admin.role, res);
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

    console.log(coordinatorName,
      coordinatorEmail,
      role,
      coordinatorBranch,
      coordinatorPhNumber,
      coordinatorAccessKey,)

    if (
      !coordinatorName ||
      !coordinatorEmail ||
      !role,
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
