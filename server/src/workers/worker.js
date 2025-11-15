import "dotenv/config";
import { connectDB } from "../config/db.js";
import { redisConnection } from "../config/redis.js";

// ⬇️ VERY IMPORTANT — Call MongoDB connection function
connectDB();

console.log("👷 Worker started...");

import "./jobWorker.js";  // Keep this at the bottom
