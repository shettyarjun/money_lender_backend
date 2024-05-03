const constants = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = err.status ? err.status : 500; // Use statusCode instead of err.status
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(400).json({
                message: "Validation Error",
                stack: err.stack,
            });
            break;
        case constants.UNAUTHORIZED:
            res.status(401).json({
                message: "Unauthorized",
                stack: err.stack,
            });
            break;
        case constants.NOT_FOUND:
            res.status(404).json({
                message: "Not Found",
                stack: err.stack,
            });
            break;
        case constants.FORBIDDEN:
            res.status(403).json({
                message: "Forbidden",
                stack: err.stack,
            });
            break;
        case constants.INTERNAL_SERVER_ERROR:
            res.status(500).json({
                message: "Internal Server Error",
                stack: err.stack,
            });
            break;
        default:
            console.log("no error found");
            break;
    }
};

module.exports = errorHandler;
