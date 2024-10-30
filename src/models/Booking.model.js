import mongoose from "mongoose";
import SeatModel from "./Seat.model.js";

const BookingSchema = new mongoose.Schema({
    showTimeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "showTime",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    addOn: {
        type: Array,
    },
    seatNumber: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    }
});

BookingSchema.pre("save", async function (next) {
    try {
        // Find seat by showTimeId and seatNumber
        const seat = await SeatModel.findOne({ 
            showTimeId: this.showTimeId, 
            seatNumber: this.seatNumber 
        });
        
        if (!seat) {
            throw new Error("Seat not found");
        }
        
        if (seat.booked) {
            throw new Error("Seat is already booked");
        }

        // Mark the seat as booked
        seat.booked = true;
        await seat.save();

        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model("Booking", BookingSchema);
