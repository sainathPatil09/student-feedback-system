export const loginFaculty = (req, res) => {
  try {
    const { fullName:facultyName, email:facultyEmail, branch:facultyBranch, facultyAccessKey:password } = req.body;
    // console.log(facultyName, facultyEmail, facultyBranch, password);

    if (password !== process.env.ACCESS_KEY_FACULTY) {
      res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Faculty logged in successfully"});
  } catch (error) {
    console.log("Error in loginFaculty ", error);
    return res.status(500).json({ error: "Server error" });
  }
};
