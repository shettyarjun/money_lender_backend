const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; //gives the second part of the string within array
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401);
                res.json({ message: "Invalid token" });
            }
            req.user = decoded.user;//here the user object is assigned to the request object
            next();
        });

    }
    if (!token) {
        res.status(401).json({ message: "Token not found" });
    }
});

module.exports = validateTokenHandler;