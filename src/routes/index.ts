import { Router } from "express";
import codes from "./code.routes";
import neufialertUsers from "./neufialertUser.routes";
import ia from "./ia.routes";

const router = Router();

router.use("/codes", codes);
router.use("/ia", ia);
router.use("/neufialertusers", neufialertUsers);

export default router;
