const express = require("express");
const { createProduct } = require("../controllers/productController");
const { protect, authorization } = require("../middleware/authMiddleware");

const productRoute = express.Router();

productRoute.route("/").post(protect, authorization(["admin"]), createProduct);

module.exports = productRoute;
