import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.userId,
    }).sort({
      deadline: 1,
    });;

    const progress = await Progress.find({
      userId: req.userId,
    });

    const updatedTasks = tasks.map((task) => {
      const taskProgress = progress.find(
        (p) => p.taskId.toString() === task._id.toString(),
      );

      return {
        ...task._doc,
        status: taskProgress ? taskProgress.status : "Pending",
      };
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks:updatedTasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
