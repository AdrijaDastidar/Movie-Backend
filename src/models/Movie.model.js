import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
    },
    posterUrl: {
        type : String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

export default mongoose.model('Movie', movieSchema);