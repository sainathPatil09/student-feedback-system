import mongoose from "mongoose";

const validStudentSchema = new mongoose.Schema({
  usn: {
    type: String,
    required: true,
    // unique: true, // USN should be unique for every student
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
    enum: ["phy", "chy", "3", "4", "5", "6", "7", "8"], // Adjust based on your semesters
  },
  div: {
    type: String,
    required: true,
    enum: ["A", "B", "C"], // Add other divisions if applicable
  },
});

export const validStudentModel = mongoose.model("ValidStudent", validStudentSchema);
