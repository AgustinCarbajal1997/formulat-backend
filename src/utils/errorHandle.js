const { loggerError } = require("../loggers/config");
const errorHandle = (res, error) => {
  loggerError.error(
    `Status:${error.status || 500}, message:${
      error.message || "Something gone wrong."
    }`
  );
  return res
    .status(error.status || 500)
    .json({ message: error.message || "Something gone wrong." });
};
module.exports = errorHandle;
