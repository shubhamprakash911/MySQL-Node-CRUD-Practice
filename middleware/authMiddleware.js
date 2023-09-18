const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("./asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({
        where: { id: decoded.userId },
        attributes: { exclude: ["password"] },
      });
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const authorization = (permitedRole) => {
  return (req, res, next) => {
    if (permitedRole.includes(req.user?.role)) {
      next();
    } else {
      res.status(401);
      throw new Error(`${req.user?.role} is not authorized to access this`);
    }
  };
};

module.exports = { protect, authorization };
