const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**~~~~~~~~~~~~~~~~ENDPOINTS~~~~~~~~~~~~~~~*/

async function list(req, res, next) {
  const data = await service.list();
  res.send({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
