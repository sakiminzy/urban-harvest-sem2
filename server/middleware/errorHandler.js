function errorHandler(error, request, response, next) {
  console.error(error);

  if (error.code === 6 || error.code === "already-exists") {
    return response.status(409).json({
      success: false,
      message: "A record with that identifier already exists.",
    });
  }

  if (error.code === 5 || error.code === "not-found") {
    return response.status(400).json({
      success: false,
      message: "The requested Firestore document could not be found.",
    });
  }

  response.status(500).json({
    success: false,
    message: error.message || "Server error.",
  });
}

export default errorHandler;
