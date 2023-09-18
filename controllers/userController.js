const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// @desc   Register a new user
// @route  POST /api/users/register
// @access public
const userRegister = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body;

  const userExist = await User.findOne({ where: { email } });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashPassword = bcrypt.hashSync(password, 5);
  const user = await User.create({ email, password: hashPassword, role });

  generateToken(res, user.id);
  res.status(200).json({
    status: true,
    message: "Register user successfully",
    data: { id: user.id, email: user.email, role: user.role },
  });
});

// @desc   Login a user
// @route  POST /api/users/login
// @access Public
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  console.log(user, "userLogin");

  if (user === null) {
    res.status(400);
    throw new Error("Email or password not found");
  }

  const isPasswordMatch = bcrypt.compareSync(password, user.password);

  if (!isPasswordMatch) {
    res.status(400);
    throw new Error("Email or password not found");
  }
  generateToken(res, user.id);
  res.json({
    status: true,
    message: "user login successfully",
    data: { id: user.id, email: user.email, role: user.role },
  });
});

// @desc   logout user
// @route  POST /api/users/logout
// @access Public
const userLogout = asyncHandler((req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "logged out successfully" });
});

module.exports = { userRegister, userLogin, userLogout };
