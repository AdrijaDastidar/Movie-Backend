import mongoose from "mongoose";
import validator from "validator";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("email is invalid");
            }
          },
        
    },
    password: {
        type: String,
        required: true
    },
});

export default mongoose.model("Admin", adminSchema);
