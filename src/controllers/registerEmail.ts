import { type Request, type Response } from "express";
import { db } from "../../../src/db/connect";
import { emailListSchema } from "../../../src/db/schema";

interface RegisterEmailBody {
  email: string;
  period: string;
}

export async function registerEmail(req: Request, res: Response) {
    console.log(req.body)
  try {
    const { email, period }: RegisterEmailBody = req.body;
    const get = await db.insert(emailListSchema).values({ email: email, period: period });
    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error happened." });    
  }
}
