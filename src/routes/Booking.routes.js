import express from 'express';
import { createBooking, getAllBookings, getBookingById } from '../controllers/booking.controllers.js';
import {authenticateUser } from '../middlewares/user.middleware.js';
const bookingrouter = express.Router();

bookingrouter.get('/',authenticateUser, getAllBookings);
bookingrouter.get('/:id', getBookingById); 
bookingrouter.post('/create', authenticateUser, createBooking); 

export default bookingrouter;