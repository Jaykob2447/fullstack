const express = require("express");
const { errorHeandlers } = require("./middleware");
const router = require("./routes");

const app = express();

app.use(express.json());

app.use("/api/", router);

app.use(errorHeandlers.errorHeandler);

module.exports = app;
