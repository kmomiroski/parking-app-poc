const jwt = require("jsonwebtoken");

const tokenVerify = (req, res, next) => {
  const isTokenPresent = req.header("Authorization");
  if (!isTokenPresent) {
    return res.status(401).json({
      message: "You are not authorized to access this resource",
    });
  }

  try {
    const verifyToken = jwt.verify(isTokenPresent, process.env.JWT_SECRET);
    req.userData = verifyToken;
    next();
  } catch (err) {
    return res.status(403).json({
      message: err.message,
    });
  }
};

module.exports = tokenVerify;
