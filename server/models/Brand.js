const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = { Brand };
