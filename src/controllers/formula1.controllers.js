const formula1 = require("../services/formula1.services");
const errorHandle = require("../utils/errorHandle");
const getF1DataApi = async (req, res) => {
  const { endPoint } = req.params;
  try {
    const data = await formula1.getF1DataApi(endPoint);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error)
  }
};

const getData = async (req, res) => {
  const { page, limit, pagination } = req.query;
  const { type } = req.params;
  try {
    let data = await formula1.getData(
      type,
      page || 1,
      limit || 20,
      pagination || false
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error)
  }
};

const getDataBySlug = async (req, res) => {
  const { type, slug } = req.params;
  try {
    let data = await formula1.getDataBySlug(type, slug);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error)
  }
};

const postData = async (req, res) => {
  const { type } = req.params;
  const {
    name,
    team,
    carNumber,
    country,
    nationality,
    wins,
    championships,
    birthDate,
    descriptionMarkdown,
    firstDriver,
    secondDriver,
    teamPrincipal,
  } = req.body;
  try {
    const data = await formula1.postData(
      type,
      {
        name,
        team,
        carNumber,
        country,
        nationality,
        wins,
        championships,
        birthDate,
        descriptionMarkdown,
        firstDriver,
        secondDriver,
        teamPrincipal,
      },
      req.file
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error)
  }
};
const putData = async (req, res) => {
  const { type, id } = req.params;
  const {
    name,
    team,
    carNumber,
    country,
    nationality,
    wins,
    championships,
    birthDate,
    descriptionMarkdown,
    firstDriver,
    secondDriver,
    teamPrincipal,
  } = req.body;
  try {
    const data = await formula1.putData(
      type,
      id,
      {
        name,
        team,
        carNumber,
        country,
        nationality,
        wins,
        championships,
        birthDate,
        descriptionMarkdown,
        firstDriver,
        secondDriver,
        teamPrincipal,
      },
      req.file
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error)
  }
};

const deleteData = async (req, res) => {
  const { page, limit, pagination } = req.query;
  const { type, id } = req.params;
  try {
    const data = await formula1.deleteData(
      type,
      id,
      page || 1,
      limit || 20,
      pagination || false
    );
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error)
  }
};

module.exports = {
  getF1DataApi,
  getData,
  getDataBySlug,
  postData,
  putData,
  deleteData,
};
