const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../utils/encryptUtils");

const patientSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: [true, "A patient must have a name"],
    trim: true,
  },
  patientBedType: {
    type: String,
    required: [true, "A patient must have a bed number"],
  },
  patientReasonForVisit: {
    type: String,
    required: [true, "A patient must have a reason"],
    trim: true,
  },
});

// Encrypt before saving
patientSchema.pre("save", function (next) {
  this.patientName = encrypt(this.patientName);
  this.patientBedType = encrypt(this.patientBedType);
  this.patientReasonForVisit = encrypt(this.patientReasonForVisit);
  next();
});

// Add method to decrypt fields
patientSchema.methods.getDecryptedData = function () {
  return {
    _id: this._id,
    patientName: decrypt(this.patientName),
    patientBedType: decrypt(this.patientBedType),
    patientReasonForVisit: decrypt(this.patientReasonForVisit),
  };
};

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
