const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const catchAsync = require("../utils/catchAsync");

const router = express.Router();

// GOOGLE API KEY
const API_KEY = "AIzaSyBBugYIWRKupAnXy04i3ipJkewyMqx-eSI";
const API = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.6139,77.2090&radius=5000&type=hospital&key=${API_KEY}`;

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    // API USAGE -----------------------------------------
    // const nearestHospitals = await axios.get(API);
    // const hospitals = nearestHospitals.data.results.map((place) => ({
    //   name: place.name,
    //   address: place.vicinity,
    //   lat: place.geometry.location.lat,
    //   lng: place.geometry.location.lng,
    // }));
    // ----------------------------------------------------

    const filePath = path.join(__dirname, "..", "dev-data", "hospitals.json");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("❌ Error reading file:", err);
        return res.status(500).json({ error: "Could not read hospital data" });
      }

      try {
        const hospitals = JSON.parse(data);
        console.log(hospitals);

        res.status(200).json(hospitals);
      } catch (e) {
        console.error("❌ JSON parse error:", e);

        res.status(500).json({ error: "Invalid JSON format" });
      }
    });
  })
);

module.exports = router;
