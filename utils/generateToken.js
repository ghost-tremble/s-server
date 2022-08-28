const config = require("../config");
const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id
    },
    config.secret,
    {
      expiresIn: "1hr",
      algorithm: "HS256"
      // expires in 1 hour
    }
  );
  return token;
};

module.exports = generateToken;
