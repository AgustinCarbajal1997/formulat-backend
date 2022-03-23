const { check } = require("express-validator");
const { validateResult } = require("../utils/validateResult");
const validateSignUp = [
  check("mail")
    .exists()
    .not()
    .isEmpty()
    .isEmail({ blacklisted_chars: ["<", ">", "&", "'", '"', "/"] })
    .trim()
    .escape(),
  check("name").exists().not().isEmpty().isString().trim().escape(),
  check("lastname").exists().not().isEmpty().isString().trim().escape(),
  check(
    "password",
    "Validation error: Please, introduce a valid password. Minimum eight characters, at least one letter and one number"
  )
    .exists()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .isLength({ min: 8 }),
  check("confirmPassword")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match.");
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];

const validateLogin = [
  check("mail")
    .exists()
    .not()
    .isEmpty()
    .isEmail({ blacklisted_chars: ["<", ">", "&", "'", '"', "/"] })
    .trim()
    .escape(),
  check(
    "password",
    "Validation error: Please, introduce a valid password. Minimum eight characters, at least one letter and one number"
  )
    .exists()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .isLength({ min: 8 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateSetFavorites = [
  check("articleId").exists().not().isEmpty().escape(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateChangePassword = [
  check(
    "oldPassword",
    "Validation error: Please, introduce a valid password. Minimum eight characters, at least one letter and one number"
  )
    .exists()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .isLength({ min: 8 }),
  check(
    "newPassword",
    "Validation error: Please, introduce a valid password. Minimum eight characters, at least one letter and one number"
  )
    .exists()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .isLength({ min: 8 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateSignUp,
  validateLogin,
  validateSetFavorites,
  validateChangePassword,
};
