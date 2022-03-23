const user = require("../services/user.services");
require("dotenv").config();
const errorHandle = require("../utils/errorHandle");
const signUp = async (req, res) => {
  const { mail, name, lastname, password } = req.body;
  const dataUser = { mail, name, lastname, password };
  try {
    const data = await user.signUp(dataUser, req);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const signUpAdmin = async (req, res) => {
  const passwordAdmin = req.body.adminPassword;
  const { mail, name, lastname, password } = req.body;
  const dataUser = { mail, name, lastname, password };
  try {
    const data = await user.signUpAdmin(passwordAdmin, dataUser, req);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const data = await user.login(mail, password);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const getDataUser = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const data = await user.getDataUser(userId);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const changePassword = async (req, res) => {
  const { id: userId } = req.user;
  const { oldPassword, newPassword } = req.body;
  try {
    const data = await user.changePassword(userId, oldPassword, newPassword);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

const setFavorites = async (req, res) => {
  const { id: userId } = req.user;
  const { articleId } = req.body;
  try {
    const data = await user.setFavorites(userId, articleId);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

module.exports = {
  signUp,
  signUpAdmin,
  login,
  getDataUser,
  setFavorites,
  changePassword,
};
