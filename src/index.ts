import express, { NextFunction, Request, Response } from "express";
import cron from "node-cron";
import router from "./routes/sendmail";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = 5000;

app.use("/sendemail", router);

// cron.schedule("0 8 * * *", async () => {
cron.schedule("* * * * *", async () => {
  console.log("function running at 8:00 AM", new Date().toString());
  try {
    // Make a GET request to the /sendemail route
    const response = await axios.get(`http://localhost:${PORT}/sendemail`);
    console.log("Email sent:", response.data);
  } catch (error) {
    console.error("Error calling /sendemail route:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
