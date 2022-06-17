const User = require("../../db_models/User");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateInput = require("../../lib/validate");
require("dotenv/config");

module.exports = async (req, res) => {
  const loginSchema = Joi.object({
    email: Joi.string().min(8).required().email(),
    password: Joi.string().min(8).required(),
  });

  const { error } = validateInput(req.body, loginSchema);

  if (error && error.details) {
    return {
      message: error.details[0].message,
      statusCode: 400,
    };
  }

  const isUserRegistered = await User.findOne({
    email: req.body.email,
  });

  if (!isUserRegistered) {
    return {
      message: `Please make sure that your email or password is correct`,
      statusCode: 400,
    };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    isUserRegistered.password
  );

  if (!isPasswordValid) {
    return {
      message: `Sorry, the password you entered is incorrect`,
      statusCode: 400,
    };
  }

  const token = jwt.sign(
    {
      _id: isUserRegistered.id,
      name: isPasswordValid.fullName,
      email: isPasswordValid.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.header("Authorization", token);

  return {
    token,
  };
};
