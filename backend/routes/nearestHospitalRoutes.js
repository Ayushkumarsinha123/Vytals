const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const catchAsync = require("../utils/catchAsync");

const router = express.Router();

// GOOGLE API KEY
const API_KEY = "AIzaSyBBugYIWRKupAnXy04i3ipJkewyMqx-eSI";

// NEAREST HOSPITALS DISTANCES
const NEAREST_HOSPITALS_DISTANCES_API = `https://maps.googleapis.com/maps/api/distancematrix/json?
origins=28.6139,77.2090
&destinations=28.6025782,77.1867877|28.5312332,77.210123
&key=${API_KEY}`;

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    // NEAREST HOSPITALS API
    const NEAREST_HOSPITALS_API = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.4209275,77.5241642&radius=5000&type=hospital&key=${API_KEY}`;

    // API USAGE -----------------------------------------
    // const nearestHospitals = await axios.get(NEAREST_HOSPITALS_API);
    // const hospitals = nearestHospitals.data.results.map((place) => ({
    //   name: place.name,
    //   address: place.vicinity,
    //   lat: place.geometry.location.lat,
    //   lng: place.geometry.location.lng,
    // }));
    // ----------------------------------------------------

    const filePath = path.join(
      __dirname,
      "..",
      "dev-data",
      "hospitals-details.json"
    );

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("❌ Error reading file:", err);
        return res.status(500).json({ error: "Could not read hospital data" });
      }

      try {
        let hospitals = JSON.parse(data);

        // Getting important INFO
        hospitals = hospitals.map((place) => ({
          name: place.name,
          address: place.vicinity,
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        }));

        res.status(200).json(hospitals);
      } catch (e) {
        console.error("❌ JSON parse error:", e);

        res.status(500).json({ error: "Invalid JSON format" });
      }
    });
  })
);

// To Calculate the distances between routes
router.get(
  "/distances",
  catchAsync(async (req, res, next) => {
    // --------------------------------------------------
    // While using API ----------------------------------
    // --------------------------------------------------

    // const { lat: userLat, lng: userLng } = req.query;

    // if (!userLat || !userLng) {
    //   return res
    //     .status(400)
    //     .json({ message: "User location required (lat & lng)." });
    // }

    // // Load hospitals
    // const filePath = path.join(__dirname, "../dev-data/hospitals.json");
    // const hospitalData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // // Prepare destinations
    // const destinations = hospitalData
    //   .map((hospital) => `${hospital.lat},${hospital.lng}`)
    //   .join("|");

    // // Distance Matrix API call
    // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLat},${userLng}&destinations=${destinations}&key=${API_KEY}`;

    // const response = await axios.get(url);

    // // Merge distances into hospital data
    // const elements = response.data.rows[0].elements;
    // const hospitalsWithDistance = hospitalData.map((hospital, index) => ({
    //   ...hospital,
    //   distance: elements[index]?.distance?.text || "Unknown",
    //   duration: elements[index]?.duration?.text || "Unknown",
    // }));

    // 🔁 Read pre-fetched distance data from local JSON file
    const filePath = path.join(
      __dirname,
      "..",
      "dev-data",
      "hospitals-distance.json"
    );
    const data = fs.readFileSync(filePath, "utf-8");
    const hospitalsWithDistance = JSON.parse(data);

    res.status(200).json({
      status: "success",
      count: hospitalsWithDistance.length,
      data: hospitalsWithDistance,
    });
  })
);

router.get(
  "/distances/:hospitalName",
  catchAsync(async (req, res, next) => {
    const { hospitalName } = req.params;
    console.log(hospitalName);

    // Read data
    const filePath = path.join(
      __dirname,
      "..",
      "dev-data",
      "hospitals-distance.json"
    );
    const data = fs.readFileSync(filePath, "utf-8");
    const hospitalsWithDistance = JSON.parse(data);

    // Find hospital by slug or name (flexible matching)
    const normalizedParam = hospitalName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

    const found = hospitalsWithDistance.find((hospital) => {
      const slug = hospital.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return slug === normalizedParam;
    });

    if (!found) {
      return res.status(404).json({
        status: "fail",
        message: `Hospital '${hospitalName}' not found.`,
      });
    }

    res.status(200).json({
      status: "success",
      data: found,
    });
  })
);

module.exports = router;
