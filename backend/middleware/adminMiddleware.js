const adminMiddleware = (req, res, next) => {

    try{
        if (req.userRole !== "admin") {
            console.log("only admin can access------------------------------------------------->>>>>>>>>")
            return res.status(403).json({
                success: false,
                message: "Only Admin can access this page"
            });
        }
        next();
    } catch (error) {
        console.log("error is here: ", error)
        return res.status(401).json({
            success: false,
            message: "error"
        });
    }

};

export default adminMiddleware;