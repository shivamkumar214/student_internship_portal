import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true
    },

    college: {
        type: String,
        required: true
    },

    course: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    resume: {
        type: String,
        default: ""
    },

    resumePublicId: {
        type: String,
        default: ""
    }

}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;