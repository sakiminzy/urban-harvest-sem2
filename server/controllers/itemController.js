import mongoose from "mongoose";
import Item from "../models/Item.js";

function buildItemQuery(searchParams) {
  const query = {};

  if (searchParams.category) {
    query.category = searchParams.category;
  }

  if (searchParams.type) {
    query.type = searchParams.type;
  }

  if (searchParams.featured !== undefined) {
    query.featured = searchParams.featured === "true";
  }

  if (searchParams.search) {
    query.$or = [
      { title: { $regex: searchParams.search, $options: "i" } },
      { description: { $regex: searchParams.search, $options: "i" } },
      { location: { $regex: searchParams.search, $options: "i" } },
      { category: { $regex: searchParams.search, $options: "i" } },
      { type: { $regex: searchParams.search, $options: "i" } },
    ];
  }

  return query;
}

async function getItems(request, response, next) {
  try {
    const query = buildItemQuery(request.query);
    const items = await Item.find(query).sort({ createdAt: -1 });

    response.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
}

async function getItemById(request, response, next) {
  try {
    const { id } = request.params;

    const item = mongoose.Types.ObjectId.isValid(id)
      ? await Item.findById(id)
      : await Item.findOne({ slug: id });

    if (!item) {
      return response.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    response.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
}

async function createItem(request, response, next) {
  try {
    const item = await Item.create(request.body);

    response.status(201).json({
      success: true,
      message: "Item created successfully.",
      data: item,
    });
  } catch (error) {
    next(error);
  }
}

async function updateItem(request, response, next) {
  try {
    const { id } = request.params;

    const item = mongoose.Types.ObjectId.isValid(id)
      ? await Item.findByIdAndUpdate(id, request.body, {
          new: true,
          runValidators: true,
        })
      : await Item.findOneAndUpdate({ slug: id }, request.body, {
          new: true,
          runValidators: true,
        });

    if (!item) {
      return response.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    response.status(200).json({
      success: true,
      message: "Item updated successfully.",
      data: item,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteItem(request, response, next) {
  try {
    const { id } = request.params;

    const item = mongoose.Types.ObjectId.isValid(id)
      ? await Item.findByIdAndDelete(id)
      : await Item.findOneAndDelete({ slug: id });

    if (!item) {
      return response.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    response.status(200).json({
      success: true,
      message: "Item deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export { createItem, deleteItem, getItemById, getItems, updateItem };
