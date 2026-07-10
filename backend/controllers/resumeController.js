import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadResume = async (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please Upload Resume",
      });
    }

    // Find User
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // Delete old resume from Cloudinary
    if (user.resumePublicId) {
      await cloudinary.uploader.destroy(user.resumePublicId, {
        resource_type: "image",
      });
    }

    // Upload new resume
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Temporary-Student-Resume",
      resource_type: "image",
    });

    // Save URL and Public ID
    user.resume = result.secure_url;
    user.resumePublicId = result.public_id;

    await user.save();

    // Delete temporary local file
    if (fs.existsSync(req.file.path)) {
      await fs.promises.unlink(req.file.path);
    }

    return res.status(200).json({
      success: true,
      message: "Resume Uploaded Successfully",
      resume: user.resume,
    });

  } catch (error) {

    // Delete temporary file if exists
    if (req.file && fs.existsSync(req.file.path)) {
      await fs.promises.unlink(req.file.path);
    }

    console.log(error);

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
