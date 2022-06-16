import Vehicle from "../../db_models/Vehicle";
import Joi from "@hapi/joi";
import validateInput from "../../lib/validate";
import User from "../../db_models/User";

export default async (req, res) => {
  const createVehicleSchema = Joi.object({
    make: Joi.string().min(4).required(),
    model: Joi.string().min(4).required(),
    plate: Joi.string().max(10).required(),
    vehicleType: Joi.string().max(10).required(),
  });

  const { error } = validateInput(req.body, createVehicleSchema);

  if (error && error.details) {
    return {
      message: error.details[0].message,
      statusCode: 400,
    };
  }

  const isCarAlreadyAdded = await Vehicle.findOne({
    plate: req.body.plate,
  });

  if (isCarAlreadyAdded) {
    return {
      message: `Vehicle with plate number ${req.body.plate} already exists`,
      statusCode: 400,
    };
  }

  try {
    const user = await User.findOne({ email: req.params.owner });
    await Vehicle.create({ ...req.body, default: req.params.isDefault }).then(
      (vehicleResponse) => {
        return User.findByIdAndUpdate(
          user._id,
          {
            $push: {
              vehicle: {
                _id: vehicleResponse._id,
                make: vehicleResponse.make,
                model: vehicleResponse.model,
                plate: vehicleResponse.plate,
                vehicleType: vehicleResponse.vehicleType,
                default: vehicleResponse.default,
              },
            },
          },
          {
            new: true,
          }
        );
      }
    );

    return {
      message: `Vehicle ${req.body.make} ${req.body.model} with plate number ${req.body.plate} successfully added`,
    };
  } catch (err) {
    return { message: err };
  }
};
