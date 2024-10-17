import express from 'express';
const movieRouter = express.Router();

import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../controllers/movie.controllers.js';

movieRouter.get('/', getMovies);
movieRouter.get('/:id', getMovieById);
movieRouter.post('/create', createMovie);
movieRouter.post('/:id', updateMovie);
movieRouter.delete('/:id', deleteMovie);


export default movieRouter;