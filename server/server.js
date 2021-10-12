const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config({ path: "./config.env" });
const dbURI = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

// get driver connection
const dbo = require("./db/conn");
const { db } = require("./models/user");

// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
//   });
//   console.log(`Server is running on port: ${port}`);
// });

app.use(cors());
app.use(express.json());
// app.use("/", require("./routes/record"));
app.use(require("./routes/userRoutes"));
app.use(require("./routes/authRoutes"));

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(port, () => console.log("Server is running on port " + port));
  })
  .catch((err) => console.log(err));
