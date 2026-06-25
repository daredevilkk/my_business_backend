const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,

  images: String,
  videos: String,

  shape: String,
  height: Number,
  radius: Number,
  diameter: Number,
  length: Number,
  breadth: Number
});

module.exports = mongoose.model("Product", ProductSchema);