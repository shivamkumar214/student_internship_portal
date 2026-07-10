import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import { getAllUsers, getSingleUser, assignTask, getUserProgress, getDashboard } from "../controllers/adminController.js";

const router = express.Router();

// Get all students
router.get( "/users", authMiddleware, adminMiddleware, getAllUsers);

// Get single student
router.get( "/user/:id",
    authMiddleware,
    adminMiddleware,
    getSingleUser
);

// assign task
router.post( "/assign-task/:id",
    authMiddleware,
    adminMiddleware,
    assignTask
);

// Get student progress tasks
router.get( "/progress/:id",
    authMiddleware,
    adminMiddleware,
    getUserProgress
);

router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    getDashboard
);

export default router;