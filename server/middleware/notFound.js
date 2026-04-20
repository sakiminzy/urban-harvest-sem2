function notFound(request, response) {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.originalUrl}`,
  });
}

export default notFound;
