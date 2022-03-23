const createError = require("../utils/createError");
class ContainerDao {
  constructor(model) {
    this.model = model;
  }

  async getAll(options) {
    try {
      const data = await this.model.paginate({}, options);
      return {
        status: 200,
        message: "Successfull request",
        data,
      };
    } catch (error) {
      throw createError(500, error.message);
    }
  }
  async getById(id, populate) {
    try {
      const data = await this.model.findById(id).populate(populate || "");
      return {
        status: 200,
        message: "Successfull request",
        data,
      };
    } catch (error) {
      throw createError(500, error.message);
    }
  }
  async getOne(query, populate) {
    try {
      const data = await this.model.findOne(query).populate(populate || "");
      return {
        status: 200,
        message: "Successfull request",
        data,
      };
    } catch (error) {
      throw createError(500, error.message);
    }
  }
  async getByQuery(query, options) {
    try {
      const data = await this.model.paginate(query, options);
      return {
        status: 200,
        message: "Successfull request",
        data,
      };
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async save(newData) {
    try {
      const createModel = new this.model(newData);
      const data = await createModel.save();
      return {
        status: 201,
        message: "Successfull request",
        data,
      };
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async updateById(id, query, populate) {
    try {
      const data = await this.model
        .findByIdAndUpdate(id, query, { new: true })
        .populate(populate || "");
      return {
        status: 201,
        message: "Successfull request",
        data,
      };
    } catch (error) {
      throw createError(500, error.message);
    }
  }
  async updateOne(itemUpdate, query) {
    try {
      const data = await this.model.findOneAndUpdate(itemUpdate, query, {
        new: true,
      });
      return {
        status: 201,
        message: "Successfull request",
        data,
      };
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async deleteById(id) {
    try {
      await this.model.findByIdAndDelete(id);
      return {
        status: 200,
        message: "Successfully deleted",
      };
    } catch (error) {
      throw createError(500, error.message);
    }
  }
}

module.exports = ContainerDao;
