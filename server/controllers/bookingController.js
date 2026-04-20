import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Item from "../models/Item.js";

async function getBookings(request, response, next) {
  try {
    const bookings = await Booking.find()
      .populate("itemId", "title slug category type")
      .sort({ createdAt: -1 });

    response.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
}

async function createBooking(request, response, next) {
  try {
    const { itemId } = request.body;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return response.status(400).json({
        success: false,
        message: "A valid itemId is required.",
      });
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return response.status(404).json({
        success: false,
        message: "The selected item does not exist.",
      });
    }

    const booking = await Booking.create(request.body);
    const populatedBooking = await booking.populate(
      "itemId",
      "title slug category type"
    );

    response.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: populatedBooking,
    });
  } catch (error) {
    next(error);
  }
}

export { createBooking, getBookings };
