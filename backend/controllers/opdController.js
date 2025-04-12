const OPDAppointment = require("../models/opdModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Create OPD Appointment
exports.createOPDAppointment = catchAsync(async (req, res, next) => {
  const newAppointment = await OPDAppointment.create(req.body);

  console.log(newAppointment);

  res.status(201).json({
    status: "success",
    data: {
      appointment: newAppointment,
    },
  });
});

// Get All OPD Appointments
exports.getAllAppointments = catchAsync(async (req, res, next) => {
  const appointments = await OPDAppointment.find();

  res.status(200).json({
    status: "success",
    results: appointments.length,
    data: {
      appointments,
    },
  });
});
