const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controllers");
const auth = require("../controllers/auth.controllers");
const { validateSignUp, validateLogin } = require("../validators/users");
router
  .post("/signUp", validateSignUp, user.signUp)
  .post("/signUpAdmin", auth.authVerification, auth.authAdmin, user.signUpAdmin)
  .post("/login", validateLogin, user.login);

module.exports = router;
