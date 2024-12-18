import mongoose from "mongoose";
import Seat from "./Seat.model.js"; 

const showTimeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "theater", 
    required: true
  },
  seats: {
    type: String,
    required: true,
    default: 48,
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
showTimeSchema.post("save", async function (theater, next) {
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
        showTimeId: this._id, 
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

export default mongoose.model("showTime", showTimeSchema);
