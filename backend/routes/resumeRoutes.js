import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { uploadResume, deleteResume } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/upload", authMiddleware, uploadResume);
router.delete("/delete", authMiddleware, deleteResume);

export default router;