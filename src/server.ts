import dotenv from "dotenv";
import app from "./app";
import { connectToDB } from "./config/db";
import { loadAllJobs } from "./utils/jobScheduler";
import { connectRedis } from "./config/redisClient";

dotenv.config();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectToDB();
  await connectRedis()
  await loadAllJobs(); 

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
