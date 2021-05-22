const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**~~~~~~~~~~~~~~~~MIDDLEWARE~~~~~~~~~~~~~~~*/

async function idIsValid(req, res, next) {
  const id = req.params.reviewId;
  const foundIt = await service.read(id);
  if (foundIt) {
    res.locals.foundReview = foundIt;
    res.locals.review_id = id;
    next();
  } else {
    next({
      status: 404,
      message: "Review cannot be found",
    });
  }
}

/**~~~~~~~~~~~~~~~~ENDPOINTS~~~~~~~~~~~~~~~*/

async function destroy(req, res, next) {
  await service.destroy(res.locals.review_id);
  res.sendStatus(204);
}

async function update(req, res, next) {
  const newReview = { ...res.locals.foundReview, ...req.body.data };
  await service.update(newReview);
  const returnData = await service.readWithCritics(
    res.locals.foundReview.review_id
  );
  res.json({ data: returnData });
}

module.exports = {
  delete: [asyncErrorBoundary(idIsValid), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(idIsValid), asyncErrorBoundary(update)],
};
