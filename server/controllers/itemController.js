import { db } from "../config/firebase.js";

const itemsCollection = db.collection("items");

function formatFirestoreDocument(document) {
  return {
    _id: document.id,
    ...document.data(),
  };
}

function matchesSearch(item, searchTerm) {
  if (!searchTerm) {
    return true;
  }

  const normalizedSearch = searchTerm.toLowerCase();

  return [
    item.title,
    item.description,
    item.location,
    item.category,
    item.type,
    item.slug,
  ]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(normalizedSearch));
}

function filterItems(items, query) {
  return items.filter((item) => {
    const categoryMatch = !query.category || item.category === query.category;
    const typeMatch = !query.type || item.type === query.type;
    const featuredMatch =
      query.featured === undefined ||
      item.featured === (query.featured === "true");
    const searchMatch = matchesSearch(item, query.search);

    return categoryMatch && typeMatch && featuredMatch && searchMatch;
  });
}

async function getItems(request, response, next) {
  try {
    const snapshot = await itemsCollection.get();
    const items = snapshot.docs.map(formatFirestoreDocument);
    const filteredItems = filterItems(items, request.query);

    response.status(200).json({
      success: true,
      count: filteredItems.length,
      data: filteredItems,
    });
  } catch (error) {
    next(error);
  }
}

async function getItemById(request, response, next) {
  try {
    const { id } = request.params;

    let document = await itemsCollection.doc(id).get();

    if (!document.exists) {
      const slugSnapshot = await itemsCollection.where("slug", "==", id).limit(1).get();
      document = slugSnapshot.docs[0];
    }

    if (!document || !document.exists) {
      return response.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    response.status(200).json({
      success: true,
      data: formatFirestoreDocument(document),
    });
  } catch (error) {
    next(error);
  }
}

async function createItem(request, response, next) {
  try {
    const itemData = {
      ...request.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await itemsCollection.doc(itemData.slug).set(itemData);

    response.status(201).json({
      success: true,
      message: "Item created successfully.",
      data: {
        _id: itemData.slug,
        ...itemData,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function updateItem(request, response, next) {
  try {
    const { id } = request.params;
    const documentReference = itemsCollection.doc(id);
    const existingItem = await documentReference.get();

    if (!existingItem.exists) {
      return response.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    const updatedData = {
      ...request.body,
      updatedAt: new Date().toISOString(),
    };

    await documentReference.set(updatedData, { merge: true });
    const updatedItem = await documentReference.get();

    response.status(200).json({
      success: true,
      message: "Item updated successfully.",
      data: formatFirestoreDocument(updatedItem),
    });
  } catch (error) {
    next(error);
  }
}

async function deleteItem(request, response, next) {
  try {
    const { id } = request.params;
    const documentReference = itemsCollection.doc(id);
    const existingItem = await documentReference.get();

    if (!existingItem.exists) {
      return response.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    await documentReference.delete();

    response.status(200).json({
      success: true,
      message: "Item deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export { createItem, deleteItem, getItemById, getItems, updateItem };
