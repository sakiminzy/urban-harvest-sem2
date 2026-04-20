import express from "express";
import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from "../controllers/itemController.js";
import { validateItem } from "../middleware/validateRequest.js";

const router = express.Router();

router.route("/").get(getItems).post(validateItem, createItem);
router.route("/:id").get(getItemById).put(validateItem, updateItem).delete(deleteItem);

export default router;
