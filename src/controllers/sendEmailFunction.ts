import nodemailer from "nodemailer";
import { createMailOptions } from "../emailTemplate";
export const sendTheEmail = async () => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
  try {
    await transport.sendMail(createMailOptions("khanroberts3@gmail.com"));
    console.log("did it go? Yes");
    return new Response(JSON.stringify("success"), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), {
      status: 500,
    });
  }
};
