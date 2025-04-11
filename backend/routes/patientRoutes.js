const express = require("express");

const patientController = require("../controllers/patientController");
// Creating a router
const router = express.Router();

router
  .route("/")
  .post(patientController.createPatient)
  .get(patientController.getAllPatients);

// router
//   .route("/:id")
//   .get(mapController.getMap)

module.exports = router;
