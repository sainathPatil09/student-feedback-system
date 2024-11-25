import mongoose from "mongoose";

const facultySchemaA = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type:Date,
    required:true,
  },
  password: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
    enum: ["CSE", "AIDS", "EC"], // Add other branches as needed
  },
  designation: {
    type: String,
    required: true,
    enum: ["PHD", "MTECH"],
  },
  fId: {
    type:String,
    required:true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Student", "Admin", "Coordinator", "Faculty"],
  }
});

export const facultyModelA = mongoose.model("FacultyA", facultySchemaA);
