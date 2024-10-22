import { Router } from "express";
import codes from "../routes/code.route";
import ia from "../routes/ia.route";

const router = Router();

router.use("/codes", codes);
router.use("/ia", ia);

export default router;
