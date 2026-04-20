import { db } from "../config/firebase.js";

async function getHealth(request, response, next) {
  try {
    await db.collection("items").limit(1).get();

    response.status(200).json({
      success: true,
      message: "Urban Harvest Hub API is running.",
      environment: process.env.NODE_ENV || "development",
      database: "connected",
      databaseType: "cloud-firestore",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
}

export { getHealth };
