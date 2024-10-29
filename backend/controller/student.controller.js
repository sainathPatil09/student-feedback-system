export const studentLogin = (req, res)=>{
    try {
        const{fullname, email, branch,studentYear, studentDiv, usn, studentAccessKey } = req.body
        console.log(fullname, email, branch,studentYear, studentDiv, usn, studentAccessKey )
    } catch (error) {
        console.log("Error in StudentLogin ", error);
        return res.status(500).json({ error: "Server error" });
    }
    res.send("Ok")
}