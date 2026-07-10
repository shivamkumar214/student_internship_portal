import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { uploadResume, deleteResume } from "../controllers/resumeController.js";

const router = express.Router();

// router.post("/upload", authMiddleware, uploadResume);
import upload from "../middleware/multer.js";

router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);
router.delete("/delete", authMiddleware, deleteResume);

export default router;