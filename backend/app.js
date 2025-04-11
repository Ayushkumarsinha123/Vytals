const fs = require("fs");

const morgan = require("morgan");
const express = require("express");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const patientRouter = require("./routes/patientRoutes");

const app = express();

// Middlewares
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());

// Mounting the Router
app.use("/api/v1/patient", patientRouter);

// app.all() for all the HTTP methods
app.all("*", (req, res, next) => {
  // If next() recieves an argument, express will automatically know that there
  // was an error!
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
