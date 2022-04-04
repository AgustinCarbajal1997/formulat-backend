const mongoose = require("mongoose");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const slugify = require("slugify");
const mongoosePaginate = require("mongoose-paginate-v2");
const constructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  public_id: String,
  firstDriver: {
    type: String,
    required: true,
  },
  secondDriver: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  wins: {
    type: String,
    required: true,
    default: "0",
  },
  championships: {
    type: String,
    required: true,
    default: "0",
  },
  driverChampionships: {
    type: String,
    required: true,
    default: "0",
  },
  teamPrincipal: {
    type: String,
    required: true,
  },
  descriptionMarkdown: {
    type: String,
    required: true,
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

constructorSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name + "-" + Date.now(), {
      lower: true,
      strict: true,
    });
  }
  if (this.descriptionMarkdown) {
    this.sanitizedHtml = dompurify.sanitize(
      marked.parse(this.descriptionMarkdown)
    );
  }

  next();
});

constructorSchema.set("toJSON", {
  transform: (document, returnObject) => {
    (returnObject.id = returnObject._id),
      delete returnObject._id,
      delete returnObject.__v;
    delete returnObject.password;
  },
});
constructorSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Constructor", constructorSchema);
