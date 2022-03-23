const mongoose = require("mongoose");
const config = require("../config");
const { loggerConsole, loggerError } = require("../../loggers/config");

mongoose
  .connect(config.mongoDb.connectionStr)
  .then(() => loggerConsole.info("Successfull connection to database"))
  .catch((error) =>
  loggerError.error(`Something gone wrong. ${error.message}`)
  );
