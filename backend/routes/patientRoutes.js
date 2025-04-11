const express = require("express");

const patientController = require("../controllers/patientController");

// Creating a router
const router = express.Router();

router.route("/").get(patientController.getAllPatients);
router.delete("/:id", patientController.deletePatient);
router.get("/generate/:bedType", patientController.generateRandomPatient);

// router
//   .route("/:id")
//   .get(mapController.getMap)

module.exports = router;
