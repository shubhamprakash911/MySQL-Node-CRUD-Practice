const express = require("express");
const {
  userRegister,
  userLogin,
  userLogout,
} = require("../controllers/userController");
const userRoute = express.Router();

userRoute.route("/register").post(userRegister);
userRoute.post("/login", userLogin);
userRoute.post("/logout", userLogout);

module.exports = userRoute;
