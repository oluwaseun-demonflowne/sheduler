import nodemailer from "nodemailer";
import { type Request, type Response } from "express";
import { createMailOptions } from "../emailTemplate";

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const sendTheEmail = async (req: Request, res: Response) => {
  const email = req.params.email;

  if (!isValidEmail(email)) {
    return res.status(400).send("Invalid email address.");
  }
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
  try {
    await transport.sendMail(createMailOptions(email));
    console.log("did it go? Yes");
    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to send email." });
  }
};
