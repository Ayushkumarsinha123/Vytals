const AppError = require("../utils/appError");

const APIFeatures = require("../utils/APIFeatures");
const catchAsync = require("../utils/catchAsync");
const BedStatus = require("../models/bedAvailableModel");


exports.createBedStatus = catchAsync(async (req, res, next) => {
  const newBedStatus = await BedStatus.create(req.body);

  res.status(201).json({ status: "success", data: { bedStatus: newBedStatus } });
});


