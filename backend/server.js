const mongoose = require("mongoose");

const dotenv = require("dotenv");

// Catching Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED EXCEPTION! Shutting down...");

  process.exit(1);
});

// Configuring dotenv
dotenv.config({ path: "./config.env" });

// DB Connection (leaving catch method for further use cases)
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!");
  });

const app = require("./app");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on PORT ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");

  // By doing server.close(), we give server time to finish all requests that's
  // pending.
  server.close(() => {
    process.exit(1);
  });
});
