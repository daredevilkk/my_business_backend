const orderSchema = new mongoose.Schema({
  userId: String,
  productName: String,
  price: Number,
  paymentMethod: String,
  address: String,
  status: {
    type: String,
    default: "Pending"
  }
});