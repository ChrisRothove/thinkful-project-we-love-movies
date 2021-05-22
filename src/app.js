if (process.env.USER) require("dotenv").config();
const express = require("express");
const moviesRouter = require("../src/route_movies/movies.router");
const reviewsRouter = require("../src/route_reviews/reviews.router");
const theatersRouter = require("../src/route_theaters/theaters.router");
const notFound = require("../src/errors/notFound");
const wentWrong = require("../src/errors/wentWrong");

const app = express();

app.use(express.json());

app.use("/movies", moviesRouter);

app.use("/reviews", reviewsRouter);

app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(wentWrong);

module.exports = app;
