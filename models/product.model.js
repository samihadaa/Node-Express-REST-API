const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name of the product"],
  },
  price: {
    type: Number,
    required: [true, "please enter the price of the product"],
    default: 0,
  },
  quantity: {
    type: Number,
    required: [true, "please enter the quantity of the product"],
    default: 0,
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
