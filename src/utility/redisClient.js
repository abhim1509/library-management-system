// redisClient.js
import { Redis } from "ioredis";

// Create a single Redis instance
export const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  password: "your_password", // Optional
});

// Handle Redis connection events (optional)
redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});
