import Task from "../models/Task.js";
import Progress from "../models/Progress.js";

export const getAllTasks = async (req, res) => {
  try {
    console.log("taskCOntroller.js", req.userId);
    const tasks = await Task.find({
      userId: req.userId,
    }).sort({
      deadline: 1,
    });
    console.log("after");

    const progress = await Progress.find({
      userId: req.userId,
    });

    const updatedTasks = tasks.map((task) => {
      const taskProgress = progress.find(
        (p) => p.taskId.toString() === task._id.toString(),
      );
      console.log("before return");

      return {
        ...task._doc,
        status: taskProgress ? taskProgress.status : "Pending",
      };
    });
    console.log("count : ", tasks.length, " And ", updatedTasks);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks: updatedTasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
