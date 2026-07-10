import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please Upload Resume",
      });
    }

    const resume = req.file;
    const user = await User.findById(req.userId);
    console.log("resume.path:", resume.path);
    console.log("File exists:", fs.existsSync(resume.path));
    console.log("Current cwd:", process.cwd());

    // Delete old Resume
    if (user.resumePublicId) {
      await cloudinary.uploader.destroy(user.resumePublicId, {
        resource_type: "raw",
      });
    }

    const result = await cloudinary.uploader.upload(resume.path, {
      folder: "Temporary-Student-Resume",
    });

    console.log(result.public_id);
    console.log(result.resource_type);
    console.log(result.format);

    // user.resume = result.secure_url;
    user.resume = result.secure_url.replace("/upload/", "/upload/f_auto/");
    user.resumePublicId = result.public_id;

    await user.save();

    await fs.promises.unlink(resume.path);

    res.status(200).json({
      success: true,
      message: "Resume Uploaded Successfully",
      resume: user.resume,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user.resumePublicId) {
      return res.status(404).json({
        success: false,
        message: "Resume Not Found",
      });
    }

    await cloudinary.uploader.destroy(user.resumePublicId, {
      resource_type: "raw",
    });

    user.resume = "";
    user.resumePublicId = "";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Resume Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
