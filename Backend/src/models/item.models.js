import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
    required: true,
  },
  expiryDate: {
    type: Date,
  },
  triggerAmount: {
    type: Number,
  },
  inventoryId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  itemImageurl: {
    type: String,
    required: true,
  },
  lastNotification: {
    type: Date,
  },
},{
  timestamps: true,
});

export const Item = mongoose.model('Item', itemSchema);
