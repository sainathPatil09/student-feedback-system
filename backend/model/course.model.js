import mongoose, { Mongoose } from "mongoose";

const courseSchema = new mongoose.Schema({
  scheme: {
    type: String,
    require: true,
    enum: ["2022"],
  },
  branch: {
    type: String,
    require: true,
    enum: ["CSE", "AIDS", "EC"],
  },
  sem:{
    type:String,
    require: true,
    enum: ["phy", "chy", "3", "4", "5", "6", "7", "8"],
  },
  subjects:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
  ],
  totalSubject:{
    type:Number,
    require:true,
  }
});

export const courseModel = new mongoose.model("Course", courseSchema);
