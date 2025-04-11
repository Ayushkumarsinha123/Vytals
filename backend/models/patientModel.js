const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "A patient must have a name"],
      trim: true,
    },
    patientBedType: {
      type: String,
      required: [true, "A patient must have an bed number"],
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
