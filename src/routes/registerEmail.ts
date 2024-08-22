import { Router } from "express";
import { registerEmail } from "../controllers/registerEmail"

const registerEmailRouter = Router();
registerEmailRouter.post("/", registerEmail);

export default registerEmailRouter;
