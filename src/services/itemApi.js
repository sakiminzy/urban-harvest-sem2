import { apiRequest } from "./apiClient";

function normalizeItem(item) {
  return {
    ...item,
    id: item.slug,
    dbId: item._id,
    imageAlt: item.alt,
  };
}

async function fetchItems(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  const result = await apiRequest(`/items${queryString ? `?${queryString}` : ""}`);

  return result.data.map(normalizeItem);
}

async function fetchItemById(id) {
  const result = await apiRequest(`/items/${id}`);
  return normalizeItem(result.data);
}

async function createBooking(bookingData) {
  const result = await apiRequest("/bookings", {
    method: "POST",
    body: JSON.stringify(bookingData),
  });

  return result;
}

export { createBooking, fetchItemById, fetchItems, normalizeItem };
