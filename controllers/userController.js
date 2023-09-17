const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");

const userRegister = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ where: { email } });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = User.build({ email, password });
  await user.save();

  res.status(200).json("User register successfully");
});

module.exports = { userRegister };
