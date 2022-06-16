import ParkingHistory from "../../db_models/ParkingHistory";

export default async (req, res) => {
  try {
    const data = await ParkingHistory.find();
    return {
      data,
    };
  } catch (err) {
    return { message: err };
  }
};
