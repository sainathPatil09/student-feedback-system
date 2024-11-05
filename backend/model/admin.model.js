import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    role:{
        type:String,
        require:true,
        enum:["Student", "Admin", "Coordirator", "Faculty"]
    },
    branch:{
        type:String,
        require:true,
        enum:["CSE","AIDS"]
    },
    password:{
        type:String,
        require:true,
    }
})

export const adminModel = new mongoose.model("Admin", adminSchema);