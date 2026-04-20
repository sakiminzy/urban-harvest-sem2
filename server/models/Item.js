import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, "Item slug is required."],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      enum: ["Food", "Lifestyle", "Education"],
    },
    type: {
      type: String,
      required: [true, "Type is required."],
      enum: ["Product", "Workshop", "Event"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required."],
      trim: true,
    },
    alt: {
      type: String,
      required: [true, "Alt text is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
    },
    availability: {
      type: String,
      required: [true, "Availability is required."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Price cannot be negative."],
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      trim: true,
    },
    date: {
      type: String,
      default: "",
      trim: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
