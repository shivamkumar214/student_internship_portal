import User from "../models/User.js";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, phone, college, course } = req.body;

        const user = await User.findByIdAndUpdate( req.userId,
            {
                name,
                phone,
                college,
                course
            },
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};