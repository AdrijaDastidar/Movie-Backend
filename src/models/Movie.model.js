import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    id :{
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    director: {
        type: String,
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
    },
    actors: {
        type: [String],
    },
    posterUrl: {
        type : String,
        required: true
    },
    admin :{
        type: String,
        required: true
    }
});

export default mongoose.model('Movie', movieSchema);