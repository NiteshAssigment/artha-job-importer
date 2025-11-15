import cron from "node-cron";
import axios from "axios";

export const startImportCron = () => {
  // Runs every hour
  cron.schedule("0 * * * *", async () => {
    console.log("⏰ Running hourly job import...");
    await axios.get("http://localhost:5000/api/import/run");
  });
};
