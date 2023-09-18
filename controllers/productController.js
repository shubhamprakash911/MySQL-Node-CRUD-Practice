const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/productModel");

// @desc   create a product
// @route  POST /api/prodcut
// @access Protect/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  const product = await Product.create({
    name,
    description: description || "",
    price,
    userId: req.user.dataValues.id,
  });
  res
    .status(201)
    .json({ message: "Product created successfully", data: product });
});

// @desc   Get all product
// @route  GET /api/prodcut
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll();
  res.json({ message: "All products successfully retrieve", data: products });
});

// @desc   Get product by id
// @route  GET /api/prodcut/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.json({ message: "Get a product successfully by id", data: product });
});

module.exports = { createProduct, getAllProducts, getProductById };
