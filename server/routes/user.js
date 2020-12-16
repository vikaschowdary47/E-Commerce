const router = require("express").Router();
const User = require("../models/User");

const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");

router.route("/register").post(async (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err)
      return res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      return res.status(500).json({
        message: { msgBody: "Email is already registered", msgError: true },
      });
    else {
      const newUser = new User({ username, email, password });
      newUser.save((err) => {
        if (err)
          return res
            .status(500)
            .json({
              message: { msgBody: "Error has occured", msgError: true },
            });
        else
          return res
            .status(201)
            .json({
              message: {
                msgBody: "Account successfully created",
                msgError: false,
              },
            });
      });
    }
  });
});

module.exports = router;
