const Product = require("../models/product.model.js");
const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProduct,
} = require("../controllers/product.controller.js");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/", addProduct);

module.exports = router;
