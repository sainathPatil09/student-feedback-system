import jwt from 'jsonwebtoken';

const getUserFromToken = (req, res) => {
    const token = req.cookies.jwt;
    console.log(token)
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        console.log(decoded , " in authController")
        res.json({ user: decoded });  // Send decoded user data to client
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
};

export default getUserFromToken;
