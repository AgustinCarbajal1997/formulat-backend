const Factory = require("../dao/factory");
const END_POINTS = require("../utils/urls_f1_public_api");
const axios = require("axios").default;
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");
const MODELS = {
  pilotos: "driver",
  equipos: "constructor",
};
const getF1DataApi = async (endPoint) => {
  try {
    const response = await axios.get(END_POINTS[endPoint]);
    return {
      status: 200,
      message: "Successful request",
      data: response.data,
    };
  } catch (error) {
    throw error;
  }
};

const getData = async (type, page, limit, pagination) => {
  try {
    const options = {
      page,
      limit,
      pagination,
    };
    let data = await Factory.models(MODELS[type]).getAll(options);
    return data;
  } catch (error) {
    throw error;
  }
};

const getDataBySlug = async (type, slug) => {
  try {
    const data = await Factory.models(MODELS[type]).getOne({ slug });
    return data;
  } catch (error) {
    throw error;
  }
};

const postData = async (type, newData, image) => {
  console.log("newData desde service",newData)
  try {
    const imageUploaded = await cloudinary.v2.uploader.upload(image.path);
    const data = await Factory.models(MODELS[type]).save({
      ...newData,
      image: imageUploaded.secure_url,
      public_id: imageUploaded.public_id,
    });
    await fs.unlink(image.path);
    return data;
  } catch (error) {
    throw error;
  }
};

const putData = async (type, id, newData, image) => {
  try {
    const deleteImage = await Factory.models(MODELS[type]).getById(id);
    await cloudinary.v2.uploader.destroy(deleteImage.data.public_id);
    const imageUploaded = await cloudinary.v2.uploader.upload(image.path);
    const data = await Factory.models(MODELS[type]).updateById(id, {
      ...newData,
      image: imageUploaded.secure_url,
      public_id: imageUploaded.public_id,
    });
    await fs.unlink(image.path);
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteData = async (type, id, page, limit, pagination) => {
  const options = {
    page,
    limit,
    pagination,
    sort: { createdAt: -1 },
  };
  try {
    const deleteImage = await Factory.models(MODELS[type]).getById(id);
    await cloudinary.v2.uploader.destroy(deleteImage.data.public_id);
    await Factory.models(MODELS[type]).deleteById(id);
    const data = await Factory.models(MODELS[type]).getAll(options);
    return data;
  } catch (error) {
    throw error;
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
