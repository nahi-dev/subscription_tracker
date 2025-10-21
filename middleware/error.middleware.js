const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    // Log to console for dev
    console.log(error);
    // Mongoose bad ObjectId
    if (error.name === "CastError") {
      const message = `Resource not found with id of ${err.value}`;
      error = new Error(message);
      error.statusCode = 404;
    }
    // Mongoose duplicate key
    if (error.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }
    // Mongoose validation error
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((val) => val.message)
        .join(", ");
      error = new Error(message);
      error.statusCode = 400;
    }
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  } catch (error) {
    next(error);
  }
};
export default errorMiddleware;
// Create a subscription -> middleware(check for renewal date) -> middleware(check for errors) -> next -> controller
