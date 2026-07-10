import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },

    status: {
        type: String,
        enum: ["In Progress", "Completed"],
        default: "In Progress"
    },

    startedAt: {
        type: Date,
        default: Date.now
    },

    completedAt: {
        type: Date,
        default: null
    }

}, {    timestamps: true    });

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;