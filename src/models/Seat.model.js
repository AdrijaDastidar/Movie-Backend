import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema({
    showTimeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShowTime",
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ["normal", "executive", "premium"]
    },
    seatNumber:{
        type: String,
        required : true,
    },
    booked:{
        type: Boolean
    }
});

export default mongoose.model('Seat', SeatSchema);