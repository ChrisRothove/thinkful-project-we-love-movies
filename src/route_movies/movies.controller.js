const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**~~~~~~~~~~~~~~~~MIDDLEWARE~~~~~~~~~~~~~~~*/

/**function showingIsValid(req, res, next) {
  console.log(req.query.is_showing);
  if (req.query.is_showing === "true") {
    res.locals.isShowing = true;
  } else {
    res.locals.isShowing = false;
  }
  next();
}*/

async function idIsValid(req, res, next) {
  const id = req.params.movieId;
  const foundMovie = await service.read(id);
  if (foundMovie) {
    res.locals.movieId = id;
    res.locals.foundMovie = foundMovie;
    next();
  } else {
    next({
      status: 404,
      message: "Movie cannot be found.",
    });
  }
}

/**~~~~~~~~~~~~~~~~ENDPOINTS~~~~~~~~~~~~~~~*/

async function list(req, res, next) {
  if (req.query.is_showing) {
    res.send({ data: await service.listShowing() });
  } else {
    res.send({ data: await service.list() });
  }
}

async function read(req, res, next) {
  res.send({ data: res.locals.foundMovie });
}

async function listShowings(req, res, next) {
  const data = await service.listShowingTheaters(res.locals.movieId);
  res.send({ data });
}

async function listReviews(req, res, next) {
  const data = await service.listReviews(res.locals.movieId);
  res.send({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(idIsValid), asyncErrorBoundary(read)],
  listShowings: [
    asyncErrorBoundary(idIsValid),
    asyncErrorBoundary(listShowings),
  ],
  listReviews: [asyncErrorBoundary(idIsValid), asyncErrorBoundary(listReviews)],
};
