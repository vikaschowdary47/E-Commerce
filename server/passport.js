const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const jwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies("jwt_token");
  }
  return token;
};

// Authorizatio with jwt
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

// Authentication
passport.use(
  new LocalStrategy(
    // { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      await User.findOne({ email }, (err, user) => {
        // !database error
        if (err) return done(err);
        // !User not found
        if (!user) return done(null, false);
        // console.log("user");
        // checking password
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) return done(err);
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    }
  )
);

// passport.use(
//   new LocalStrategy(
//     // {
//     //   usernameField: "email",
//     //   passwordField: "password",
//     // },
//     function (email, password, cb) {
//       //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//       return UserModel.findOne({ email, password })
//         .then((user) => {
//           if (!user) {
//             return cb(null, false, { message: "Incorrect email or password." });
//           }
//           return cb(null, user, { message: "Logged In Successfully" });
//         })
//         .catch((err) => cb(err));
//     }
//   )
// );
