import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAllTasks } from "../controllers/taskController.js";

const router = express.Router();

// All tasks
router.get("/", authMiddleware, getAllTasks);

export default router;