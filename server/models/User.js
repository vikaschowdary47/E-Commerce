const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, minLength: 4, maxLength: 15 },
  email: { type: String, required: true, minLength: 9 },
  password: { type: String, required: true, minLength: 6 },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("User", userSchema);
