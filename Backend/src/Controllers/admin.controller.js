import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js"
import { User } from "../models/users.models.js";
import { Inventory } from "../models/inventory.models.js";
import { Item } from "../models/item.models.js";

const showAllUsers = asyncHandler(async(req, res) =>{
    const users = await User.find(role = 'user').select("-password");
    if(!users.length){
        throw new ApiError(404, "No User Found")
    };
    return res .status(200).json(new ApiResponse(200, users, "User list retrieved."));
    
});
const showAllInventories = asyncHandler(async (req, res) => {
    const inventories = await Inventory.find().select("inventoryId managerName inventoryName address createdAt")
    if (!inventories.length) {
      throw new ApiResponse(404, "Inventory not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, inventories, "Inventory list retrieved."));
});
const fetchInventoryByUserId = asyncHandler(async(req, res) =>{
  const UserID = req.user._id;
  try {
    const inventory = await Inventory.find({ UserID: UserID });
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
    const { inventoryId } = req.body; // Assuming inventoryId is passed as a URL parameter
    try {
      // Fetch items from the database by inventoryId
      const items = await items.find({ inventoryId:inventoryId });

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
// const showItemDetailsById = asyncHandler (async (req, res) => {
//   try{
//     const itemId = req.params.itemId;
//     const item = await Item.findById(itemId).select("itemName itemDescription quantity unitPrice");
//   }catch(error){

//   }
  
// });

export {showAllInventories,  showAllUsers, fetchInventoryByUserId, fetchItemsByInventoryId}