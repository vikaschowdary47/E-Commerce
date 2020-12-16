const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, minLength: 4, maxLength: 15 },
    email: { type: String, required: true, minLength: 9 },
    password: { type: String, required: true, minLength: 6 },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
