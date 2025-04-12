const Hospital = require("../models/hospitalModel");
const catchAsync = require("../utils/catchAsync");

exports.createHospital = catchAsync(async (req, res, next) => {
  const newHospital = await Hospital.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      hospital: newHospital,
    },
  });
});

exports.getAllHospitals = catchAsync(async (req, res, next) => {
  const hospitals = await Hospital.find();
  res.status(200).json({
    status: "success",
    results: hospitals.length,
    data: {
      hospitals,
    },
  });
});
