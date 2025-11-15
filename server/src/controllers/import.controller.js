import { fetchJobsFromFeed } from "../services/jobFetcher.service.js";
import { jobQueue } from "../queues/jobQueue.js";

const FEEDS = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time",
  "https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france",
  "https://jobicy.com/?feed=job_feed&job_categories=design-multimedia",
  "https://jobicy.com/?feed=job_feed&job_categories=data-science",
  "https://jobicy.com/?feed=job_feed&job_categories=copywriting",
  "https://jobicy.com/?feed=job_feed&job_categories=business",
  "https://jobicy.com/?feed=job_feed&job_categories=management",
  "https://www.higheredjobs.com/rss/articleFeed.cfm"
];


export const importJobsManually = async (req, res) => {
  try {
    for (const feedUrl of FEEDS) {
      const jobs = await fetchJobsFromFeed(feedUrl);

      if (jobs.length === 0) {
        console.warn(`⚠️ No jobs found for feed: ${feedUrl}`);
        continue;
      }

      // Push feed processing to queue
      await jobQueue.add("importFeed", { feedUrl, jobs });
      console.log(`📥 Queued feed for import: ${feedUrl}`);
    }

    res.status(202).json({
      status: "queued",
      message:
        "Job import tasks have been queued for background processing.",
      feedsQueued: FEEDS.length,
    });
  } catch (error) {
    console.error("❌ Queue import error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
