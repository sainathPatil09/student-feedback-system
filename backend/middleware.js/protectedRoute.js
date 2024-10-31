import jwt from 'jsonwebtoken'
import { studentModel } from '../model/student.model.js';


const protectedRoute=async(req,res, next)=>{
    try {
        const token = req.cookies.jwt

        if(!token){
            return res.status(403).json({ error: "No token, autherization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await studentModel.findById(decoded.userId).select("-password")
        if (!decoded) {
        return res.status(403).json({ error: "Invalid token" });
        }
        if (!user) {
        return res.status(404).json({ error: "No user found" });
        }
        req.user = user;
        next()
    } catch (error) {
        console.log("Error in protectedRoute", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default protectedRoute;