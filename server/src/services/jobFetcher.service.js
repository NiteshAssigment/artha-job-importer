import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "_",
  cdataPropName: "__cdata",
  textNodeName: "__text",
  allowBooleanAttributes: true,
});

export const fetchJobsFromFeed = async (feedUrl) => {
  try {
    const { data } = await axios.get(feedUrl, { timeout: 15000 });

    const json = parser.parse(data);

    // Universal root support
    const channel = json?.rss?.channel;
    if (!channel) {
      console.log("❌ No channel found for feed:", feedUrl);
      return [];
    }

    let items = channel.item || [];

    // Always convert single-object → array
    if (!Array.isArray(items)) items = [items];

    // Normalize safely
    const jobs = items.map((item) => {
      return {
        jobId:
          item.id ||
          item.guid?.__text ||
          item.guid ||
          item.link ||
          "",

        title:
          item.title?.__cdata ||
          item.title?.__text ||
          item.title ||
          "Untitled Job",

        description:
          item["content:encoded"]?.__cdata ||
          item.encoded?.__cdata ||
          item.description?.__cdata ||
          item.description ||
          "No description",

        company:
          item["job_listing:company"]?.__cdata ||
          item["company"]?.__cdata ||
          item.company ||
          "",

        location:
          item["job_listing:location"]?.__cdata ||
          item.location ||
          "",

        jobType:
          item["job_listing:job_type"]?.__cdata ||
          item.jobType ||
          "",

        category:
          item["job_listing:category"]?.__cdata ||
          item.category ||
          "",

        link:
          item.link?.[0]?._href || // Some feeds use <link href="...">
          item.link ||
          "",

        pubDate: item.pubDate ? new Date(item.pubDate) : null,

        imageUrl: item["content"]?._url || null,

        sourceUrl: feedUrl,
      };
    });

    console.log(`✅ Parsed ${jobs.length} jobs from ${feedUrl}`);
    return jobs;
  } catch (err) {
    console.error(`❌ Failed fetching: ${feedUrl}`, err.message);
    return [];
  }
};
