const express = require("express");
const app = express();

app.use(express.json());

// Routes
const coverageRoutes = require("./routes/coverage.routes");
app.use("/api/coverage", coverageRoutes);

module.exports = app;
