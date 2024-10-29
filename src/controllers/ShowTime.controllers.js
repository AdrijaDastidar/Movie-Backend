import showTime from "../models/ShowTime.model.js";

//* Route to get all showTime | GET | "/showTime/all"
export const getshowTime = async (req, res, next) => {
  try {
    const showTimeData = await showTime.find();

    if (!showTimeData.length) {
      return res.status(404).json({ message: "No showTime found." });
    }

    return res.status(200).json({ showTime: showTimeData });
  } catch (error) {
    return next(error);
  }
};

//* Route to get a showTime by ID | GET | "/showTime/:id"
export const getshowTimeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const showTimeData = await showTime.findById(id);

    if (!showTimeData) {
      return res.status(404).json({ message: "showTime not found." });
    }

    return res.status(200).json({ showTime: showTimeData });
  } catch (error) {
    return next(error);
  }
};

//* Route to create a new showTime | POST | "/showTime/create"
export const createshowTime = async (req, res, next) => {
  const { movieId, seats, date, time, theaterId } = req.body;

  try {
    const newshowTime = new showTime({ 
      movieId, 
      seats, 
      date, 
      time, 
      theaterId, 
    });
    await newshowTime.save();

    return res.status(201).json({
      message: "showTime created successfully.",
      showTime: {
        id: newshowTime._id,
        movieId: newshowTime.movieId,
        time: newshowTime.time,
        theaterId: newshowTime.theaterId,
        date: newshowTime.date,
        seats: newshowTime.seats,
      },
    });
  } catch (error) {
    return next(error);
  }
};

//* Route to update a showTime by ID | PUT | "/showTime/:id"
export const updateshowTime = async (req, res, next) => {
  const { id } = req.params;
  const { movieId, seats, date, time, theaterId } = req.body;

  try {
    const updatedShowTime = await showTime.findByIdAndUpdate(
      id,
      { movieId, seats, date, time, theaterId },
      { new: true, runValidators: true } 
    );

    if (!updatedShowTime) {
      return res.status(404).json({ message: "showTime not found." });
    }

    return res.status(200).json({
      message: "showTime updated successfully.",
      showTime: updatedShowTime,
    });
  } catch (error) {
    return next(error);
  }
};

//* Route to delete a showTime by ID | DELETE | "/showTime/:id"
export const deleteshowTime = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedShowTime = await showTime.findByIdAndDelete(id);

    if (!deletedShowTime) {
      return res.status(404).json({ message: "showTime not found." });
    }

    return res.status(200).json({
      message: "showTime deleted successfully.",
      showTime: deletedShowTime,
    });
  } catch (error) {
    return next(error);
  }
};
