const express = require("express");
const app = express();
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const cors = require("cors");
const multer = require("multer");
const storage = require("./src/config/multer");
const config = require("./src/config/config");
const invalidRequest = require("./src/controllers/error.controllers");
const { blog, auth, user, formula1 } = require("./src/routes");
const { loggerConsole } = require("./src/loggers/config");
require("./src/config/db");

if (!cluster.isWorker) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", () => {
    loggerConsole.info("Pid process has terminated:", process.pid);
  });
} else {
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(multer({ storage }).single("image"));

  app.use("/api/auth", auth);
  app.use("/api/user", user);
  app.use("/api/blog", blog);
  app.use("/api/formula1", formula1);
  app.use(invalidRequest);
  app.listen(config.port, () => {
    loggerConsole.info("Server successfully running on port");
  });
}
