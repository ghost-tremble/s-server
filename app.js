const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const { sendData } = require("./utils/responseHelpers");


require("dotenv").config();
const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});



const {DB } = global.process.env;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(()=>console.log("database connected"));

// Use JSON parser for all non-webhook routes (stripe)
app.use((req, res, next) => {
  if (req.url.indexOf("stripe/webhook") !== -1) {
    next();
  } else {
    express.json()(req, res, next);
  }
});


app.use("/api/v1/scar", require("./routes/scam_routes"));



app.get("/", async (req, res) => {
  sendData(res, 200, {
    message:"server running",
  });
});

module.exports = app;
