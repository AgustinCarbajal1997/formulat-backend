const log4js = require("log4js");

// logger
log4js.configure({
  appenders: {
    myLoggerConsole: { type: "console" },
    myLoggerFileError: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["myLoggerConsole"], level: "trace" },
    console: { appenders: ["myLoggerConsole"], level: "info" },
    logError: { appenders: ["myLoggerFileError"], level: "error" },
  },
});

const loggerConsole = log4js.getLogger("console");
const loggerError = log4js.getLogger("logError");

module.exports = {
  loggerError,
  loggerConsole,
};
