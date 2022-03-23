const { buildCheckFunction } = require("express-validator");
const check = buildCheckFunction(["body", "query", "params"]);
const { validateResult } = require("../utils/validateResult");
const END_POINTS = require("../utils/urls_f1_public_api");
const MODELS = {
  pilotos: "driver",
  equipos: "constructor",
};
const validateGetF1DataApi = [
  check("endPoint")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape()
    .custom((value) => {
      if (value in END_POINTS === false) {
        throw new Error("Endpoint does not exist");
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next, 404);
  },
];

const validateGetData = [
  check("type")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape()
    .custom((value) => {
      if (value in MODELS === false) {
        throw new Error("Type does not exist");
      }
      return true;
    }),
  check("page").escape(),
  check("limit").escape(),
  check("pagination").escape(),
  (req, res, next) => {
    validateResult(req, res, next, 404);
  },
];

const validateGetDataBySlug = [
  check("type")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape()
    .custom((value) => {
      if (value in MODELS === false) {
        throw new Error("Type does not exist");
      }
      return true;
    }),
  check("slug").exists().not().isEmpty().isString().escape(),
  (req, res, next) => {
    validateResult(req, res, next, 404);
  },
];
const validatePostData = [
  check("type")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape()
    .custom((value) => {
      if (value in MODELS === false) {
        throw new Error("Type does not exist");
      }
      return true;
    }),
  check("name")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image required");
      }
      return true;
    }),
  check("country").exists().not().isEmpty().isString(),
  check("nationality").exists().not().isEmpty().isString(),
  check("wins").exists().not().isEmpty().isString(),
  check("championships").exists().not().isEmpty().isString(),
  check("descriptionMarkdown").exists().not().isEmpty(), //DOM purify validation in model
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validatePutData = [
  check("type")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape()
    .custom((value) => {
      if (value in MODELS === false) {
        throw new Error("Type does not exist");
      }
      return true;
    }),
  check("id").exists().not().isEmpty().isString().escape(),
  check("name")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image required");
      }
      return true;
    }),
  check("country").exists().not().isEmpty().isString(),
  check("nationality").exists().not().isEmpty().isString(),
  check("wins").exists().not().isEmpty().isString(),
  check("championships").exists().not().isEmpty().isString(),
  check("descriptionMarkdown").exists().not().isEmpty(), //DOM purify validation in model
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];

const validateDeleteData = [
  check("type")
    .exists()
    .not()
    .isEmpty()
    .isString()
    .escape()
    .custom((value) => {
      if (value in MODELS === false) {
        throw new Error("Type does not exist");
      }
      return true;
    }),
  check("id").exists().not().isEmpty().isString().escape(),
  check("page").escape(),
  check("limit").escape(),
  check("pagination").escape(),
  (req, res, next) => {
    validateResult(req, res, next, 404);
  },
];

module.exports = {
  validateGetF1DataApi,
  validateGetData,
  validateGetDataBySlug,
  validatePostData,
  validatePutData,
  validateDeleteData,
};
