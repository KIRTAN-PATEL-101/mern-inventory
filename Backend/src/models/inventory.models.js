import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inventoryId: {
      type: "String",
      required: true,
    },
    inventoryName: {
      type: "String",
      required: true,
      maxlength: 20,
      minlength: 5,
    },
    address: {
      type: "String",
      required: true,
      maxlength: 50,
      minlength: 5,
    },
    country: {
      type: "String",
      requried: true,
      maxlength: 30,
      minlength: 5,
    },
    mobileNo: {
      type: "String",
      required: true,
      maxlength: 10,
      minlength: 10,
      validate: {
        validator: (value) => /^\d{10}$/.test(value), // Basic 10-digit phone number format
        message: "Invalid mobile number format (must be 10 digits)",
      },
    },
    ManagerName: {
      type: "String",
      required: true,
      maxlength: 25,
      minlength: 3,
    },
    Visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Inventory = mongoose.model("Inventory", InventorySchema);