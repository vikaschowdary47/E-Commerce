const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
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

router.route("/login").post((req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("no user");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("successfull auth");
        console.log(user);
      });
    }
    // console.log(err);
    // req.login(user, { session: false }, (err) => {
    //   if (err) console.log(err);
    //   if (!user) res.send("no user");
    //   console.log("authentication successful", { user });
    // });
    // console.log(user);
    // console.log(req.isAuthenticated());

    // const email = req.body.email;
    // const password = req.body.password;
    // // console.log(email);
    // User.findOne({ email }, (err, user) => {
    //   if (err) res.send("there's an error", err);
    //   if (!user) res.send("no user");
    //   bcrypt.compare(password, user.password, (err, result) => {
    //     if (err) res.send("err");
    //     if (result === true) {
    //       const token = signToken(user._id);
    //       res.cookie("jwt_token", token, { httpOnly: true, sameSite: true });
    //       res.status(200).json({
    //         isAuthenticated: true,
    //         user: { username: user.username, email: user.email },
    //       });
    //       // return res.send("successfully logged in ", {
    //       //   username: user.username,
    //       //   email,
    //       // });
    //     } else {
    //       return res.send("wrong password");
    //     }
    //   });
    // });
    // if (req.isAuthenticated()) {
    //   const { _id, username, email } = req.user;
    //   const token = signToken(_id);
    //   res.cookie("jwt_token", token, { httpOnly: true, sameSite: true });
    //   res
    //     .status(200)
    //     .json({ isAuthenticated: true, user: { username, email } });
    // }
    // if (err) return err;
    // if (!user) return res.status(500).send("No user found and Exists");
    // else {
    //   req.logIn(user, (err) => {
    //     if (err) throw err;
    //     res.send("success");
    //   });
    // }
  })(req, res, next);
});

module.exports = router;
