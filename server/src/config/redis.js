import { Redis } from "ioredis";

export const redisConnection = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
  maxRetriesPerRequest: null,   // ✅ REQUIRED BY BULLMQ
  enableReadyCheck: false       // ✅ Prevents ready-check errors
});

redisConnection.on("connect", () => console.log("✅ Redis connected"));
redisConnection.on("error", (err) => console.error("❌ Redis error:", err));
