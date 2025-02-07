import { Router } from "express";
import code from "../controllers/code.controllers";

const router = Router();

router.post("/compare-code", code.compareCode);
router.post("/add-code", code.createCode);
router.get("/code", code.getCodes);

export default router;
