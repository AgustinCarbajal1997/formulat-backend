const { validationResult } = require("express-validator");

const validateResult = (req, res, next, status) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(status || 403);
    res.json({ errors: error.array() });
  }
};

module.exports = { validateResult };
