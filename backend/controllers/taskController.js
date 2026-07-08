import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    try {
        // const tasks = await Task.find().sort({ createdAt: -1 });
        const tasks = await Task.find().sort({ deadline: 1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};