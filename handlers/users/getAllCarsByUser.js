const User = require("../../db_models/User");

module.exports = async (req, res) => {
  const ownerFlag = req.params.owner;

  if (!ownerFlag) {
    return {
      message: `Please make sure that you have provided the owner's email`,
    };
  }

  const userWithCars = await User.find({ email: ownerFlag });

  return {
    response: userWithCars,
  };
};
