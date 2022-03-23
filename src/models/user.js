const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate-v2");
const userSchema = new Schema({
  mail: {
    type: String,
    index: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  permits: {
    type: String,
    required: true,
    default: "user",
  },
  articles: {
    type: Array,
    default: [],
  },
  favorites: {
    type: Array,
    default: [],
  },
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((error) => next(error));
});

userSchema.set("toJSON", {
  transform: (document, returnObject) => {
    (returnObject.id = returnObject._id),
      delete returnObject._id,
      delete returnObject.__v;
    delete returnObject.password;
  },
});

userSchema.plugin(mongoosePaginate);
const User = new model("User", userSchema);
module.exports = User;
