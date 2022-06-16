import { Router } from "express";
import routeHandler from "../middleware/routeHandler";
import login from "../handlers/users/login";
import register from "../handlers/users/register";
import getAllCarsByUser from "../handlers/users/getAllCarsByUser";

const router = Router();

router.post("/api/v1/user/login", routeHandler(login));
router.post("/api/v1/user/register", routeHandler(register));
router.get("/api/v1/user/:owner/cars", routeHandler(getAllCarsByUser));

export default router;
