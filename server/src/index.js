require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const nonPredictRouter = require("./resources/nonPredict/router");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/nonPredict", nonPredictRouter);

app.all("*", (req, res) => {
  res.status(400).json({ ERROR: "route no set, please check" });
});

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
