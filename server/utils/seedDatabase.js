import dotenv from "dotenv";
import { db, initializeFirebase } from "../config/firebase.js";
import seedBookings from "./seedBookings.js";
import seedItems from "./seedItems.js";

dotenv.config();

async function seedDatabase() {
  try {
    console.log("Seeding started...");

    await initializeFirebase();

    if (!db) {
      throw new Error("Firestore database instance is not available.");
    }

    const itemsCollection = db.collection("items");
    const bookingsCollection = db.collection("bookings");

    console.log("Connected to Firestore.");
    console.log(`Preparing to insert ${seedItems.length} items and ${seedBookings.length} bookings...`);

    const existingItems = await itemsCollection.listDocuments();
    const existingBookings = await bookingsCollection.listDocuments();

    console.log(`Deleting ${existingItems.length} existing items...`);
    console.log(`Deleting ${existingBookings.length} existing bookings...`);

    await Promise.all(existingBookings.map((document) => document.delete()));
    await Promise.all(existingItems.map((document) => document.delete()));

    await Promise.all(
      seedItems.map((item) =>
        itemsCollection.doc(item.slug).set({
          ...item,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      )
    );

    await Promise.all(
      seedBookings.map((booking) =>
        bookingsCollection.add({
          name: booking.name,
          email: booking.email,
          itemId: booking.itemSlug,
          createdAt: new Date().toISOString(),
        })
      )
    );

    const finalItems = await itemsCollection.listDocuments();
    const finalBookings = await bookingsCollection.listDocuments();

    console.log(`Firestore seeded successfully.`);
    console.log(`Items now in Firestore: ${finalItems.length}`);
    console.log(`Bookings now in Firestore: ${finalBookings.length}`);

    process.exit(0);
  } catch (error) {
    console.error("Firestore seed failed:", error);
    process.exit(1);
  }
}

seedDatabase();