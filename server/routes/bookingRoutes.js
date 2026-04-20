import express from "express";
import {
  createBooking,
  getBookings,
} from "../controllers/bookingController.js";
import { validateBooking } from "../middleware/validateRequest.js";

const router = express.Router();

router.route("/").get(getBookings).post(validateBooking, createBooking);

export default router;
