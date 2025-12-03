const express = require("express");
const app = express();

app.use(express.json());

// Routes
const coverageRoutes = require("./routes/coverage.routes");
app.use("/api/coverage", coverageRoutes);

const faqRoutes = require("./routes/faq.routes");
app.use("/api/faq", faqRoutes);

module.exports = app;
