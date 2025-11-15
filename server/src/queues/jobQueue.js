import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

// Create a BullMQ queue named "job-import"
export const jobQueue = new Queue("job-import", {
  connection: redisConnection,
});

console.log("✅ Job Queue initialized");
