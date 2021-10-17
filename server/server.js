const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config({ path: "./config.env" });
const dbURI = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connecting Routes to app
app.use(require("./routes/userRoutes"));
app.use(require("./routes/authRoutes"));
app.use(require("./routes/files"));

// Connecting to MongoDB
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(port, () => console.log("Server is running on port " + port));
  })
  .catch((err) => console.log(err));