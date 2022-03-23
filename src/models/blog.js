const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const mongoosePaginate = require("mongoose-paginate-v2");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  public_id: String,
  likes: {
    type: Array,
    default: [],
  },
  visits: {
    type: Number,
    default: 0,
  },
  creditImage:{
    type:String,
    required:true
  },
  description: {
    type: String,
    required: true,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    default: [],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

blogSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title + "-" + Date.now(), {
      lower: true,
      strict: true,
    });
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
  }

  next();
});
blogSchema.set("toJSON", {
  transform: (document, returnObject) => {
    (returnObject.id = returnObject._id),
      delete returnObject._id,
      delete returnObject.__v;
    delete returnObject.password;
  },
});
blogSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Blog", blogSchema);
