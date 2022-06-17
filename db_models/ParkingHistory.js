const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parkngHistorySchema = Schema({
  startParkingSession: Date,
  endParkingSession: Date,
  vehicle: String,
  plate: String,
  owner: String,
  msgStatus: String,
  isMsgSent: Boolean,
});

const ParkingHistory = mongoose.model("ParkingHistories", parkngHistorySchema);

module.exports = ParkingHistory;
