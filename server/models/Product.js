const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    shipping: {
      type: Boolean,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    publish: {
      type: Boolean,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
