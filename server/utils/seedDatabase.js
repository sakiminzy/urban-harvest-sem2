import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Booking from "../models/Booking.js";
import Item from "../models/Item.js";
import seedBookings from "./seedBookings.js";
import seedItems from "./seedItems.js";

dotenv.config();

async function seedDatabase() {
  try {
    await connectDB();

    await Booking.deleteMany();
    await Item.deleteMany();
    const createdItems = await Item.insertMany(seedItems);

    const itemMap = new Map(
      createdItems.map((item) => [item.slug, item._id])
    );

    const bookingsToInsert = seedBookings.map((booking) => ({
      name: booking.name,
      email: booking.email,
      itemId: itemMap.get(booking.itemSlug),
    }));

    await Booking.insertMany(bookingsToInsert);

    console.log("Database seeded with Urban Harvest Hub items and bookings.");
    process.exit(0);
  } catch (error) {
    console.error("Database seed failed:", error.message);
    process.exit(1);
  }
}

seedDatabase();
