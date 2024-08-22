import { Router } from "express";
import { sendTheEmail } from "../controllers/sendEmailFunction";

const sendEmailRouter = Router();
sendEmailRouter.get("/:email", sendTheEmail);

export default sendEmailRouter;
