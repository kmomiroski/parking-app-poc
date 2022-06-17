const express = require("express");
const router = express.Router();
const routeHandler = require("../middleware/routeHandler");
const create = require("../handlers/vehicle/create");
const tokenVerify = require("../middleware/verify");

router.post(
  "/api/v1/vehicle/:owner/create/:isDefault",
  tokenVerify,
  routeHandler(create)
);

module.exports = router;
