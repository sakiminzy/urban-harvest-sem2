import app from "./app.js";
import { initializeFirebase } from "./config/firebase.js";

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    initializeFirebase();

    app.listen(port, () => {
      console.log(`Urban Harvest Hub API running on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
