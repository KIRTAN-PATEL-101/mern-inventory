
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Inventory } from "../models/inventory.models.js";
import validator from "validator";

const addInventory = asyncHandler(async (req, res) => {
  const {
    inventoryId,
    inventoryName,
    address,
    country,
    mobileNo,
    managerName,
  } = req.body;
  const id = req.user._id;
  console.log(req.body)
  //Checking for existing Inventory by Inventory Id
  const existingInventory = await Inventory.findOne({
    inventoryId: inventoryId,
  });
  if (existingInventory) {
    throw new ApiError(409, "Inventory already exists.");
  }

  // Validate mobile number
  if (!validator.isMobilePhone(mobileNo, "any")) {
    throw new ApiError(400, "Invalid mobile number format");
  }

  const inventory = await Inventory.create({
    inventoryId: inventoryId,
    inventoryName: inventoryName,
    address: address,
    country: country,
    mobileNo: mobileNo,
    ManagerName: managerName,
    UserID: id,
  });

  const createdInventory = await Inventory.findById(inventory._id);

  if (!createdInventory) {
    throw new ApiError(
      500,
      "Something went wrong while creating the Inventory."
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdInventory, "Inventory created Successfully.")
    );
});

const updateInventory = asyncHandler(async (req, res) => {
  const {
    inventoryId,
    inventoryName,
    address,
    country,
    mobileNo,
    managerName,
  } = req.body;
  const id = req.user._id;

  //Checking for existing Inventory by Inventory Id
  const existingInventory = await Inventory.findOne({
    inventoryId: inventoryId,
  });
  if (!existingInventory) {
    throw new ApiError(409, "Inventory does not exists.");
  }

  const inventory = await Inventory.findOneAndUpdate(
    { inventoryId: inventoryId },
    {
      inventoryId: inventoryId,
      inventoryName: inventoryName,
      address: address,
      country: country,
      mobileNo: mobileNo,
      managerName: managerName,
      UserID: id,
    }
  );
  if (!inventory) {
    throw new ApiError(
      500,
      "Something went wrong while updating the Inventory."
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, inventory, "Inventory updated Successfully."));
});
const showallInventories = asyncHandler(async (req, res) => {
    const id = req.user._id
        const inventories = await Inventory.find({UserID : id});
        if(!inventories.length){
            throw new ApiError (404, 'Inventory not found')
        }
        return res
          .status(200)
          .json(new ApiResponse(200, inventories, "Inventory list retrieved."));
      });
export  { addInventory, updateInventory, showallInventories }