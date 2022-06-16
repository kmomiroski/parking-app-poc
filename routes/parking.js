import { Router } from "express";
import routeHandler from "../middleware/routeHandler";
import create from "../handlers/parking-history/create";
import getAll from "../handlers/parking-history/list-all";

const router = Router();

router.post("/api/v1/parking-history/create", routeHandler(create));
router.get("/api/v1/parking-history/", routeHandler(getAll));

export default router;
