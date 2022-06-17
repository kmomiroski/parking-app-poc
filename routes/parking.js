const express = require("express");
const router = express.Router();
const routeHandler = require("../middleware/routeHandler");
const create = require("../handlers/parking-history/create");
const getAll = require("../handlers/parking-history/list-all");

router.post("/api/v1/parking-history/create", routeHandler(create));
router.get("/api/v1/parking-history/", routeHandler(getAll));

module.exports = router;
