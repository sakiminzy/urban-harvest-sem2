import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bookingRoutes from "./routes/bookingRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

dotenv.config();

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (request, response) => {
  response.status(200).json({
    success: true,
    message: "Urban Harvest Hub API root",
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
