import Movie from "../models/Movie.model.js";
import { authenticateAdmin } from "../middlewares/admin.middleware.js";

//* Route to get all movies | GET | "movie/"
export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    if (!movies.length) {
      return res.status(404).json({ message: "No movies found." });
    }
    res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
};

//* Route to get a single movie | GET | "movie/:id"
export const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }
    res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
};

//* Route to create a new movie | POST | "movie/create"
export const createMovie = async (req, res, next) => {
  const { title,releaseDate, genre, posterUrl, rating, description } = req.body;
  
  if (!title || !releaseDate || !genre || !posterUrl ||!rating ||!description) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const movie = new Movie({ ...req.body });
  try {
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    return next(error);
  }
};

//* Route to update a movie | PUT | "movie/:id"
export const updateMovie = async (req, res, next) => {
  const { id } = req.params;
  const updatedMovie = req.body;

  try {
    const movie = await Movie.findByIdAndUpdate(id, updatedMovie, { new: true });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }
    res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
};

//* Route to delete a movie | DELETE | "movie/:id"
export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }
    res.status(200).json({ message: "Movie deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete movie." });
  }
};
