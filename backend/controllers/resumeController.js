import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadResume = async (req, res) => {
    try {
        if (!req.files || !req.files.resume) {
            return res.status(400).json({
                success: false,
                message: "Please Upload Resume"
            });
        }

        const resume = req.files.resume;

        const user = await User.findById(req.userId);

        // Delete Old Resume
        if (user.resumePublicId) {
            await cloudinary.uploader.destroy( user.resumePublicId,
                {
                    resource_type: "raw"
                }
            );
        }

        const result = await cloudinary.uploader.upload(
            resume.tempFilePath,
            {
                folder: "Temporary-Student-Resume",
                resource_type: "raw"
            }
        );

        user.resume = result.secure_url;
        user.resumePublicId = result.public_id;

        await user.save();

        await fs.promises.unlink(resume.tempFilePath);

        res.status(200).json({
            success: true,
            message: "Resume Uploaded Successfully",
            resume: user.resume
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteResume = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user.resumePublicId) {
            return res.status(404).json({
                success: false,
                message: "Resume Not Found"
            });
        }

        await cloudinary.uploader.destroy( user.resumePublicId,
            {
                resource_type: "raw"
            }
        );

        user.resume = "";
        user.resumePublicId = "";

        await user.save();

        res.status(200).json({
            success: true,
            message: "Resume Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};