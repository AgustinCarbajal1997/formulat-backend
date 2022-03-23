const bcrypt = require("bcrypt");
const token = require("../controllers/auth.controllers");
const Factory = require("../dao/factory.js");
require("dotenv").config();

const signUp = async (dataUser, req) => {
  try {
    const data = await validateSignUp(dataUser, req);
    return data;
  } catch (error) {
    throw error;
  }
};

const signUpAdmin = async (passwordAdmin, dataUser, req) => {
  try {
    if (passwordAdmin !== process.env.KEY_ADMIN)
      throw { status: 403, message: "Contraseña incorrecta." };
    req.permits = "admin";
    const data = await validateSignUp(dataUser, req);
    return data;
  } catch (error) {
    throw error;
  }
};

const validateSignUp = async (dataUser, req) => {
  try {
    const existUser = await Factory.models("user").getOne({
      mail: dataUser.mail,
    });
    if (existUser.data) throw { status: 403, message: "Mail already exists" };
    const permits = req.permits || "user";
    let newUser = await Factory.models("user").save({ ...dataUser, permits });
    return {
      status: 201,
      message: "Successfully registered",
      dataUser: newUser.data,
      access_token: token.generateToken({
        id: newUser.data.id,
        permits: newUser.data.permits,
      }),
    };
  } catch (error) {
    throw error;
  }
};

const login = async (mail, password) => {
  try {
    let data = await Factory.models("user").getOne({ mail });
    if (!data.data)
      throw { status: 403, message: "Incorrect user or passsword" };
    const match = await bcrypt.compare(password, data.data.password);
    if (!match) throw { status: 403, message: "Incorrect user or passsword" };
    return {
      status: 200,
      message: "Successful login",
      dataUser: data.data,
      access_token: token.generateToken({
        id: data.data.id,
        permits: data.data.permits,
      }),
    };
  } catch (error) {
    throw error;
  }
};

const getDataUser = async (userId) => {
  try {
    const data = await Factory.models("user").getById(userId);
    return data;
  } catch (error) {
    throw error;
  }
};

const setFavorites = async (userId, articleId) => {
  try {
    const existsId = await Factory.models("blog").getById(articleId);
    if (!existsId) throw { status: 404, message: "Article ID doesn't exist." };
    const queryAddUpdate = {
      $push: {
        favorites: articleId,
      },
    };
    const queryDeleteUpdate = {
      $pull: {
        favorites: articleId,
      },
    };
    const currentFavorites = await Factory.models("user").getById(userId);
    const existsFav = currentFavorites.data.favorites.find(
      (item) => item === articleId
    );
    let update;
    existsFav
      ? (update = await Factory.models("user").updateById(
          userId,
          queryDeleteUpdate
        ))
      : (update = await Factory.models("user").updateById(
          userId,
          queryAddUpdate
        ));
    return update;
  } catch (error) {
    throw error;
  }
};

const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    let data = await Factory.models("user").getById(userId);
    const match = await bcrypt.compare(oldPassword, data.data.password);
    if (!match) throw { status: 403, message: "Incorrect user or passsword" };
    const hash = await bcrypt.hash(newPassword, 10);
    await Factory.models("user").updateById(userId, {
      $set: { password: hash },
    });
    return {
      status: 200,
      message: "Password successfully updated",
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  signUp,
  signUpAdmin,
  getDataUser,
  setFavorites,
  changePassword,
};
