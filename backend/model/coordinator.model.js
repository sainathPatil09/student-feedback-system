import mongoose from "mongoose";

const coordinatorSchema = new mongoose.Schema({
  coordinatorName: {
    type: String,
    require: true,
  },
  coordinatorEmail: {
    type: String,
    require: true,
    unique: true,
  },
  role: {
    type: String,
    require: true,
    enum: ["Student", "Admin", "Coordinator", "Faculty"],
  },
  coordinatorBranch: {
    type: String,
    require: true,
    enum: ["CSE"],
  },
  coordinatorPhNumber: {
    type: String,
    require: true,
  },
  coordinatorAccessKey: {
    type: String,
    require: true,
  },
});

export const coordinatorModel = new mongoose.model(
  "Coordinator",
  coordinatorSchema
);
