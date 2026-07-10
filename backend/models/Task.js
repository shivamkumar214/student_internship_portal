import mongoose from "mongoose";
import User from "./User.js";

const taskSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    deadline: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending"
    }

}, {    timestamps: true    });

const Task = mongoose.model("Task", taskSchema);

export default Task;