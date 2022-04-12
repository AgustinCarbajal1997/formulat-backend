const cloudinary = require("../config/cloudinary");
const Factory = require("../dao/factory");
const fs = require("fs-extra");
const sanitizeString = require("string-sanitizer");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const getAllNews = async (page, limit, pagination) => {
  try {
    const options = {
      page,
      limit,
      pagination,
      sort: { createdAt: -1 },
    };
    const data = await Factory.models("blog").getAll(options);
    return data;
  } catch (error) {
    throw error;
  }
};
const getHighlights = async (page, limit, pagination) => {
  try {
    const options = {
      page,
      limit,
      pagination,
      sort: { createdAt: -1 },
    };
    const data = await Factory.models("blog").getByQuery(
      { highlight: true },
      options
    );
    return data;
  } catch (error) {
    throw error;
  }
};
const setHighlights = async (articleId, page, limit, pagination) => {
  try {
    const options = {
      page,
      limit,
      pagination,
      sort: { createdAt: -1 },
    };
    const articleToUpdate = await Factory.models("blog").getById(articleId);
    const isHighlighted = articleToUpdate.data.highlight;
    await Factory.models("blog").updateById(articleId, {
      $set: { highlight: !isHighlighted },
    });
    const data = await Factory.models("blog").getAll(options);
    return data;
  } catch (error) {
    throw error;
  }
};
const getLatest = async (page, limit, pagination) => {
  try {
    const options = {
      page,
      limit,
      pagination,
      sort: { createdAt: -1 },
    };
    const data = await Factory.models("blog").getByQuery(
      { highlight: false },
      options
    );
    return data;
  } catch (error) {
    throw error;
  }
};
const getNewsBySlug = async (slug) => {
  try {
    const data = await Factory.models("blog").updateOne(
      { slug },
      { $inc: { visits: 1 } }
    );
    if (!data.data)
      throw { status: 404, message: "The article doesn't exist." };
    return data;
  } catch (error) {
    throw error;
  }
};

