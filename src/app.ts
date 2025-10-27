import express from "express";
import jobRouter from "./routes/job.routes";

const app = express();

app.use(express.json());
app.use("/jobs", jobRouter);

app.get("/", (req, res) => {
  res.send("Scheduler service is running!");
});

export default app;
