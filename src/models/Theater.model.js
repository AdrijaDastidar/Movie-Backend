import mongoose from "mongoose";
import Seat from "./Seat.model.js"; 

const TheaterSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },
  auditoriumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auditorium", 
    required: true
  },
  seats: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

// Post save hook to create seats after theater creation
TheaterSchema.post("save", async function (theater, next) {
  try {
    const seatEntries = [];
    
    for (let i = 1; i <= 48; i++) {
      let seatType;
      if (i <= 16) {
        seatType = "normal";
      } else if (i <= 40) {
        seatType = "executive";
      } else {
        seatType = "premium";
      }
      
      seatEntries.push({
        theaterId: theater._id, 
        seatNumber: i,
        type: seatType,
        booked: false 
      });
    }

    await Seat.insertMany(seatEntries);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Theater", TheaterSchema);
