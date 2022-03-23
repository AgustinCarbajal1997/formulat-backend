const cloudinary = require("cloudinary");
const config = require("./config");
cloudinary.config(config.cloudinary);
module.exports = cloudinary;