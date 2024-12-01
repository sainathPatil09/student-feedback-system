import createTokenAndSaveCookie from "../jwt/generateToken.js";
import { facultyModelA } from "../model/facultyA.model.js";
import { validFacultyModel } from "../model/validFaculty.model.js";
import bcrypt from "bcryptjs";

export const loginFaculty = (req, res) => {
  try {
    const {
      fullName: facultyName,
      email: facultyEmail,
      role,
      branch: facultyBranch,
      facultyAccessKey: password,
    } = req.body;
    // console.log(facultyName, facultyEmail, facultyBranch, password);

    if (password !== process.env.ACCESS_KEY_FACULTY) {
      res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Faculty logged in successfully",
    });
  } catch (error) {
    console.log("Error in loginFaculty ", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const facultyRegister = async (req, res) => {
  try {
    const { name, email, dob, password, branch, designation, fId, role } =
      req.body;
    // console.log(name, email, dob, password, branch, designation, fId, role )
    if (
      !name ||
      !email ||
      !dob ||
      !password ||
      !branch ||
      !designation ||
      !fId ||
      !role
    ) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    const validFaculty = await validFacultyModel.findOne({ fId });
    if (!validFaculty) {
      return res.status(400).json({ message: "Invalid Faculty Id" });
    }

    const existsFaulty = await facultyModelA.findOne({ fId });
    if (existsFaulty) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newFaculty = new facultyModelA({
      name,
      email,
      dob: new Date(dob),
      password: hashedPassword,
      branch,
      designation,
      fId,
      role,
    });

    await newFaculty.save();

    res.status(201).json({
      message: "Faculty registered successfully",
      faculty: newFaculty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering Faculty" });
  }
};

export const facultyLogin = async (req, res) => {
  try {
    const { email, password, fId } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required." });
    }

    // Check if faculty exists
    const faculty = await facultyModelA.findOne({ email, fId });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, faculty.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    createTokenAndSaveCookie(faculty._id, faculty.role, res);
    
    res.status(200).json({ message: "Faculty Login Successfully", faculty });
  } catch (error) {
    console.error("Error during faculty login:", error.message);
    res
      .status(500)
      .json({ message: "Error logging in." });
  }
};
