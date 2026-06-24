const mongoose = require("mongoose");

const HelpSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("Help", HelpSchema);
