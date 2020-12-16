const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");

const hashedPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
const secret = process.env.JWT_SECRET;

const signToken = (id) => {
  return JWT.sign(
    {
      iss: "admin",
      sub: id,
    },
    secret,
    { expiresIn: "1h" }
  );
};

router.post("/register", async (req, res) => {
  const { username, email } = req.body;
  const password = await hashedPassword(req.body.password);

  User.findOne({ email }, (err, user) => {
    if (err)
      return res.status(500).json({
        message: { msgBody: `Error has occured ${err}`, msgError: true },
      });
    if (user)
      return res.status(500).json({
        message: { msgBody: "Email is already registered", msgError: true },
      });
    else {
      const newUser = new User({ username, email, password });
      newUser.save((err) => {
        if (err)
          return res.status(500).json({
            message: {
              msgBody: `Error has occured while creating account ${err.message}`,
              msgError: true,
            },
          });
        else
          return res.status(201).json({
            message: {
              msgBody: "Account successfully created",
              msgError: false,
            },
          });
      });
    }
  });
});

// login route

// router.post(
//   "/login",
//   passport.authenticate("local", { session: false }),
//   (req, res) => {
//     if (req.isAuthenticated()) {
//       const { _id, username, email } = req.user;
//       const token = signToken(_id);
//       res.cookie("jwt_token", token, { httpOnly: true, sameSite: true });
//       res
//         .status(200)
//         .json({ isAuthenticated: true, user: { username, email } });
//     }
//     if (err) {
//       res.send(err);
//     }
//   }
// );

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    // let email = req.body.email;
    // console.log(User.findOne({ email }), (err, user) => {
    //   if (err) return err;
    //   if (user) return user;
    // });
    // console.log(username, email);
    if (req.isAuthenticated()) {
      const { _id, username, email } = req.user;
      const token = signToken(_id);
      res.cookie("jwt_token", token, { httpOnly: true, sameSite: true });
      res
        .status(200)
        .json({ isAuthenticated: true, user: { username, email } });
    }
    if (err) return err;
    if (!user) return res.status(500).send("No user Exists");
  })(req, res, next);
});

module.exports = router;
