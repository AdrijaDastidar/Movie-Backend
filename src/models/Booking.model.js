import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    TheaterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theater",
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    addOn: {
        type: [String],
    },
    cost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Booking', BookingSchema);