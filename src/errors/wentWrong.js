function wentWrong (err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).send({ error: message });
};

module.exports = wentWrong;