import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    seatId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    addOn: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "addon"
    },
    cost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default : "Pending"
    }
});

export default mongoose.model('Booking', BookingSchema);