import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema({
    theaterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theater",
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ["normal", "executive", "premium"]
    },
    booked:{
        type: Boolean
    }
});

export default mongoose.model('Seat', SeatSchema);