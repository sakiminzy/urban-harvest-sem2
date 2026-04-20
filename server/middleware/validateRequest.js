function sendValidationError(response, errors) {
  return response.status(400).json({
    success: false,
    message: "Validation failed.",
    errors,
  });
}

function validateItem(request, response, next) {
  const {
    slug,
    title,
    category,
    type,
    image,
    alt,
    description,
    availability,
    price,
    location,
  } = request.body;

  const errors = [];
  const validCategories = ["Food", "Lifestyle", "Education"];
  const validTypes = ["Product", "Workshop", "Event"];

  if (!slug?.trim()) errors.push("Slug is required.");
  if (!title?.trim()) errors.push("Title is required.");
  if (!category?.trim()) errors.push("Category is required.");
  if (!type?.trim()) errors.push("Type is required.");
  if (!image?.trim()) errors.push("Image URL is required.");
  if (!alt?.trim()) errors.push("Alt text is required.");
  if (!description?.trim()) errors.push("Description is required.");
  if (!availability?.trim()) errors.push("Availability is required.");
  if (!location?.trim()) errors.push("Location is required.");

  if (category && !validCategories.includes(category)) {
    errors.push("Category must be Food, Lifestyle, or Education.");
  }

  if (type && !validTypes.includes(type)) {
    errors.push("Type must be Product, Workshop, or Event.");
  }

  if (price === undefined || price === null || Number.isNaN(Number(price))) {
    errors.push("Price must be a valid number.");
  } else if (Number(price) < 0) {
    errors.push("Price cannot be negative.");
  }

  if (errors.length > 0) {
    return sendValidationError(response, errors);
  }

  next();
}

function validateBooking(request, response, next) {
  const { name, email, itemId } = request.body;
  const errors = [];

  if (!name?.trim()) {
    errors.push("Name is required.");
  }

  if (!email?.trim()) {
    errors.push("Email is required.");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push("Email must be valid.");
  }

  if (!itemId?.trim()) {
    errors.push("Item ID is required.");
  }

  if (errors.length > 0) {
    return sendValidationError(response, errors);
  }

  next();
}

export { validateBooking, validateItem };
