import { Job } from "../models/Job.js";

export const saveJobsToDB = async (jobs) => {
  let newCount = 0;
  let updatedCount = 0;
  let failed = [];

  for (const job of jobs) {
    try {
      const existing = await Job.findOne({ jobId: job.jobId });

      if (existing) {
        await Job.updateOne({ jobId: job.jobId }, job);
        updatedCount++;
      } else {
        await Job.create(job);
        newCount++;
      }
    } catch (err) {
      failed.push({ jobId: job.jobId, reason: err.message });
    }
  }

  return { totalFetched: jobs.length, newCount, updatedCount, failed };
};
