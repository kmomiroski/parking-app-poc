import ParkingHistory from "../../db_models/ParkingHistory";
import Joi from "@hapi/joi";
import validateInput from "../../lib/validate";

export default async (req, res) => {
  const parkingHistorySchema = Joi.object({
    startParkingSession: Joi.date().required(),
    endParkingSession: Joi.date().required(),
    vehicle: Joi.string().required(),
    plate: Joi.string().max(10).required(),
    owner: Joi.string().required(),
    msgStatus: Joi.string().valid("cancelled", "sent", "unknown").required(),
    isMsgSent: Joi.boolean().required(),
  });

  const { error } = validateInput(req.body, parkingHistorySchema);

  if (error && error.details) {
    return {
      message: error.details[0].message,
      statusCode: 400,
    };
  }

  const parkingHistory = new ParkingHistory({
    startParkingSession: req.body.startParkingSession,
    endParkingSession: req.body.endParkingSession,
    vehicle: req.body.vehicle,
    plate: req.body.plate,
    owner: req.body.owner,
    msgStatus: req.body.msgStatus,
    isMsgSent: req.body.isMsgSent,
  });

  try {
    const data = await parkingHistory.save();
    return {
      response: {
        message: `Parking session started at ${new Date(
          data.startParkingSession
        ).toUTCString()}`,
      },
    };
  } catch (err) {
    return { message: err };
  }
};
