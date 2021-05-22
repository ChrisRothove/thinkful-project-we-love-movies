const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritics = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function list() {
  return knex("movies").select("*");
}

function listShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true });
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function listShowingTheaters(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("*")
    .where({ "mt.movie_id": movieId });
}

function listReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .join("movies as m", "r.movie_id", "m.movie_id")
    .select("m.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then((entries) => entries.map((entry) => addCritics(entry)));
}

module.exports = {
  list,
  listShowing,
  read,
  listShowingTheaters,
  listReviews,
};
