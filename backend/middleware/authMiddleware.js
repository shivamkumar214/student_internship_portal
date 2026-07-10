import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        console.log("authMiddleware-------------------------------------")
        console.log(req.cookies);
        const token = req.cookies.token
        console.log("token from authMid", token) 
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Not Found"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        
        next();
    } catch (error) {
        console.log("error is here: ", error)
        return res.status(401).json({
            success: false,
            message: "error"
        });
    }
};

export default authMiddleware;