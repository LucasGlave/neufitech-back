import { Router } from "express";
import neufialertUser from "../controllers/neufialertUser.controllers";

const router = Router();

router.post("/verify", neufialertUser.checkNumberID);

export default router;
