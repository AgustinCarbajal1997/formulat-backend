const express = require("express");
const router = express.Router();
const blog = require("../controllers/blog.controllers");
const auth = require("../controllers/auth.controllers");
const {
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
} = require("../validators/blog");
router
  .get("/getAllNews", validateGetAllNews, blog.getAllNews)
  .get("/getHighlights",validateGetAllNews, blog.getHighlights)
  .get(
    "/setHighlights/:articleId",
    validateSetHighlights,
    auth.authVerification,
    auth.authAdmin,
    blog.setHighlights
  )
  .get("/getLatest",validateGetAllNews, blog.getLatest)
  .get("/getNewsBySlug/:slug", validateGetNewsBySlug, blog.getNewsBySlug)
  .get("/generalSearch", validateGeneralSearch, blog.generalSearch)
  .post("/obtainSeveralIds", validateObtainSeveralIds, blog.obtainSeveralIds)
  .post(
    "/postNews",
    validatePostNews,
    auth.authVerification,
    auth.authAdmin,
    blog.postNews
  )
  .post(
    "/postLikeNews",
    validatePostLikeNews,
    auth.authVerification,
    blog.likeNews
  )
  .put(
    "/putNews/:id",
    validatePutNews,
    auth.authVerification,
    auth.authAdmin,
    blog.putNews
  )
  .delete(
    "/deleteNews/:id",
    validateDeleteNews,
    auth.authVerification,
    auth.authAdmin,
    blog.deleteNews
  )
  .post(
    "/postComment",
    validatepostComment,
    auth.authVerification,
    blog.postComment
  )
  .post(
    "/postLikeComment",
    validatePostLikeComment,
    auth.authVerification,
    blog.likeComment
  )
  .post("/getComments", validateGetComments, blog.getComments)
  .put(
    "/deleteCommentbyAdmin",
    validateDeleteComments,
    auth.authVerification,
    auth.authAdmin,
    blog.deleteCommentbyAdmin
  )
  .put(
    "/deleteCommentbyUser",
    validateDeleteComments,
    auth.authVerification,
    blog.deleteCommentbyUser
  );
module.exports = router;
