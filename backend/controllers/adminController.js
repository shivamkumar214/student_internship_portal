import User from "../models/User.js";
import Task from "../models/Task.js";
import Progress from "../models/Progress.js";

export const getAllUsers = async (req, res) => {
  try {
    console.log("getAllUsers")
    const users = await User.find({
      role: "student",
    }).select("-password");
    console.log("users: ", users, " users lenght", users.length)

    res.status(200).json({
      success: true,
      totalStudents: users.length,
      users,
    });
  } catch (error) {
    console.log(" error in getAllUsers")
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }
    if (user.role !== "student") {
      return res.status(400).json({
        success: false,
        message: "Invalid Student",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const assignTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;

    if (!title || !description || !deadline) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    const task = await Task.create({
      userId: user._id,
      title,
      description,
      deadline,
    });
    await Progress.create({
      userId: user._id,
      taskId: task._id,
    });

    res.status(201).json({
      success: true,
      message: "Task Assigned Successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.params.id }).populate(
      "taskId",
    );

    res.status(200).json({
      success: true,
      count: progress.length,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboard = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({
            role: "student"
        });

        const totalTasks = await Task.countDocuments();

        const completedTasks = await Progress.countDocuments({
            status: "Completed"
        });

        const pendingTasks = await Progress.countDocuments({
            status: "In Progress"
        });

        res.status(200).json({
            success: true,
            totalStudents,
            totalTasks,
            completedTasks,
            pendingTasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};