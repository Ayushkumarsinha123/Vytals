// routes/hospitalDetailInfoRoutes.js
const express = require("express");
const router = express.Router();
const hospitalDetailInfoController = require("../controllers/hospitalDetailInfoController");

router
  .route("/")
  .post(hospitalDetailInfoController.createHospitalDetail)
  .get(hospitalDetailInfoController.getAllHospitalDetails);

router
  .route("/:id")
  .get(hospitalDetailInfoController.getHospitalDetail);

module.exports = router;
