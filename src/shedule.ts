import cron from "node-cron";
import axios from "axios";
import { db } from "../../src/db/connect";
import { emailListSchema } from "../../src/db/schema";

// Define period to cron expression mapping
const periodCronMap: { [key: string]: string } = {
  morning: "0 8 * * *", // 8 AM
  //   morning: '* * * * *',    // 8 AM
  afternoon: "0 12 * * *", // 12 PM (noon)
  evening: "0 20 * * *", // 8 PM
};

// Function to fetch data from the database and set cron jobs
export async function scheduleEmailJobs() {
  try {
    // Fetch email and period from the database
    const emails = await db.select().from(emailListSchema);

    // Iterate over each email entry and set the corresponding cron job
    emails.forEach((entry) => {
      const { email, period } = entry;
      const cronExpression = periodCronMap[period];

      if (cronExpression) {
        cron.schedule(
          cronExpression,
          async () => {
            try {
              // Make a GET request to the /sendemail route
              const response = await axios.get(
                `http://sheduler-qqhc.onrender.com/email/${email}`
              );
              console.log(`Email sent to ${email} for ${period} period`);
            } catch (error) {
              console.error(`Error sending email to ${email}:`, error);
            }
          },
          { timezone: "Africa/Lagos" }
        );
        console.log(`Cron job scheduled for ${email} at ${period}`);
      } else {
        console.error(`Invalid period "${period}" for ${email}`);
      }
    });
  } catch (error) {
    console.error("Error fetching emails from the database:", error);
  }
}

// Initialize the scheduling
