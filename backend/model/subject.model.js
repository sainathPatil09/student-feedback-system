import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  scheme:{
    type:String,
    require:true,
    enum: ["2022"],
  },
  subjectName: {
    type: String,
    require: true,
  },
  subjectCode:{
    type:String,
    require:true,
  },
  branch: {
    type: String,
    require: true,
    enum: ["CSE", "AIDS", "EC"],
  },
  sem: {
    type: String,
    require: true,
    enum: ["phy", "chy", "3", "4", "5", "6", "7", "8"],
  },
  subjectType: {
    type: String,
    required: true,
    enum: ["Core", "Elective", "Lab"], // Different subject types
  },
  credits: {
    type: Number,
    required: true,
  },
});

export const subjectModel = mongoose.model("Subject", subjectSchema);
