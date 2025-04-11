
const express = require("express");

const bedAvailablController = require("../controllers/bedAvailableController");
// Creating a router
const router = express.Router();

router
  .route("/")
  .post(bedAvailablController.createBedStatus);
 

// router
//   .route("/:id")
//   .get(mapController.getMap)

module.exports = router;
