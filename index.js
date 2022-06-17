const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const users = require("./routes/users");
const vehicle = require("./routes/vehicle");
const parkingHistory = require("./routes/parking");

// DB CONNECTION
mongoose
  .connect(`${process.env.DB_CONN}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Unable to connect to DB", err));

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan("common"));

server.use(users);
server.use(vehicle);
server.use(parkingHistory);

const port = process.env.PORT || 9005;

server.listen(port, () => {
  console.log("Server is running on port: ", port);
});
