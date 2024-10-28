import Theater from "../models/Theater.model.js";

//* Route to get all theaters | GET | "/theaters/all"
export const getAllTheaters = async (req, res, next) => {
  try {
    const theaters = await Theater.find();
    if (!theaters || theaters.length === 0) {
      return res.status(404).json({ message: "No theaters found." });
    }
    return res.status(200).json({ theaters });
  } catch (error) {
    return next(error);
  }
};

//* Route to get a theater by ID | GET | "/theaters/:id"
export const getTheaterById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const theater = await Theater.findById(id);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found." });
    }
    return res.status(200).json({ theater });
  } catch (error) {
    return next(error);
  }
};

//* Route to create a new theater | POST | "/theaters/create"
export const createTheater = async (req, res, next) => {
  const { name, city, state } = req.body;
  try {
    const newTheater = new Theater({ name, city, state });
    await newTheater.save();

    return res.status(201).json({
      message: "Theater created successfully.",
      theater: {
        id: newTheater._id,
        name: newTheater.name,
        city: newTheater.city,
        state: newTheater.state,
      },
    });
  } catch (error) {
    return next(error);
  }
};

//* Route to update a theater by ID | PUT | "/theaters/:id"
export const updateTheater = async (req, res, next) => {
  const { id } = req.params;
  const { name, city, state } = req.body;

  try {
    const theater = await Theater.findByIdAndUpdate(
      id,
      { name, city, state },
      { new: true } // Return the updated document
    );

    if (!theater) {
      return res.status(404).json({ message: "Theater not found." });
    }

    return res.status(200).json({
      message: "Theater updated successfully.",
      theater,
    });
  } catch (error) {
    return next(error);
  }
};

//* Route to delete a theater by ID | DELETE | "/theaters/:id"
export const deleteTheater = async (req, res, next) => {
  const { id } = req.params;

  try {
    const theater = await Theater.findByIdAndDelete(id);

    if (!theater) {
      return res.status(404).json({ message: "Theater not found." });
    }

    return res.status(200).json({
      message: "Theater deleted successfully.",
    });
  } catch (error) {
    return next(error);
  }
};
