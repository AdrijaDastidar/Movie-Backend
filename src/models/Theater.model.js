import mongoose, { Types } from "mongoose";
const theaterSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  city:{
    type: String,
  },
  state:{
    type: String,
  }
});

export default mongoose.model('Theater', theaterSchema);