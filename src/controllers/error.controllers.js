const inValidRequest = (req, res) => {
  return res.json({
    error: {
      name: "Error",
      status: 404,
      message: "Invalid Request",
      statusCode: 404,
      stack: `${req.originalUrl}`,
    },
  });
};
module.exports = inValidRequest;
