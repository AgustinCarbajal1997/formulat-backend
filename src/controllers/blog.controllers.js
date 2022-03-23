const Blog = require("../services/blog.services");
const errorHandle = require("../utils/errorHandle");
const getAllNews = async (req, res) => {
  const { page, limit, pagination } = req.query;
  try {
    const data = await Blog.getAllNews(
      page || 1,
      limit || 3,
      pagination || false
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const getHighlights = async (req, res) => {
  const { page, limit, pagination } = req.query;
  try {
    const data = await Blog.getHighlights(
      page || 1,
      limit || 3,
      pagination || false
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};
const setHighlights = async (req, res) => {
  const { page, limit, pagination } = req.query;
  const { articleId } = req.params;
  try {
    if (!articleId)
      throw { status: 400, message: "Bad request. Introduce an articleId." };
    const data = await Blog.setHighlights(
      articleId,
      page || 1,
      limit || 3,
      pagination || false
    );
    return res.status(data.status).json(data);
  } catch (error) {
    console.log(error);
    errorHandle(res, error);
  }
};
const getLatest = async (req, res) => {
  const { page, limit, pagination } = req.query;
  try {
    const data = await Blog.getLatest(
      page || 1,
      limit || 3,
      pagination || false
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const getNewsBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const data = await Blog.getNewsBySlug(slug);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const generalSearch = async (req, res) => {
  let { q, page, limit, pagination } = req.query;
  try {
    const data = await Blog.generalSearch(
      q,
      page || 1,
      limit || 10,
      pagination || false
    );
    return res.status(200).json({ data });
  } catch (error) {
    errorHandle(res, error);
  }
};

const obtainSeveralIds = async (req, res) => {
  const { page, limit, pagination } = req.query;
  const { ids } = req.body;
  try {
    const data = await Blog.obtainSeveralIds(
      ids,
      page || 1,
      limit || 12,
      pagination || false
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};
const postNews = async (req, res) => {
  const { title, creditImage, description, markdown } = req.body;
  try {
    const article = { title, creditImage, description, markdown };
    const data = await Blog.postNews(article, req.file);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};
const likeNews = async (req, res) => {
  const { id: userId } = req.user;
  const { articleId } = req.body;
  try {
    const data = await Blog.likeNews(userId, articleId);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};
const putNews = async (req, res) => {
  const { title, creditImage, description, markdown } = req.body;
  const { id } = req.params;
  try {
    const data = await Blog.putNews(
      id,
      {
        title,
        creditImage,
        description,
        markdown,
      },
      req.file
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Blog.deleteNews(id);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const getComments = async (req, res) => {
  const { page, limit, pagination } = req.query;
  const { ids } = req.body;
  try {
    const data = await Blog.getComments(
      ids,
      page || 1,
      limit || 3,
      pagination || false
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const postComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { comment, articleId } = req.body;
    const data = await Blog.postComment(comment, articleId, userId);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};
const likeComment = async (req, res) => {
  const { id: userId } = req.user;
  const { commentId } = req.body;
  try {
    const data = await Blog.likeComment(userId, commentId);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};
const deleteCommentbyAdmin = async (req, res) => {
  const { articleId, commentId } = req.body;
  const { permits } = req.user;
  try {
    const data = await Blog.deleteCommentbyAdmin(permits, articleId, commentId);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const deleteCommentbyUser = async (req, res) => {
  const { articleId, commentId } = req.body;
  const userId = req.user.id;
  try {
    const data = await Blog.deleteCommentbyUser(userId, articleId, commentId);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};
module.exports = {
  getAllNews,
  getHighlights,
  setHighlights,
  getLatest,
  getNewsBySlug,
  generalSearch,
  obtainSeveralIds,
  postNews,
  likeNews,
  putNews,
  deleteNews,
  postComment,
  likeComment,
  getComments,
  deleteCommentbyAdmin,
  deleteCommentbyUser,
};
