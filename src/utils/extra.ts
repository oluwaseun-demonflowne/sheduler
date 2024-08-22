import { SelectEmailList } from "../../../src/db/schema";

type Period = "morning" | "afternoon" | "evening";

const periodCronMap: { [key in Period]: string } = {
  morning: "0 8 * * *", // 8 AM
  afternoon: "0 12 * * *", // 12 PM (noon)
  evening: "0 20 * * *", // 8 PM
};
