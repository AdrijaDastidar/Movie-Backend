import express from 'express';
const movieRouter = express.Router();

import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../controllers/movie.controllers.js';

movieRouter.get('/', getMovies);
movieRouter.get('/:id', getMovieById);
movieRouter.post('/create', createMovie);
movieRouter.post('/update/:id', updateMovie);
movieRouter.delete('/delete/:id', deleteMovie);


export default movieRouter;