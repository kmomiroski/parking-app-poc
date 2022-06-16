import User from "../../db_models/User";
import Joi from "@hapi/joi";
import validateInput from "../../lib/validate";
import bcrypt from "bcryptjs";

export default async (req, res) => {
  const registerSchema = Joi.object({
    fullName: Joi.string().min(4).required(),
    email: Joi.string().min(12).required().email(),
    password: Joi.string().min(10).required(),
  });

  const { error } = validateInput(req.body, registerSchema);

  if (error && error.details) {
    return {
      message: error.details[0].message,
      statusCode: 400,
    };
  }

  const isUserRegistered = await User.findOne({
    email: req.body.email,
  });

  if (isUserRegistered) {
    return {
      message: `User with email ${req.body.email} already exists`,
      statusCode: 400,
    };
  }

  const salt = await bcrypt.genSalt(16);
  const encPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: encPassword,
  });

  try {
    const data = await user.save();
    return {
      response: {
        message: `User ${data.fullName} with email ${req.body.email} successfully registered`,
      },
    };
  } catch (err) {
    return { message: err };
  }
};
