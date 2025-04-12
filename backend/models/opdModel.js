const mongoose = require("mongoose");

const opdSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  contact: String,
  department: {
    type: String,
    required: true,
    enum: ["General", "Cardiology", "ENT", "Neurology", "Ortho", "Pediatrics"],
  },
  doctorName: String,
  reasonForVisit: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true, 
  },
  status: {
    type: String,
    default: "Booked",
    enum: ["Booked", "In-Progress", "Completed", "Cancelled"],
  },
});

const OPDAppointment = mongoose.model("OPDAppointment", opdSchema);
module.exports = OPDAppointment;
