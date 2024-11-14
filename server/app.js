const express = require("express");
const cors = require("cors");
const { errorHeandlers } = require("./middleware");
const router = require("./routes");

const app = express();

const corsOptions = { origin: "*" };
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", router);

app.use(errorHeandlers.errorHeandler);

module.exports = app;
