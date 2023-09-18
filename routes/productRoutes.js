const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const { protect, authorization } = require("../middleware/authMiddleware");

const productRoute = express.Router();

productRoute
  .route("/")
  .get(getAllProducts)
  .post(protect, authorization(["admin"]), createProduct);

productRoute
  .route("/:id")
  .get(getProductById)
  .delete(protect, authorization(["admin"]), deleteProduct)
  .put(protect, authorization(["admin"]), updateProduct);

module.exports = productRoute;
