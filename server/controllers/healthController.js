import mongoose from "mongoose";

function getHealth(request, response) {
  const readyStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  response.status(200).json({
    success: true,
    message: "Urban Harvest Hub API is running.",
    environment: process.env.NODE_ENV || "development",
    database: readyStates[mongoose.connection.readyState] || "unknown",
    timestamp: new Date().toISOString(),
  });
}

export { getHealth };
