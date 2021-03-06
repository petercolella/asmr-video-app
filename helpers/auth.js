var bcrypt = require("bcrypt");
var User = require("../models/user.js");

function createSecure(req, res, next) {
  var password = req.body.password;

  res.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  next();
}

function loginUser(req, res, next) {
  // YOU MIGHT CHANGE EMAIL TO USERNAME IF YOU DON'T WANT TO STORE EMAILS
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email: email })
    .exec()
    .then(function (foundUser) {
      if (foundUser == null) {
        // res.json({status: 401, data: "unauthorized"})
        res.render("error", {
          message: "Oops! You are not allowed to do that.",
          status: 401,
          data: "unauthorized",
        });
      } else if (bcrypt.compareSync(password, foundUser.password_digest)) {
        req.session.currentUser = foundUser;
        console.log(req.session.currentUser);
      }
      next();
    })
    .catch(function (err) {
      // res.json({status: 500, data: err})
      res.render("error", {
        message: "Oops! Something went wrong.",
        status: 500,
        data: err,
      });
    });
}

function authorize(req, res, next) {
  if (!req.session || !req.session.currentUser) {
    console.log("Lost session");
  }

  var currentUser = req.session.currentUser;

  if (
    !currentUser ||
    (currentUser._id !== req.params.id && currentUser._id !== req.params.userId)
  ) {
    // console.log(currentUser.username);
    // console.log(currentUser._id);
    console.log(req.params.id);
    console.log(req.params.userId);
    res.render("error", {
      message: "Oops! You are not allowed to do that.",
      status: 401,
      data: "unauthorized",
    });
    // res.json({status: 401, data: 'unauthorized'});
  } else {
    next();
  }
}

module.exports = {
  createSecure: createSecure,
  loginUser: loginUser,
  authorize: authorize,
};
