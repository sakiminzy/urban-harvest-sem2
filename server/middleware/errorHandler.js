function errorHandler(error, request, response, next) {
  console.error(error);

  if (error.name === "ValidationError") {
    return response.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: Object.values(error.errors).map((item) => item.message),
    });
  }

  if (error.code === 11000) {
    return response.status(409).json({
      success: false,
      message: "A record with that unique value already exists.",
    });
  }

  if (error.name === "CastError") {
    return response.status(400).json({
      success: false,
      message: "Invalid resource identifier.",
    });
  }

  response.status(500).json({
    success: false,
    message: error.message || "Server error.",
  });
}

export default errorHandler;
