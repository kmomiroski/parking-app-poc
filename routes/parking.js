const express = require("express");
const router = express.Router();
const routeHandler = require("../middleware/routeHandler");
const create = require("../handlers/parking-history/create");
const getAll = require("../handlers/parking-history/list-all");
const tokenVerify = require("../middleware/verify");

router.post(
  "/api/v1/parking-history/create",
  tokenVerify,
  routeHandler(create)
);
router.get("/api/v1/parking-history/", tokenVerify, routeHandler(getAll));

module.exports = router;
