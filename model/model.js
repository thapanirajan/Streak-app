const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/counter");

const counterSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  counter: Number,
});
module.exports = mongoose.model("counter", counterSchema);
