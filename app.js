const express = require("express");
const cors = require("cors");

// Start express app
const app = express();

/**
 * Router files
 */
const eventRouter = require("./routes/eventRoute");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/api/v1/events", eventRouter);

module.exports = app;
