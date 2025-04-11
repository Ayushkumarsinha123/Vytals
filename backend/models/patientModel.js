const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "A patient must have a name"],
      trim: true,
    },
    patientAge: {
      type: Number,
      required: [true, "A tour must have an age"],
    },
    patientReasonForVisit: {
      type: String,
      required: [true, "A patient must have a reason"],
      trim: true,
    },
   
  },

);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
