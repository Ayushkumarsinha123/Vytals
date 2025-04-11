// models/BedStatus.js
const mongoose = require("mongoose");

const bedStatusSchema = new mongoose.Schema({
  type: { type: String, enum: ["icu", "emergency", "general"] },
  total: Number,
  available: Number,
  bedNumber : String
});

const BedStatus = mongoose.model("BedStatus", bedStatusSchema);
module.exports = BedStatus;
