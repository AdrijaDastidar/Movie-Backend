import Booking from "../models/Booking.model.js";

// Route to get all bookings for the authenticated user | GET | "/booking"
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    return res.status(200).json({ bookings });
  } catch (error) {
    return next(error);
  }
};

// Route to get a specific booking by its id | GET | "/booking/:id"
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    return res.status(200).json({ booking });
  } catch (error) {
    return next(error);
  }
};

// Route to create a new booking | POST | "/booking"
export const createBooking = async (req, res, next) => {
    const { showTimeId, seatNumber, addOn, cost } = req.body;
  
    if (!showTimeId || !addOn || !cost || !seatNumber) {
      return res.status(400).json({ message: "Missing required fields." });
    }
  
    try {
      const booking = new Booking({
        showTimeId: showTimeId,
        addOn: addOn,
        cost: cost,
        userId: req.user.id ,
        seatNumber: seatNumber
      });
  
      await booking.save();
      res.status(201).json(booking);
    } catch (error) {
      return next(error);
    }
};

// Route to get all bookings for a user | GET | "/booking/user"
export const getUserBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ userId });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    return res.status(200).json({ bookings });
  } catch (error) {
    return next(error);
  }
};
