const adminMiddleware = (req, res, next) => {

    if (req.userRole !== "admin") {
        console.log("only admin can access------------------------------------------------->>>>>>>>>")
        return res.status(403).json({
            success: false,
            message: "Only Admin can access this page"
        });
    }
    next();
};

export default adminMiddleware;