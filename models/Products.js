const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: {
      type: Number,
      required: true,
    },
    image: {
      name: String,
      data: Buffer,
      contentType: String,
    },
    category: {
      type: String,
      enum: [
        "Toiletries",
        "Household",
        "Fresh Foods",
        "Naija Food",
        "Food Cupboard",
        "Cooking Oil",
      ],
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
