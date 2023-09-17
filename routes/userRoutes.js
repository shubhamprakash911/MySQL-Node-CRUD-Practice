const express = require("express");
const { userRegister } = require("../controllers/userController");
const userRoute = express.Router();

userRoute.route("/register").post(userRegister);

module.exports = userRoute;
