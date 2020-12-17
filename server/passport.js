const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const jwtStrategy = require("passport-jwt").Strategy;
// const User = require("./models/User");
const User = require("./models/User");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt_token"];
  }
  return token;
};

// Authorizatio with jwt

// Authentication
module.exports = function (passport) {
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

  passport.use(
    new LocalStrategy((email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        // !database error
        if (err) return done(err);
        // !User not found
        if (!user) return done(null, false);

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) return done(err);
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInfo = {
        email: user.email,
      };
      cb(err, userInfo);
    });
  });
};
