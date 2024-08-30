const express = require("express");
const mongoose = require("mongoose");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Parse JSON request bodies

const db = require("../backend/db/db");
const Movie = require("../backend/models/movies.models");

app.use(express());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  res.json("Welcome Express!");
});

async function getMovies() {
  try {
    const moviesList = await Movie.find();
    return moviesList;
  } catch (error) {
    throw error;
  }
}
app.get("/movies", async (req, res) => {
  try {
    const movies = await getMovies();
    if (movies) {
      res.json(movies);
    } else {
      res.status(404).json({ message: "No Movies Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function createMovie(newMovie) {
  try {
    const movie = new Movie(newMovie);
    const savedMovie = await movie.save();
    return savedMovie;
  } catch (error) {
    throw error;
  }
}

app.post("/movies", async (req, res) => {
  try {
    const newMovie = await createMovie(req.body);
    if (newMovie) {
      res
        .status(201)
        .json({ message: "Movie Added successfully!", movie: newMovie });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function deleteMovie(movieId) {
  try {
    const movieDeleted = await Movie.findByIdAndDelete(movieId);
    return movieDeleted;
  } catch (error) {
    throw error;
  }
}

app.delete("/movies/:movieId", async (req, res) => {
  try {
    const deletedMovie = await deleteMovie(req.params.movieId);
    if (deletedMovie) {
      res
        .status(201)
        .json({ message: "Movie deleted Successfully!", movie: deletedMovie });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function editMovie(movieId, dataToBeUpdated) {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      dataToBeUpdated,
      { new: true }
    );
    return updatedMovie;
  } catch (error) {
    throw error;
  }
}

app.put("/movies/update/:movieId", async (req, res) => {
  try {
    const dataToBeUpdated = req.body;

    const updatedMovie = await editMovie(req.params.movieId, dataToBeUpdated);
    if (updatedMovie) {
      res
        .status(201)
        .json({ message: "Movie Updated Successfully!", movie: updatedMovie });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3030;

app.listen(PORT, () => {
  console.log("App is running on port", PORT);
});
