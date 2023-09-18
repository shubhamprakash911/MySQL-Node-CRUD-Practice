const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/productModel");

// @desc   create a product
// @route  POST /api/prodcut/create
// @access Protect
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  console.log(req.user.dataValues.id, "okkkkkkkkkk");
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

module.exports = { createProduct };
