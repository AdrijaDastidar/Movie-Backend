import showTime from "../models/ShowTime.model.js";

//* Route to get all showTime | GET | "/showTime/all"
export const getshowTime = async (req, res, next) => {
  try {
    const showTime = await showTime.find()

    if (!showTime) {
      return res.status(404).json({ message: "No showTime found." });
    }

    return res.status(200).json({ showTime });
  } catch (error) {
    return next(error);
  }
};

//* Route to get a showTime by ID | GET | "/showTime/:id"
export const getshowTimeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const showTime = await showTime.findById(id)

    if (!showTime) {
      return res.status(404).json({ message: "showTime not found." });
    }

    return res.status(200).json({ showTime });
  } catch (error) {
    return next(error);
  }
};

//* Route to create a new showTime | POST | "/showTime/create"
export const createshowTime = async (req, res, next) => {
  const { movieId, seats, date, time, auditoriumId } = req.body;

  try {
    const newshowTime = new showTime({ movieId, seats, date, time, auditoriumId, adminId: req.adminId });
    await newshowTime.save();

    return res.status(201).json({
      message: "showTime created successfully.",
      showTime: {
        id: newshowTime._id,
        movieId: newshowTime.movieId,
        time: newshowTime.time,
        auditoriumId: newshowTime.auditoriumId,
        date: newshowTime.date,
        seats: newshowTime.seats,
        adminId: newshowTime.adminId,
      },
    });
  } catch (error) {
    return next(error);
  }
};
