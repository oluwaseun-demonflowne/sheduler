import { Router } from "express";
import { sendTheEmail } from "../controllers/sendEmailFunction";

const router = Router();
router.get("/", sendTheEmail);

export default router;
