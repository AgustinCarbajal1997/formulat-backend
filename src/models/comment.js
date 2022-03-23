const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

commentSchema.set("toJSON", {
  transform: (document, returnObject) => {
    (returnObject.id = returnObject._id),
      delete returnObject._id,
      delete returnObject.__v,
      delete returnObject.author.articles,
      delete returnObject.author.permits,
      delete returnObject.author.favorites,
      delete returnObject.author.comments,
      delete returnObject.author.password,
      delete returnObject.author.registrationDate;
  },
});
commentSchema.plugin(mongoosePaginate);
const Comment = new model("Comment", commentSchema);

module.exports = Comment;
