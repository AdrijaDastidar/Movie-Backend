import Movie from "../models/Movie.model.js";

//* Route to get all movies | GET | "movie/"
export const getMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
  } catch (error) {
    return next(error);
  }
  if (!movies) {
    return res.status(404).json({ message: "No movies found." });
  }
  res.status(200).json(movies);
};

//* Route to get a single movie | GET | "movie/:id"
export const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({ id: req.params.id });
    
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
  if (
    !req.body.title ||
    !req.body.releaseDate ||
    !req.body.genre ||
    !req.body.id ||
    !req.body.posterUrl
  ) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  const existingMovie = await Movie.findOne({ id: req.body.id });
  if (existingMovie) {
    return res
      .status(400)
      .json({ message: "A movie with the same id already exists." });
  }
  const movie = new Movie(req.body);
  try {
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    return next(error);
  }
};

//* Route to update a movie | POST | "movie/:id"
 export const updateMovie = async (req, res, next) => {
  const { id } = req.params;
  const updatedMovie = req.body;

  try {
    const movie = await Movie.findOneAndUpdate({id}, updatedMovie, { new: true });
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

    try{
        const movie = await Movie.findOneAndDelete({id});
        if(!movie){
            return res.status(404).json({message: "Movie not found."});
        }
        res.status(200).json({message: "Movie deleted successfully."});
    }
    catch(error){
        return res.status(500).json({message: "Failed to delete movie."});
    }
};