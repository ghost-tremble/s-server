const router = require("express").Router();

const { verifyToken } = require("../controllers/auth");

const {
  userLogin,
  userSignUp,
  getUserData,
  deposit,
} = require("../controllers/allControllers");

router.route("/login").post(userLogin);
router.route("/signup").post(userSignUp);


router
  .route("/get-user")
  .get(verifyToken,getUserData);

  router.route("/deposit").post(verifyToken, deposit);

  
module.exports = router;
