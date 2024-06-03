import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js"
import { User } from "../models/users.models.js";
import { Inventory } from "../models/inventory.models.js";
import { Item } from "../models/item.models.js";

const showAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: 'user' }).select("-password");
  if (!users.length) {
    console.error("No User Found");
    throw new ApiError(404, "No User Found")
  };
  return res
    .status(200)
    .json(new ApiResponse(200, users, "users list retrieved."));
});
const showAllInventories = asyncHandler(async (req, res) => {
  const inventories = await Inventory.find().select()
  if (!inventories.length) {
    throw new ApiResponse(404, "Inventory not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, inventories, "Inventory list retrieved."));
});


const fetchInventoryByUserId = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    // const users = req.params._id;

    const inventory = await Inventory.find({ UserID: user._id });
    if (!inventory.length) {
      throw new ApiResponse(404, "Inventory not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, inventory, "Inventories retrieved."));
  } catch (error) {
    console.error("Error fetching the existing Inventory:", error);
 }
});

const fetchItemsByInventoryId = asyncHandler(async (req, res) => {
  try {
    const {ID}  = req.body;
    const inv=await Inventory.findById(ID).select();
    if(!inv){
        throw new ApiError(404, "Inventory not found");
    }
    try {
    const items=await Item.find({ InventoryID: inv.inventoryId }).select();
    // Check if items are found
      if (!items.length) {
        return res
          .status(404)
          .json({ message: "No items found for this inventory." });
      }

      // Return the items
      res.status(200).json(items);
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    throw new ApiError(500, "Bad Request.");
  }
});
const showItemDetailsById = asyncHandler(async (req, res) => {
  try {
    const { itemId } = req.body;
    try {
      const item = await Item.find({ itemId: itemId }).select();
      // Check if items are found
      if (!item) {
        return res
          .status(404)
          .json({ message: "Error while fetching the Item Details." });
      }

      // Return the items
      res.status(200).json(item);
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: error.message });
    }

  } catch (error) {
    throw new ApiError(500, "Bad Request.");
  }
});
const fetchCoordinatesofInventories = asyncHandler(async (req, res) => {
  try {
    const inventories = await Inventory.find().select("inventoryName latCoordinates longCoordinates")
    if (!inventories) {
      return res.status(404).json({ message: "Error while fetching the Inventory Coordinates" });
    }
    res.status(200).json(inventories);
  } catch (error) {
    throw new ApiError(500, "Bad Request.");
  }
});
export { showAllInventories, showAllUsers, fetchInventoryByUserId, fetchItemsByInventoryId, showItemDetailsById, fetchCoordinatesofInventories }