// controllers/hospitalDetailInfoController.js
const HospitalDetailInfo = require("../models/hospitalDetailInfoModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Create a new hospital detail entry
exports.createHospitalDetail = catchAsync(async (req, res, next) => {
  const hospital = await HospitalDetailInfo.create(req.body);

  res.status(201).json({
    status: "success",
    data: { hospital },
  });
});

// Get all hospitals
exports.getAllHospitalDetails = catchAsync(async (req, res, next) => {
  const hospitals = await HospitalDetailInfo.find();

  res.status(200).json({
    status: "success",
    results: hospitals.length,
    data: { hospitals },
  });
});

// Get a single hospital by ID
exports.getHospitalDetail = catchAsync(async (req, res, next) => {
  const hospital = await HospitalDetailInfo.findById(req.params.id);
  if (!hospital) return next(new AppError("Hospital not found", 404));

  res.status(200).json({
    status: "success",
    data: { hospital },
  });
});
