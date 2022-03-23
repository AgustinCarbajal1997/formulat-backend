const {
  userDao,
  constructorsDao,
  commentDao,
  driverDao,
  blogDao,
} = require("./subClassesDAO");
class Factory {
  models(model) {
    if (model === "blog") return blogDao;
    if (model === "driver") return driverDao;
    if (model === "user") return userDao;
    if (model === "comment") return commentDao;
    if (model === "constructor") return constructorsDao;
  }
}
const factory = new Factory();
module.exports = factory;
