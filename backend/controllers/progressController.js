// export const startTask = async (req, res) => {
//     try {
//         const { taskId } = req.body;

//         const task = await Task.findById(taskId);
//         if (!task) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Task Not Found"
//             });
//         }

//         const alreadyStarted = await Progress.findOne({
//             userId: req.userId,
//             taskId
//         });

//         if (alreadyStarted) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Task Already Started"
//             });
//         }

//         const progress = await Progress.create({
//             userId: req.userId,
//             taskId
//         });

//         res.status(201).json({
//             success: true,
//             message: "Task Started Successfully",
//             progress
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

import Progress from "../models/Progress.js";
import Task from "../models/Task.js";

export const completeTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.taskId,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }

    const progress = await Progress.findOne({
      userId: req.userId,
      taskId: req.params.taskId,
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }

    progress.status = "Completed";
    progress.completedAt = new Date();
    await progress.save();

    res.status(200).json({
      success: true,
      message: "Task Completed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      userId: req.userId,
    }).populate("taskId");

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
