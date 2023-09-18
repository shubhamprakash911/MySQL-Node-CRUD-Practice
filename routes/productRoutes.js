const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/productController");
const { protect, authorization } = require("../middleware/authMiddleware");

const productRoute = express.Router();

productRoute
  .route("/")
  .get(getAllProducts)
  .post(protect, authorization(["admin"]), createProduct);

productRoute.get("/:id", getProductById);

module.exports = productRoute;
