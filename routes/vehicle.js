const express = require("express");
const router = express.Router();
const routeHandler = require("../middleware/routeHandler");
const create = require("../handlers/vehicle/create");

router.post("/api/v1/vehicle/:owner/create/:isDefault", routeHandler(create));

module.exports = router;
