const express = require("express");
const router = express.Router();
const routeHandler = require("../middleware/routeHandler");
const login = require("../handlers/users/login");
const register = require("../handlers/users/register");
const getAllCarsByUser = require("../handlers/users/getAllCarsByUser");

router.post("/api/v1/user/login", routeHandler(login));
router.post("/api/v1/user/register", routeHandler(register));
router.get("/api/v1/user/:owner/cars", routeHandler(getAllCarsByUser));

module.exports = router;
