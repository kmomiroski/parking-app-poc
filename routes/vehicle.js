import { Router } from "express";
import routeHandler from "../middleware/routeHandler";
import create from "../handlers/vehicle/create";

const router = Router();

router.post("/api/v1/vehicle/:owner/create/:isDefault", routeHandler(create));

export default router;
