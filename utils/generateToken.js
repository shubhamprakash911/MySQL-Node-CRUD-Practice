const jwt = require("jsonwebtoken");
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
};

module.exports = generateToken;
