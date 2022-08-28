var mongoose = require("mongoose");

var User = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    balance: {type:Number,default:0},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phonenumber: { type: String,},
  },
  { timestamps: true }
);
mongoose.Promise = Promise;
module.exports = mongoose.model("User", User);
