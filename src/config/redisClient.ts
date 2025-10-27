import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();



// Create Redis client with environment variables
const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

// Listen for connection errors
client.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Connect to Redis
async function connectRedis() {
  try {
    await client.connect();
    console.log("Connected to Redis successfully!");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
}

export { client, connectRedis };
