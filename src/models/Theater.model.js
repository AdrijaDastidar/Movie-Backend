import mongoose, { Types } from "mongoose";
const theaterSchema = new mongoose.Schema({
  name:{
    Types: String,
  },
  city:{
    Types: String,
  },
  State:{
    Types: String,
  }
});

export default mongoose.model('Theater', theaterSchema);