var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var generalServices = require("../../Services/generalServices");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var bcrypt = require('bcrypt');

const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var messages = require('../messages.json');


var UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: String,
  password: String,
  role: Number,
  imageUrl: String,
  token: String,
  codeforJWT: String,
  language: String,
  isEmailVerified: Boolean,
  profileImg: String,
  timeZone: Number,
  country: String,
}, { timestamps: true });


UserSchema.methods.setUser = function (user) {
  this.fullName = user.fullName;
  this.email = user.email;
  this.phoneNumber = user.phoneNumber;
  this.password = bcrypt.hashSync(user.password, salt);
  this.role = user.role
  this.language = user.language;
  this.imageUrl = user.imageUrl;
  var randomid = generalServices.makeRandomId();
  console.log("random_id: " + randomid);
  this.codeforJWT = randomid;
  this.isEmailVerified = user.isEmailVerified;
  this.token = User.generateJWT(this);
  this.profileImg = user.profileImg;
  this.timeZone = user.timeZone;
  this.country = user.country;
}


UserSchema.statics.generateJWT = function (user) {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  console.log("_id:" + user._id);
  return jwt.sign({
    id: user._id,
    codeforJWT: user.codeforJWT
  },"9LRnqXTG${W[=");
};


UserSchema.statics.getCurrentUser = async function (id) {
  var user = await User.findOne({ "_id": id });
  if (!user) {
    console.log("user doesn't exist");
    // this method shld throw an error.
    return null;
  }
  else {
    return user;
  }
}



var User = mongoose.model('users', UserSchema, 'users');
module.exports = User;
