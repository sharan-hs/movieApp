const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieTitle: String,
  director: String,
  genre: String,
});

const MovieCollection = mongoose.model("MovieCollection", movieSchema);

module.exports = MovieCollection;
