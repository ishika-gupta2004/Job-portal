const jwt = require("jsonwebtoken");

const protect = (req, resp, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return resp.status(401).json({
                message: "not authorized, token missing",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;
        next();

    } catch (err) {
        return resp.status(401).json({
            message: "Not authorized, invalid token",
        });
    }
}
module.exports = protect;