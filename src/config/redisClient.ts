// config/redisClient.ts
import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

// Event: Redis successfully connected
redisClient.on("connect", () => {
  console.log("Redis connected successfully");
});

// Event: Redis connection error
redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Function to initialize Redis connection
export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Redis connection failed:", error);
  }
};

export default redisClient;
