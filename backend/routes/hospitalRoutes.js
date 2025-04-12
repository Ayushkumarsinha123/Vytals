const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");

router.route("/")
  .post(hospitalController.createHospital)
  .get(hospitalController.getAllHospitals);

module.exports = router;
