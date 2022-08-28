const generateToken = require("../utils/generateToken");

const {
  sendError,
  sendData,
  sendCustomError,
  sendInternalServerError,
} = require("../utils/responseHelpers");

const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { Number } = require("mongoose");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return sendError(res, 401, { message: "username or password incorrect" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return sendError(res, 401, { message: "username or password incorrect" });
    }
    const token = generateToken({ email: user.email, _id: user._id });

    return sendData(res, 200, {
      email: req.body.email,
      token,
    });
  } catch (error) {
    return sendError(res, 500, error);
  }
};

const userSignUp = async (req, res) => {
  try {
    
    const { email, password,firstname,lastname } = req.body;
   
    const userExist = await User.findOne({ email });
    if (userExist) {
      return sendError(res, 409, { message: "user already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(password, salt);
  

    const newUser = await User.create({
      email,
      password: passwordHash,
    lastname,
    firstname
    });
    await newUser.save();

    sendData(res, 200, {
      message: "accout created successfully",
      user: newUser.email,
    });
  } catch (error) {
    console.log(error)
    return sendCustomError(res, { message: "account creation failed" });
  }
};

const getUserData  = async (req,res) =>{
  
  try{
   const {id} = req.user;
    const userData = await User.findOne({ _id:id },{password:0});
  if(!userData){
    sendError(res,404,{
      message:"user does not exist"
    })
  }
    sendData(res, 200, {
      ...userData.toObject()
    });
  }
   catch (error) {
    return sendCustomError(res, { message: error.message });
  }
  
}


const deposit = async (req,res) => {
  try {
    const { id } = req.user;
    const {amount} = req.body
    const userData = await User.findOne({_id:id});
     if (!userData) {
       sendError(res, 404, {
         message: "user does not exist",
       });
     }
    //  let userBalance =userData?.balance
     let amountToAdd = parseInt(amount)
     console.log(amountToAdd)
     let upDatedBalance= amountToAdd;
   
   
    console.log(typeof upDatedBalance)
    const newBalance = await User.findOneAndUpdate(
      { _id: id },
      { balance:amountToAdd + userData.balance},
      {
        new: true,
        upsert: true,
      }
    );
    console.log(newBalance)
   
   
    sendData(res, 200, {
   newBalance:newBalance.balance
    });
  } catch (error) {
    console.log(error)
    return sendCustomError(res, { message: error.message });
  }
};







module.exports = {
  userLogin,
  userSignUp,
  getUserData,
  deposit

};
