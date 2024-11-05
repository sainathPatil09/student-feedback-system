import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId,role, res) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return token
};

export default createTokenAndSaveCookie
