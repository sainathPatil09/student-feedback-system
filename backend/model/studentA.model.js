import mongoose from "mongoose";

const studentSchemaA = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Each student must have a unique email
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Student", "Admin", "Coordinator", "Faculty"],
  },
  usn: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
    enum: ["CSE", "AIDS", "EC"], // Add other branches as needed
  },
  scheme: {
    type: String,
    required: true,
    enum: ["2022"], // Add other schemes as needed
  },
  sem: {
    type: String,
    required: true,
    enum: ["phy", "chy", "3", "4", "5", "6", "7", "8"], // Adjust as needed
  },
  div: {
    type: String,
    required: true,
    enum: ["A", "B", "C"], // Add other divisions if needed
  },
  coreSubjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject", // Links to the Subject collection
      required: true,
    },
  ],
  electiveSubjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject", // Specifically for elective subjects
    },
  ],
  phNumber: {
    type: String,
    require: true,
  },
  feedbackGiven: {
    type: Boolean,
    require: true,
    default: false,
  },
//   otp: {
//     type: String,
//     default: null,
//   },
//   otpExpiresAt: {
//     type: Date,
//     default: null,
//   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const studentModelA = new mongoose.model("StudentA", studentSchemaA);
