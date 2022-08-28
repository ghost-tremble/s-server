
const jwt = require("jsonwebtoken");
const config = require("../config");
const {
  sendError,
  sendInternalServerError,
} = require("../utils/responseHelpers");

async function verifyToken(req, res, next) {
  try {
    const JWTtoken = req.headers["x-access-token"];
    /*****************************************************
     * JWT AUTH CHECK
     * TODO: Make this Authrization: Bearer  ***********
     ****************************************************/
    if (!JWTtoken) {
      return sendError(res, 401, null, {
        auth: false,
        message: "No token provided.",
      });
    }

    jwt.verify(JWTtoken, config.secret, function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return sendError(res, 401, null, {
            auth: false,
            message: "Token is expired!",
            expired: true,
          });
        }
        return sendError(res, 401, null, {
          auth: false,
          message: "Failed to authenticate token.",
        });
      }

      /**TODO: Deprecated! will be removed  */
      req.userId = decoded.id;
      req.user = {
        id: decoded.id,
      };
      return next();
    });
  } catch (error) {
    return sendError(res, 401, null, {
      auth: false,
      message: "Failed to authenticate token.",
    });
  }
}
// const validators = {
//   login: [
//     body("email").isEmail().withMessage("Invalid email"),
//     body("password").notEmpty().withMessage("can't be empty"),
//   ],
// };

const authController = {
  verifyToken,
};
module.exports = authController;
