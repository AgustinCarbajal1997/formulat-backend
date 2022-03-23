const { buildCheckFunction } = require("express-validator");
const check = buildCheckFunction(["body", "query", "params"]);
const { validateResult } = require("../utils/validateResult");
const validateGetAllNews = [
  check("page").escape(),
  check("limit").escape(),
  check("pagination").escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];

const validateSetHighlights = [
  check("articleId", "Bad request. Insert a valid articleId.")
    .exists()
    .not()
    .isEmpty()
    .escape(),
  check("page").escape(),
  check("limit").escape(),
  check("pagination").escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validateGetNewsBySlug = [
  check("slug", "Bad request. Insert a valid slug.")
    .exists()
    .not()
    .isEmpty()
    .escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validateObtainSeveralIds = [
  check("ids", "Bad request. Insert an array of valid ids.")
    .exists()
    .not()
    .isEmpty()
    .isArray({ min: 1 }),
  check("page").escape(),
  check("limit").escape(),
  check("pagination").escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validatePostNews = [
  check("title", "Bad request. Insert string.")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .custom((value, { req }) => {
      if (!req.file) throw new Error("Article Img is required");
      return true;
    }),
  check("creditImage", "Bad request. Insert string.")
    .exists()
    .not()
    .isEmpty()
    .isString(),
  check("description", "Bad request. Insert string.")
    .exists()
    .not()
    .isEmpty()
    .isString(),
  check("markdown", "Bad request.").exists().not().isEmpty(), //DOM purify validation in pre save in model
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validatePostLikeNews = [
  check("articleId", "Bad request. Insert an articleId.")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validatePutNews = [
  check("id", "Insert an articleId param")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape()
    .custom((value, { req }) => {
      if (!req.file) throw new Error("Article Img is required");
      return true;
    }),
  check("title", "Bad request. Insert string.")
    .exists()
    .not()
    .isEmpty()
    .isString(),
  check("creditImage", "Bad request. Insert string.")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape(),
  check("description", "Bad request. Insert string.")
    .exists()
    .not()
    .isEmpty()
    .isString(),
  check("markdown", "Bad request.").exists().not().isEmpty(), //DOM purify validation in pre save in model
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validateDeleteNews = [
  check("id", "Insert an articleId param").exists().not().isEmpty().escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validatepostComment = [
  check("comment", "Insert a valid comment")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape(),
  check("articleId", "Insert a valid articleId")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validatePostLikeComment = [
  check("commentId", "Insert a valid commentId")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validateGetComments = [
  check("ids", "Insert a valid array of comments ids").exists(),
  check("page").escape(),
  check("limit").escape(),
  check("pagination").escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validateDeleteComments = [
  check("articleId", "Insert a valid articleId")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape(),
  check("commentId", "Insert a valid commentId")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];

const validateGeneralSearch = [
  check("q", "Bad request. Must be an array.").exists().isArray({ min: 1 }),
  check("page").escape(),
  check("limit").escape(),
  check("pagination").escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];

module.exports = {
  validateGetAllNews,
  validateSetHighlights,
  validateGetNewsBySlug,
  validateObtainSeveralIds,
  validateGeneralSearch,
  validatePostNews,
  validatePostLikeNews,
  validatePutNews,
  validateDeleteNews,
  validatepostComment,
  validatePostLikeComment,
  validateGetComments,
  validateDeleteComments,
};
