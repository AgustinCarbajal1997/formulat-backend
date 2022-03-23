const express = require("express");
const router = express.Router();
const formula1 = require("../controllers/formula1.controllers");
const auth = require("../controllers/auth.controllers");
const {
  validateGetF1DataApi,
  validateGetData,
  validateGetDataBySlug,
  validatePostData,
  validatePutData,
  validateDeleteData,
} = require("../validators/formula1Api");
router
  .get("/getF1DataApi/:endPoint", validateGetF1DataApi, formula1.getF1DataApi)
  .get("/getData/:type", validateGetData, formula1.getData)
  .get(
    "/getDataBySlug/:type/:slug",
    validateGetDataBySlug,
    formula1.getDataBySlug
  )
  .post(
    "/postData/:type",
    validatePostData,
    auth.authVerification,
    auth.authAdmin,
    formula1.postData
  )
  .put(
    "/putData/:type/:id",
    validatePutData,
    auth.authVerification,
    auth.authAdmin,
    formula1.putData
  )
  .delete(
    "/deleteData/:type/:id",
    validateDeleteData,
    auth.authVerification,
    auth.authAdmin,
    formula1.deleteData
  );

module.exports = router;
