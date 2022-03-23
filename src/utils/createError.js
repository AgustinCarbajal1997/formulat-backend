const createError = (status, message) => {
  return {
    status,
    message,
  };
};
module.exports = createError;
