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



