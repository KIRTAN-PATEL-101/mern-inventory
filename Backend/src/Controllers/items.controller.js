import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { Item } from "../models/item.models.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Inventory } from '../models/inventory.models.js'

const addItem = asyncHandler(async (req, res) => {
  try {
    // Extract item data from the request body
    const {
      itemName,
      itemId,
      pricePerUnit,
      stock,
      expiryDate,
      inventoryId,
      category,
    } = req.body;
    const id = req.user._id;
    console.log("itemimage", req.files)
    const itemPicLocalPath = req.files?.itemimage?.[0]?.path;
    console.log(itemPicLocalPath);
    let itemUrl = null;
    try {
      itemUrl = await uploadOnCloudinary(itemPicLocalPath);
      console.log("itemUrl:", itemUrl);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
    console.log("Item image Local Path: ", itemPicLocalPath);
    //  console.log("Profile Url: ",itemUrl);
    // Create a new item
    const newItem = new Item({
      userId: id,
      itemName,
      itemId,
      pricePerUnit,
      stock,
      expiryDate,
      inventoryId,
      category,
      itemImageurl: itemUrl,
    });

    // Save the item to the database
    await newItem.save();

    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const inventoryItems = asyncHandler(async (req, res) => {
  try {
    const { inventoryId } = req.body; // Assuming inventoryId is passed as a URL parameter
    const id = req.user._id;
    //console.log("Inventory Id:", inventoryId);
    try {
      // Fetch items from the database by inventoryId
      const items = await Item.find({ inventoryId: inventoryId, userId: id });

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

const itemDetails = asyncHandler(async (req, res) => {
  try {
    const { itemId } = req.body;
    try {
      const items = await Item.find({ itemId: itemId });

      if (!items.length) {
        throw new ApiError(400, "Error in fetching data try again");
      }

      // Return the items
      res.status(200).json(items);
    } catch (error) {
      console.log("Hello");
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    throw new ApiError(500, "Bad Request.");
  }
});

const addTriggeramount = asyncHandler(async (req, res, next) => {
  try {
    const { itemId, triggerAmount,id } = req.body;
    console.log(req.body);
    const item = await Item.findOne({ itemId: itemId })
    if (!item) {
      throw new ApiError(400, "Item not found")
    }
    item.triggerAmount = triggerAmount;
    await item.save();
    res.status(200).json({ message: "Trigger amount updated successfully" })
    next();
  } catch (error) {
    throw new ApiError(500, error)
  }
})

const adjustQuantity = asyncHandler(async (req, res, next) => {
  try {
    const { itemId, stock, operation } = req.body;
    const item = await Item.findOne({ itemId: itemId })
    if (!item) {
      throw new ApiError(400, "Item not found")
    }
    if (operation === "add") {
      item.stock = item.stock + stock;
    } else {
      item.stock = item.stock - stock;
    }
    await item.save();
    res.status(200).json({ message: "Quantity updated successfully" })
    next();
  } catch (error) {
    throw new ApiError(500, 'Bad Request.')
  }
})

const showallItems = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id;

    // Fetch items for the user
    const items = await Item.find({ userId: id });
    console.log(items);
    if (!items.length) {
      return res.status(400).json(new ApiResponse(400, null, "No items available"));
    }

    const inventoryIds = items.map(item => item.inventoryId);

    // Fetch inventory details based on inventoryId
    const inventories = await Inventory.find({ inventoryId: { $in: inventoryIds } });

    // Create a map of inventoryId to inventory details for quick lookup
    const inventoryMap = {};
    inventories.forEach(inventory => {
      inventoryMap[inventory.inventoryId] = inventory;
    });

    // Map items to their corresponding inventory details
    const itemsWithInventoryDetails = items.map(item => ({
      ...item.toObject(), // Convert Mongoose document to plain JavaScript object
      inventoryDetails: inventoryMap[item.inventoryId] || null
    }));

    // Send response back to the client
    res.status(200).json({
      status: 200,
      message: "Items fetched successfully",
      data: itemsWithInventoryDetails
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
});

const deleteMultipleItems = asyncHandler(async (req, res) => {
  try {
    console.log("Hello");
    const id = req.user._id;
    const { ids } = req.body;
    console.log(req.body);
    const items = await Item.find({ userId: id, _id: { $in: ids } })
    if (!items.length) {
      return res.status(400).json(new ApiResponse(400, null, "No items available"));
    }
    const inventoryIds = items.map(item => item.inventoryId);
    const inventories = await Inventory.find({ inventoryId: { $in: inventoryIds } });
    const inventoryMap = {};
    inventories.forEach(inventory => {
      inventoryMap[inventory.inventoryId] = inventory;
    });
    const itemsWithInventoryDetails = items.map(item => ({
      ...item.toObject(), // Convert Mongoose document to plain JavaScript object
      inventoryDetails: inventoryMap[item.inventoryId] || null
    }));
    await Item.deleteMany({ userId: id, _id: { $in: ids } });
    return res.status(200).json(new ApiResponse(200, null, "Items deleted successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
})

export { addItem, inventoryItems, itemDetails, addTriggeramount, adjustQuantity, showallItems, deleteMultipleItems };