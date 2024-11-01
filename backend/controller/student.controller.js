import createTokenAndSaveCookie from "../jwt/generateToken.js";
import { facultyModel } from "../model/faculty.model.js";
import { studentModel } from "../model/student.model.js";
import { accessKeyModel } from "../model/studentKey.model.js";

export const studentLogin =async (req, res)=>{
    try {
        const{fullName, email, branch,studentYear, studentDiv, usn, studentAccessKey } = req.body
        // console.log(fullName, email, branch,studentYear, studentDiv, usn, studentAccessKey )
        
        // Check if student exists in the database
        const student = await studentModel.findOne({ email, usn, branch, studentYear, studentDiv });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Fetch the latest key
        const latestKey = await accessKeyModel.findOne().sort({ createdAt: -1 });

        // Check if the key is valid
        if (!latestKey || latestKey.key !== studentAccessKey || latestKey.validUntil < new Date()) {
            return res.status(401).json({ message: "Invalid or expired access key" });
        }
        
        createTokenAndSaveCookie(student._id, res);
        //filter faculty data of student year and div
        const facultyList = await facultyModel.find({facultyYear: studentYear, facultyDiv: studentDiv});

        
        res.status(200).json({ message: "Login successful", facultyList });



    } catch (error) {
        console.log("Error in StudentLogin ", error);
        return res.status(500).json({ error: "Server error" });
    }
    // res.send("Ok")
}

export const sendFeedback =(req, res)=>{
    console.log("in sendFeedback route")
    res.send("OK");
}