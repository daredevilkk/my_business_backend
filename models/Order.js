const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  price: Number,
  paymentMethod: String,
  address: String,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Order", OrderSchema);