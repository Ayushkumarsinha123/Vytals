const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  inQueue: { type: Number, default: 0 },
  avgTimePerPerson: { type: Number, default: 10 }
});

const opdSchema = new mongoose.Schema({
  departments: [departmentSchema]
});

const hospitalDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  lat: Number,
  lng: Number,
  distance: String,
  duration: String,
  opd: opdSchema
});

const HospitalDetailInfo = mongoose.model("HospitalDetailInfo", hospitalDetailSchema);
module.exports = HospitalDetailInfo;
