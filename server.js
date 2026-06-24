const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Order = require("./models/Order");
const Product = require("./models/Product");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://kishor:kishorff@cluster0.iaxtm1l.mongodb.net/tableStore?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Help = require("./models/Help");


app.post("/help", async (req, res) => {
  const help = new Help(req.body);

  await help.save();

  res.json({
    success: true,
  });
});

app.get("/help", async (req, res) => {
  const helps = await Help.find();

  res.json(helps);
});



app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);

  await product.save();

  res.json({
    success: true,
    message: "Product Added"
  });
});
app.put("/orders/:id/cancel", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" }
    );

    res.json({
      success: true,
      message: "Order Cancelled"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});
app.post("/orders", async (req, res) => {
  console.log(req.body);

  const order = new Order(req.body);
  await order.save();

  res.json({ success: true });
});
app.get("/orders", async (req, res) => {
  const orders = await Order.find();

  res.json(orders);
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
