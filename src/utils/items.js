import items from "../data/items.json";

export const categories = ["All", "Food", "Lifestyle", "Education"];

export const contentTypes = ["Product", "Workshop", "Event"];

export function formatPrice(price) {
  if (price === 0) {
    return "Free";
  }

  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(price);
}

export function formatItemDate(date) {
  if (!date) {
    return "Available year-round";
  }

  return new Date(date).toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getAllItems() {
  return items;
}

export function getFeaturedItems() {
  return items.filter((item) => item.featured);
}

export function getItemById(id) {
  return items.find((item) => item.id === id);
}

export function getBookingOptions() {
  return items.filter((item) => item.type === "Workshop" || item.type === "Event");
}

export function getRelatedItems(currentItemId, category) {
  return items.filter(
    (item) => item.id !== currentItemId && item.category === category
  );
}

export function filterItems(itemList, activeCategory, searchTerm) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return itemList.filter((item) => {
    const categoryMatch =
      activeCategory === "All" || item.category === activeCategory;

    const searchMatch =
      normalizedSearch.length === 0 ||
      item.title.toLowerCase().includes(normalizedSearch) ||
      item.type.toLowerCase().includes(normalizedSearch) ||
      item.category.toLowerCase().includes(normalizedSearch) ||
      item.location.toLowerCase().includes(normalizedSearch) ||
      item.description.toLowerCase().includes(normalizedSearch);

    return categoryMatch && searchMatch;
  });
}
