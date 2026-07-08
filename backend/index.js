import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

const app = express();

import connectDB from "./config/db.js";
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
);

app.get("/", (req, res) => {
  res.send("<h1>Student Internship Portal</h1>");
});
app.use("/api/auth", authRoutes);
router.post("/signup" , signup);
app.use("/api/profile", profileRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/progress", progressRoutes);

app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
});


const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
