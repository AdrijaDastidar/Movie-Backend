import express from 'express';
const movieRouter = express.Router();

import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../controllers/movie.controllers.js';
import { authenticateAdmin } from "../middlewares/admin.middleware.js";

movieRouter.get('/', getMovies);
movieRouter.get('/:id', getMovieById);
movieRouter.post('/create',authenticateAdmin , createMovie);
movieRouter.put('/:id', updateMovie);
movieRouter.delete('/:id', deleteMovie);


export default movieRouter;