const ParkingHistory = require("../../db_models/ParkingHistory");

module.exports = async (req, res) => {
  try {
    const data = await ParkingHistory.find();
    return {
      data,
    };
  } catch (err) {
    return { message: err };
  }
};
