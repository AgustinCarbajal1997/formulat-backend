const REGULAR_EXPRESSIONS = require("./regex_validations");
const formValidation = (dataUser) => {
  let validationErrors = 0;
  const validationFields = Object.keys(dataUser).reduce((ac, item) => {
    const regex = dataUser[item]
      ? REGULAR_EXPRESSIONS[item][0].test(dataUser[item])
      : false;
    if (!regex) validationErrors++;
    return {
      ...ac,
      [item]: [
        regex,
        regex ? "Successful validation." : REGULAR_EXPRESSIONS[item][1],
      ],
    };
  }, {});
  return { validationErrors, validationFields };
};

module.exports = formValidation;