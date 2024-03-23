const jwt = require("jsonwebtoken");
const { User } = require("../model/User");

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: "Login error" });
    jwt.verify(token, "secretKey", (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Login error" })
        } else {
            User.findById(decoded.userId).exec().then(data => {
                if (data) {
                    req.user = decoded;
                    next();
                } else {
                    return res.status(401).json({ success: false, message: "User not found" })
                }
            })
        }
    })
}

module.exports = authenticateToken;