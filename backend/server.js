require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//routes
app.use("/api/workouts", require("./routes/workouts"));
app.use("/api/user", require("./routes/user"));

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log("listening on port 3500");
    });
  })
  .catch((error) => console.log(error));
