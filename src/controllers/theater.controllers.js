import Theater from "../models/Theater.model.js";

//* Route to get all theaters | GET | "/theater/all"
export const getTheaters = async (req, res, next) => {
  try {
    const theaters = await Theater.find()

    if (!theaters) {
      return res.status(404).json({ message: "No theaters found." });
    }

    return res.status(200).json({ theaters });
  } catch (error) {
    return next(error);
  }
};

//* Route to get a theater by ID | GET | "/theater/:id"
export const getTheaterById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const theater = await Theater.findById(id)

    if (!theater) {
      return res.status(404).json({ message: "Theater not found." });
    }

    return res.status(200).json({ theater });
  } catch (error) {
    return next(error);
  }
};

//* Route to create a new theater | POST | "/theater/create"
export const createTheater = async (req, res, next) => {
  const { movieId, seats, date, time, auditoriumId } = req.body;

  try {
    const newTheater = new Theater({ movieId, seats, date, time, auditoriumId, adminId: req.adminId });
    await newTheater.save();

    return res.status(201).json({
      message: "Theater created successfully.",
      theater: {
        id: newTheater._id,
        movieId: newTheater.movieId,
        time: newTheater.time,
        auditoriumId: newTheater.auditoriumId,
        date: newTheater.date,
        seats: newTheater.seats,
        adminId: newTheater.adminId,
      },
    });
  } catch (error) {
    return next(error);
  }
};
