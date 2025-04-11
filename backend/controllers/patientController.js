const AppError = require("../utils/appError");

const APIFeatures = require("../utils/APIFeatures");
const catchAsync = require("../utils/catchAsync");
const Patient = require("../models/patientModel");

exports.getAllPatients = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Patient.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const patients = await features.query;

  console.log(patients)
  res.status(200).json({
    status: "success",
    results: patients.length,
    data: {
      patients,
    },
  });
});


exports.createPatient = catchAsync(async (req, res, next) => {
  const newPatient = await Patient.create(req.body);

  res.status(201).json({ status: "success", data: { patient: newPatient } });
});

exports.generateRandomPatient = catchAsync(async (req, res, next) => {
  const { bedType } = req.params;

  const names = ["Aryan", "Priya", "Kunal", "Neha", "Rohan", "Isha"];
  const reasons = ["Accident", "Fever", "Stroke", "Cardiac Arrest", "Injury", "Cold"];

  const patient = await Patient.create({
    patientName: names[Math.floor(Math.random() * names.length)],
    patientReasonForVisit: reasons[Math.floor(Math.random() * reasons.length)],
    patientBedType: bedType.toLowerCase(),
  });

  res.status(201).json({
    status: "success",
    data: {
      patient,
    },
  });
});

exports.deletePatient = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const patient = await Patient.findByIdAndDelete(id);

  if (!patient) {
    return next(new AppError("No patient found with that ID", 404));
  }

  res.status(204).json({ status: "success", data: null });
});



