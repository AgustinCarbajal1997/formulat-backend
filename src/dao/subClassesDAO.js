const ContainerDAO = require("./containerDAO");
const {
  UserModel,
  DriverModel,
  ConstructorModel,
  CommentModel,
  BlogModel,
} = require("../models/index");

class User extends ContainerDAO {
  constructor() {
    if (User.instance) {
      return User.instance;
    }
    super(UserModel);
    User.instance = this;
  }
}
class Driver extends ContainerDAO {
  constructor() {
    if (Driver.instance) {
      return Driver.instance;
    }
    super(DriverModel);
    Driver.instance = this;
  }
}
class Constructors extends ContainerDAO {
  constructor() {
    if (Constructors.instance) {
      return Constructors.instance;
    }
    super(ConstructorModel);
    Constructors.instance = this;
  }
}
class Comment extends ContainerDAO {
  constructor() {
    if (Comment.instance) {
      return Comment.instance;
    }
    super(CommentModel);
    Comment.instance = this;
  }
}
class Blog extends ContainerDAO {
  constructor() {
    if (Blog.instance) {
      return Blog.instance;
    }
    super(BlogModel);
    Blog.instance = this;
  }
}

module.exports = {
  userDao: new User(),
  driverDao: new Driver(),
  constructorsDao: new Constructors(),
  commentDao: new Comment(),
  blogDao: new Blog(),
};
