import { db } from "../config/firebase.js";

const bookingsCollection = db.collection("bookings");
const itemsCollection = db.collection("items");

function formatBookingDocument(document, linkedItem = null) {
  const data = document.data();

  return {
    _id: document.id,
    ...data,
    itemId: linkedItem
      ? {
          _id: linkedItem.id,
          title: linkedItem.title,
          slug: linkedItem.slug,
          category: linkedItem.category,
          type: linkedItem.type,
        }
      : data.itemId,
  };
}

async function getBookings(request, response, next) {
  try {
    const snapshot = await bookingsCollection.get();

    const bookings = await Promise.all(
      snapshot.docs.map(async (document) => {
        const booking = document.data();
        const linkedItem = await itemsCollection.doc(booking.itemId).get();

        return formatBookingDocument(
          document,
          linkedItem.exists ? { id: linkedItem.id, ...linkedItem.data() } : null
        );
      })
    );

    const sortedBookings = bookings.sort(
      (firstBooking, secondBooking) =>
        new Date(secondBooking.createdAt) - new Date(firstBooking.createdAt)
    );

    response.status(200).json({
      success: true,
      count: sortedBookings.length,
      data: sortedBookings,
    });
  } catch (error) {
    next(error);
  }
}

async function createBooking(request, response, next) {
  try {
    const { itemId, name, email } = request.body;
    const itemDocument = await itemsCollection.doc(itemId).get();

    if (!itemDocument.exists) {
      return response.status(404).json({
        success: false,
        message: "The selected item does not exist.",
      });
    }

    const bookingData = {
      name,
      email,
      itemId,
      createdAt: new Date().toISOString(),
    };

    const bookingReference = await bookingsCollection.add(bookingData);
    const createdBooking = await bookingReference.get();

    response.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: formatBookingDocument(createdBooking, {
        id: itemDocument.id,
        ...itemDocument.data(),
      }),
    });
  } catch (error) {
    next(error);
  }
}

export { createBooking, getBookings };
