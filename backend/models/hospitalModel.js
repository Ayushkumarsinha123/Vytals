const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A hospital must have a name"],
  },
  location: {
    type: String,
    required: [true, "A hospital must have a location"],
  },
  totalBeds: {
    icu: { type: Number, default: 0 },
    general: { type: Number, default: 0 },
    emergency: { type: Number, default: 0 },
  },
});

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
