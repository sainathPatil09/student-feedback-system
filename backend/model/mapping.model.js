import mongoose from "mongoose";

const mappingSchema = new mongoose.Schema({
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
  branch: {
    type: String,
    required: true,
    enum: ["CSE", "AIDS", "EC"], // Add other branches as needed
  },
  subject: {
    type: String,
    required: true,
  },
  facultyId: {
    type: String,
    required: true,
  }
});

export const mappingModel = new mongoose.model("FacultyMapping", mappingSchema);
