const express = require("express");

const patientController = require("../controllers/patientController");

// Creating a router
const router = express.Router();

router.get("/generate/:bedType", patientController.generateRandomPatient);
router.delete("/:id", patientController.deletePatient);



// router
//   .route("/:id")
//   .get(mapController.getMap)

module.exports = router;
