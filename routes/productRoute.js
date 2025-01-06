const Product = require("../models/productModel.js");
const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProduct,
} = require("../controllers/productController.js");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/", addProduct);

module.exports = router;
