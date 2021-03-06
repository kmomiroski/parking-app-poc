const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = Schema({
  make: String,
  model: String,
  plate: String,
  vehicleType: String,
  owner: String,
  default: Boolean,
});

const Vehicle = mongoose.model("Vehicles", vehicleSchema);

module.exports = Vehicle;
