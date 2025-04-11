const fs = require("fs");

const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const patientRouter = require("./routes/patientRoutes");
const nearestHospitalRouter = require("./routes/nearestHospitalRoutes");

const app = express();

// CORS
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middlewares
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());

// Mounting the Router
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/get-nearest-hospitals", nearestHospitalRouter);

// app.all() for all the HTTP methods
app.all("*", (req, res, next) => {
  // If next() recieves an argument, express will automatically know that there
  // was an error!
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
