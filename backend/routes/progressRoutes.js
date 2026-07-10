import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import { completeTask, getProgress } from "../controllers/progressController.js";

const router = express.Router();

// router.post("/start", authMiddleware, startTask);
router.put("/complete/:taskId", authMiddleware, completeTask);
router.get("/", authMiddleware, getProgress);

export default router;