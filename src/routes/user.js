const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controllers");
const auth = require("../controllers/auth.controllers");
const {
  validateSetFavorites,
  validateChangePassword,
} = require("../validators/users");
router
  .get("/getDataUser", auth.authVerification, user.getDataUser)
  .post(
    "/setFavorites",
    validateSetFavorites,
    auth.authVerification,
    user.setFavorites
  )
  .put(
    "/changePassword",
    validateChangePassword,
    auth.authVerification,
    user.changePassword
  );

module.exports = router;
