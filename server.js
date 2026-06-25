const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Order = require("./models/Order");
const Product = require("./models/Product");
const User = require("./models/UserModel");
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
app.post("/register", async (req, res) => {
  const { userId, phone, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ userId }, { phone }]
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  const user = new User({
    userId,
    phone,
    password
  });

  await user.save();

  res.json({
    message: "Registered Successfully"
  });
});
app.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({
    password,
    $or: [
      { userId: login },
      { phone: login }
    ]
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid Credentials"
    });
  }

  res.json({
    userId: user.userId
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
app.get("/orders/:userId", async (req, res) => {
  const orders = await Order.find({
    userId: req.params.userId,
  });

  res.json(orders);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
