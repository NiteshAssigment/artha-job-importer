import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.js";
import { saveJobsToDB } from "../services/job.service.js";
import { ImportLog } from "../models/ImportLog.js";

// Worker that consumes jobs from the queue
export const jobWorker = new Worker(
  "job-import",
  async (job) => {
    console.log(`👷 Processing feed: ${job.data.feedUrl}`);

    const jobs = job.data.jobs;
    const stats = await saveJobsToDB(jobs);

    // Save Import Log for this feed
    await ImportLog.create({
      timestamp: new Date(),
      fileName: job.data.feedUrl,
      totalFetched: stats.totalFetched,
      totalImported: stats.newCount + stats.updatedCount,
      newJobs: stats.newCount,
      updatedJobs: stats.updatedCount,
      failedJobs: stats.failed,
    });

    console.log(
      `✅ Completed feed: ${job.data.feedUrl} | Fetched: ${stats.totalFetched} | New: ${stats.newCount} | Updated: ${stats.updatedCount}`
    );

    return stats; // returned to QueueEvents
  },
  {
    connection: redisConnection,
    concurrency: 5, // number of concurrent feed jobs
  }
);

// Error logging
jobWorker.on("failed", (job, err) => {
  console.error(`❌ Job failed: ${job.id}`, err.message);
});

console.log("👷 Worker is listening for jobs...");
