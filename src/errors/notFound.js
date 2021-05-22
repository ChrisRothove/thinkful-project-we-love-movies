module.exports = (req, res, next) => {
  next({
    status: 404,
    message: `Not found: ${req.originalUrl}`,
  });
};
