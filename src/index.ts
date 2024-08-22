import express, { NextFunction, Request, Response } from "express";
import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";
import { registerEmailRouter, sendEmailRouter } from "./routes";
import { scheduleEmailJobs } from "./shedule";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = 5000;

app.use("/email", sendEmailRouter);
app.use("/register", registerEmailRouter);

// cron.schedule(
//   "0 8 * * *",
//   async () => {
//     try {
//       // Make a GET request to the /sendemail route
//       const response = await axios.get(
//         `http://sheduler-qqhc.onrender.com/email/${"khanroberts3@gmail.com"}`
//       );
//     } catch (error) {
//       console.error("Error calling /sendemail route:", error);
//     }
//   },
//   { timezone: "Africa/Lagos" }
// );

app.listen(PORT, () => {
  scheduleEmailJobs();
  console.log(`Running on port ${PORT}`);
});
