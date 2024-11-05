import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  facultyName: {
    type: String,
    require: true,
  },
  facultyBranch: {
    type: String,
    require: true,
    enum: ["CSE"],
  },
  role: {
    type: String,
    require: true,
    enum: ["Student", "Admin", "Coordirator", "Faculty"],
  },
  facultyYear: {
    // which year faculty is taking class
    type: String,
    require: true,
  },
  facultyDiv: {
    // which Div faculty is taking class
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  facultyEmail: {
    type: String,
    require: true,
  },
  facultyPhNumber: {
    type: String,
    require: true,
  },
});

export const facultyModel = new mongoose.model("Faculty", facultySchema);
