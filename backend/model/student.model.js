import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  role: {
    type: String,
    require: true,
    enum: ["Student", "Admin", "Coordirator", "Faculty"],
  },
  branch: {
    type: String,
    require: true,
    enum: ["CSE"],
  },
  studentYear: {
    type: String,
    require: true,
  },
  studentDiv: {
    type: String,
    require: true,
  },
  usn: {
    type: String,
    require: true,
  },
  phNumber: {
    type: String,
    require: true,
  },
  feedbackGiven: {
    type: Boolean,
    require: true,
    default: false,
  },
  otp: {
    type: String,
    default: null,
  },
  otpExpiresAt: {
    type: Date,
    default: null,
  },
});

export const studentModel = new mongoose.model("Student", studentSchema);
