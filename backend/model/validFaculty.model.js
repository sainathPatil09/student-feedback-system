import mongoose from "mongoose";

const validFacultySchema = new mongoose.Schema({
    fId: {
        type:String,
        require:true,
        unique:true
    },
    branch:{
        type:String,
        require:true,
        enum:["CSE", "AIDS", "EC"]
    }
})

export const validFacultyModel = mongoose.model("validFaulty", validFacultySchema);