const generalSearch = async (q, page, limit, pagination) => {
  try {
    let querySanitized = q.map((item) => sanitizeString.sanitize(item));
    const regexList = querySanitized.map((item) => new RegExp(`${item}`, "i"));
    const query = {
      title: { $all: regexList },
    };
    const data = await Factory.models("blog").getByQuery(query, {
      page,
      limit,
      pagination,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const obtainSeveralIds = async (ids, page, limit, pagination) => {
  try {
    let querySanitized = ids.map((item) => sanitizeString.sanitize(item));
    const options = {
      page,
      limit,
      pagination,
      sort: { createdAt: -1 },
    };
    const data = await Factory.models("blog").getByQuery(
      { _id: { $in: querySanitized } },
      options
    );
    return data;
  } catch (error) {
    throw error;
  }
};
const postNews = async (article, image) => {
  try {
    const imageUploaded = await cloudinary.v2.uploader.upload(image.path);
    const data = await Factory.models("blog").save({
      ...article,
      image: imageUploaded.secure_url,
      public_id: imageUploaded.public_id,
    });
    await fs.unlink(image.path);
    return data;
  } catch (error) {
    throw error;
  }
};
const likeNews = async (userId, articleId) => {
  try {
    const existsId = await Factory.models("blog").getById(articleId);
    if (!existsId) throw { status: 404, message: "Comment ID doesn't exist." };
    const queryAddUpdate = {
      $push: {
        likes: userId,
      },
    };
    const queryDeleteUpdate = {
      $pull: {
        likes: userId,
      },
    };
    const existsLike = existsId.data.likes.find((item) => item === userId);
    let update;
    existsLike
      ? (update = await Factory.models("blog").updateById(
          articleId,
          queryDeleteUpdate
        ))
      : (update = await Factory.models("blog").updateById(
          articleId,
          queryAddUpdate
        ));
    return update;
  } catch (error) {
    throw error;
  }
};
const putNews = async (id, article, image) => {
  if (article.markdown) {
    article.sanitizedHtml = dompurify.sanitize(marked.parse(article.markdown));
  }
  try {
    const deleteImage = await Factory.models("blog").getById(id);
    await cloudinary.v2.uploader.destroy(deleteImage.data.public_id);
    const imageUploaded = await cloudinary.v2.uploader.upload(image.path);
    const query = {
      ...article,
      image: imageUploaded.secure_url,
      public_id: imageUploaded.public_id,
    };
    const data = await Factory.models("blog").updateById(id, query);
    await fs.unlink(image.path);
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteNews = async (id) => {
  try {
    const deleteImage = await Factory.models("blog").getById(id);
    await cloudinary.v2.uploader.destroy(deleteImage.data.public_id);
    const data = await Factory.models("blog").deleteById(id);
    return data;
  } catch (error) {
    throw error;
  }
};

const getComments = async (ids, page, limit, pagination) => {
  try {
    let querySanitized = ids.map((item) => sanitizeString.sanitize(item));
    const options = {
      page,
      limit,
      pagination,
      sort: { createdAt: -1 },
      populate: "author",
    };
    const query = { _id: { $in: querySanitized } };
    const data = await Factory.models("comment").getByQuery(query, options);
    return data;
  } catch (error) {
    throw error;
  }
};

const postComment = async (comment, articleId, userId) => {
  try {
    const articleExist = await Factory.models("blog").getById(articleId);
    if (!articleExist) throw { status: 404, message: "Article doesn't exist" };
    const newComment = await Factory.models("comment").save({
      comment,
      author: userId,
    });
    const query = {
      $push: { comments: newComment.data._id },
    };
    await Factory.models("user").updateById(userId, query);
    await Factory.models("blog").updateById(articleId, query);
    const newCommentData = await Factory.models("comment").getOne(
      {
        _id: newComment.data._id,
      },
      "author"
    );
    return newCommentData;
  } catch (error) {
    throw error;
  }
};

const likeComment = async (userId, commentId) => {
  try {
    const existsId = await Factory.models("comment").getById(commentId);
    if (!existsId) throw { status: 404, message: "Comment ID doesn't exist." };
    const queryAddUpdate = {
      $push: {
        likes: userId,
      },
    };
    const queryDeleteUpdate = {
      $pull: {
        likes: userId,
      },
    };
    const existsLike = existsId.data.likes.find((item) => item === userId);
    let update;
    existsLike
      ? (update = await Factory.models("comment").updateById(
          commentId,
          queryDeleteUpdate,
          "author"
        ))
      : (update = await Factory.models("comment").updateById(
          commentId,
          queryAddUpdate,
          "author"
        ));
    return update;
  } catch (error) {
    throw error;
  }
};

const deleteCommentbyAdmin = async (permits, articleId, commentId) => {
  try {
    if (!permits === "admin")
      throw {
        status: 401,
        message: "Not authorized to delete comments as admin",
      };
    const dataComment = await Factory.models("comment").getById(
      commentId,
      "author"
    );
    await Factory.models("comment").deleteById(commentId);
    const queryUpdate = {
      $pull: { comments: dataComment.data.id },
    };
    await Factory.models("user").updateById(
      dataComment.data.author.id,
      queryUpdate
    );
    const updateArticle = Factory.models("blog").updateById(
      articleId,
      queryUpdate
    );
    return updateArticle;
  } catch (error) {
    throw error;
  }
};

const deleteCommentbyUser = async (userId, articleId, commentId) => {
  try {
    const dataComment = await Factory.models("comment").getById(
      commentId,
      "author"
    );
    if (dataComment.data.author.id !== userId)
      throw {
        status: 401,
        message: "Not authorized to delete other people comments",
      };
    await Factory.models("comment").deleteById(commentId);
    const queryUpdate = {
      $pull: { comments: dataComment.data.id },
    };
    await Factory.models("user").updateById(userId, queryUpdate);
    const updateArticle = Factory.models("blog").updateById(
      articleId,
      queryUpdate
    );
    return updateArticle;
  } catch (error) {
    throw error;
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
  getComments,
  postComment,
  likeComment,
  deleteCommentbyAdmin,
  deleteCommentbyUser,
};
