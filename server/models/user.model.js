const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please insert your name"],
  },
  avatar: {
    type: Object,
  },
  age: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
