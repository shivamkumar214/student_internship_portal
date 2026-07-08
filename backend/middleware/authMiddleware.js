import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        // const token = req.headers.authorization;
        
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Not Found"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};

export default authMiddleware;