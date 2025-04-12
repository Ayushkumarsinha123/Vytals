const express = require("express");
const opdController = require("../controllers/opdController");

const router = express.Router();

router
  .route("/")
  .post(opdController.createOPDAppointment)
  .get(opdController.getAllAppointments);

module.exports = router;
